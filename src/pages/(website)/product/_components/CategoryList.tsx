import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
    const { data: categories } = useQuery({
        queryKey: ["CATEGORY_LIST"],
        queryFn: async () => {
            const { data } = await axios.get(
                "http://localhost:8080/api/v1/categories",
            );
            return data;
        },
        staleTime: 60000, // Thời gian "cũ" được đặt là 1 phút (60000 miligiây)
    });
    return (
        <section className="news">
            <div className="container">
                <div className="section-heading">
                    <h2 className="section-heading__title">Categories</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {categories?.map(
                        (category: { _id?: number; name: string }) => (
                            <div
                                key={category._id}
                                className="overflow-hidden bg-white rounded-lg shadow-md"
                            >
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        <Link
                                            to={`/categories/${category._id}`}
                                            className="hover:text-red-600"
                                        >
                                            {category.name}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
};

export default Categories;
