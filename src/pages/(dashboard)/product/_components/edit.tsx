import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { IProduct } from "@/common/types/product";
import { editProduct, getProductById } from "@/services/product";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import Joi from "joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Inputs = {
    name: string;
    category?: string;
    price: number;
    // gallery?: string[];
    image: string;
    description: string;
    discount: number;
    featured: boolean;
    countInStock: number;
    quantity: number;
};
// const productSchema = Joi.object({
//     name: Joi.string().required(),
//     price: Joi.number().required(),
//     category: Joi.string(),
//     // gallery: Joi.array().items(Joi.string()),
//     image: Joi.string(),
//     description: Joi.string(),
//     discount: Joi.number(),
//     featured: Joi.boolean(),
//     countInStock: Joi.number(),
// });

const ProductEditPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { id } = useParams();
    const form = useForm<Inputs>();
    const mutation = useMutation({
        mutationFn: async (product: IProduct) => {
            const data = await editProduct({ ...product, _id: id });
            console.log(data);
            return data;
        },
        onSuccess: () => {
            toast({
                title: "Sửa sản phẩm thành công",
                variant: "success",
            });
            navigate("/admin/products");
        },
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const product = await getProductById(id);
                    form.reset(product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id, form]);

    const onSubmit: SubmitHandler<Inputs> = (product) => {
        mutation.mutate(product);
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold">Chỉnh sửa sản phẩm</h2>
            <hr className="my-5" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <FormControl>
                                    <Input {...field} id="name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="price">Giá</FormLabel>
                                <FormControl>
                                    <Input {...field} id="price" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="category">
                                    Category
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} id="category" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    {/* <FormField
                        control={form.control}
                        name="gallery"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="gallery">Gallery</FormLabel>
                                <FormControl>
                                    <Input {...field} id="gallery" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="image">Image</FormLabel>
                                <FormControl>
                                    <Input {...field} id="image" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} id="description" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="discount">
                                    Discount
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} id="discount" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Featured?</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="destructive" type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ProductEditPage;
