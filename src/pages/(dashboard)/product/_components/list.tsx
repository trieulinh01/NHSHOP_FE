import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { useProductQuery } from "@/common/hooks/useProductQuery";
import { useState } from "react";
import { columns } from "./Column";
import DataTable from "./DataTable";
import FooterTable from "./FooterTable";
import HeaderTable from "./HeaderTable";
import { deleteProduct } from "@/services/product";

const ProductList = () => {
    const { data, isLoading, refetch } = useProductQuery({
        _expand: "category",
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    const handleDeleteProduct = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?",
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await deleteProduct(id);
            refetch();
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product!");
        }
    };
    const handleEditProduct = (id: string) => {
        window.location.href = `/admin/products/${id}/edit`;
    };
    return (
        <>
            <div className="flex items-center justify-between py-3">
                <h2>Product List</h2>
                <Link to="/admin/products/add" className="flex items-center">
                    <Button>
                        <Plus />
                        Add Product
                    </Button>
                </Link>
            </div>
            <hr />
            <div className="my-5">
                <div className="w-full">
                    <div className="flex items-center py-4">
                        <HeaderTable table={table} />
                    </div>
                    <div className="border rounded-md">
                        {isLoading ? (
                            <>
                                <table className="w-full">
                                    <thead>
                                        <th>
                                            <Skeleton className="w-full h-[25px] rounded-full" />
                                        </th>
                                        <th>
                                            <Skeleton className="w-full h-[25px] rounded-full" />
                                        </th>
                                        <th>
                                            <Skeleton className="w-full h-[25px] rounded-full" />
                                        </th>
                                        <th>
                                            <Skeleton className="w-full h-[25px] rounded-full" />
                                        </th>
                                        <th>
                                            <Skeleton className="w-full h-[25px] rounded-full" />
                                        </th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                            <td>
                                                <Skeleton className="w-full h-[25px] rounded-full" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <DataTable
                                table={table}
                                columns={columns}
                                onDeleteProduct={handleDeleteProduct}
                                onEditProduct={handleEditProduct}
                            />
                        )}
                    </div>
                    <div className="flex items-center justify-end py-4 space-x-2">
                        <FooterTable table={table} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
