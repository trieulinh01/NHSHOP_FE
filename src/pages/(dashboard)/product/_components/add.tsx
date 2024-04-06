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
import { addProduct } from "@/services/product";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import Joi from "joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { uploadFile } from "@/common/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string(),
    gallery: Joi.array().items(Joi.string()),
    image: Joi.string(),
    description: Joi.string(),
    discount: Joi.number(),
    featured: Joi.boolean(),
    countInStock: Joi.number(),
});
const ProductAdd = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [gallery, setGallery] = useState<any[]>([]);
    const [image, setImage] = useState<string>("");
    const form = useForm({
        resolver: joiResolver(productSchema),
    });
    const mutation = useMutation({
        mutationFn: async (product: IProduct) => {
            const { data } = await addProduct({
                ...product,
                slug: product.name.toLowerCase().replace(/ /g, "-"),
            });
            return data;
        },
        onSuccess: () => {
            form.reset();
            toast({
                title: "Thêm sản phẩm thành công",
                variant: "success",
            });
            navigate("/admin/products");
        },
    });

    const onSubmit: SubmitHandler<any> = (product) => {
        mutation.mutate({ ...product, gallery, image });
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold">Thêm sản phẩm</h2>
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
                    <FormField
                        control={form.control}
                        name="gallery"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="gallery">Gallery</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="gallery"
                                        multiple
                                        type="file"
                                        onChange={async (e) => {
                                            const files = Array.from(
                                                e.target.files as FileList,
                                            );
                                            const result = await Promise.all(
                                                files.map((file) =>
                                                    uploadFile(file),
                                                ),
                                            );

                                            setGallery(
                                                result.map(
                                                    (item: any) => item?.url,
                                                ),
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        {gallery.map((item, index) => (
                            <div>
                                <img
                                    key={index}
                                    src={item}
                                    alt={item}
                                    className="w-20 h-20"
                                />
                            </div>
                        ))}
                    </div>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="image">Image</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="image"
                                        type="file"
                                        onChange={async (e) => {
                                            console.log(e.target.files);

                                            const files = Array.from(
                                                e.target.files as FileList,
                                            );
                                            const result = await Promise.all(
                                                files.map((file) =>
                                                    uploadFile(file),
                                                ),
                                            );

                                            setImage(result[0]?.url);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <img src={image} alt={image} className="w-20 h-20" />
                    </div>
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

export default ProductAdd;
