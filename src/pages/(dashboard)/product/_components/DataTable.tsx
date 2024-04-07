import { flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const DataTable = ({ table, columns, onDeleteProduct, onEditProduct }: any) => {
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup: any) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                      )}
                            </TableHead>
                        ))}
                        <TableHead>Action</TableHead>{" "}
                        {/* Thêm tiêu đề cột Action */}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: any) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell: any) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>
                                {/* Thêm nút xóa và gọi hàm xóa sản phẩm khi nút được nhấn */}
                                <Button
                                    className="mb-2 bg-red-700  w-[60px]"
                                    onClick={() =>
                                        onDeleteProduct(row.original._id)
                                    }
                                >
                                    Delete
                                </Button>
                                <Button
                                    className="mr-2 bg-green-700 w-[60px]"
                                    onClick={() =>
                                        onEditProduct(row.original._id)
                                    }
                                >
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DataTable;
