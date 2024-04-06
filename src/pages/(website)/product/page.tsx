/* eslint-disable @typescript-eslint/no-explicit-any */
import Catergories from "@/pages/(website)/product/_components/CategoryList";
import { useProductQuery } from "@/common/hooks/useProductQuery";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "@/pages/(website)/product/_components/ProductList";

const ShopPage = () => {
    const [params] = useSearchParams();
    const page = params.get("page");
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(page || 1);
    const { data, isLoading, refetch } = useProductQuery({
        _page: page,
        _limit: limit,
    });
    useEffect(() => {
        if (page && +page !== currentPage) {
            setCurrentPage(+page);
        }
    }, [page, currentPage]);

    const handleLimitChange = (event: ChangeEvent<any>) => {
        setLimit(event.target.value);
        refetch(); // Gọi lại API với limit mới và trang đầu tiên
    };
    const { data: products, pagination } = data || { data: [], pagination: {} };
    if (isLoading) return <div>...Loading</div>;

    return (
        <div className="container">
            <Catergories />
            <hr />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="flex items-center mt-5 ml-10 space-x-4">
                        <label
                            htmlFor="limit"
                            className="font-bold text-gray-600"
                        >
                            Show:
                        </label>
                        <select
                            id="limit"
                            onChange={handleLimitChange}
                            defaultValue={limit}
                            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                        >
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <ProductList products={products} pagination={pagination} />
                </>
            )}
        </div>
    );
};

export default ShopPage;
