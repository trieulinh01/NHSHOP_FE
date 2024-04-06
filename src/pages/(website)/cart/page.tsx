import { ChangeEvent } from "react";
import useCart from "@/common/hooks/useCart";
import "./../../../../src/styles/cart.scss";
import { Link } from "react-router-dom";
const CartPage = () => {
    const {
        data,
        mutate,
        handleQuantityChange,
        calculateTotal,
        isLoading,
        isError,
    } = useCart();
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;

    return (
        <div className="container mx-auto mt-10">
            <div className="cart">
                <div className="container cart__container">
                    <table className="cart-table">
                        <thead>
                            <tr className="cart-table__head" style={{width:'100%'}}>
                                <th className="cart-table__header">Product</th>
                                <th className="cart-table__header">Price</th>
                                <th className="cart-table__header">Quantity</th>
                                <th className="cart-table__header">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.products.map(
                                (product: any, index: number) => (
                                    <tr
                                        key={index}
                                        className="border border-gray-300"
                                    >
                                        <td className="px-4 py-2 border border-gray-300">
                                            {index + 1}
                                        </td>
                                        <td className="cart-table__data">
                                            <div className="cart-table__test">
                                                <img
                                                    src="https://picsum.photos/536/354"
                                                    alt="ảnh"
                                                    className="cart-table__img"
                                                />
                                                <span className="cart-table__note">
                                                    {" "}
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="cart-table__data cart-table__price">
                                            {product.price}
                                        </td>
                                        <td className="cart-table__data cart-table__quantity">
                                            <button
                                                className="cart-table__quantityBtn"
                                                onClick={() =>
                                                    mutate({
                                                        action: "DECREMENT",
                                                        productId:
                                                            product.productId,
                                                    })
                                                }
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-16 mx-2 text-center border border-gray-300"
                                                value={product.quantity}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>,
                                                ) =>
                                                    handleQuantityChange(
                                                        product.productId,
                                                        e,
                                                    )
                                                }
                                            />
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded-full"
                                                onClick={() =>
                                                    mutate({
                                                        action: "INCREMENT",
                                                        productId:
                                                            product.productId,
                                                    })
                                                }
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td
                                            className="cart-table__data "
                                            style={{ justifyItems: "center" }}
                                        >
                                            {product.price * product.quantity}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            <button
                                                className="px-4 py-2 text-white bg-red-500 rounded-sm"
                                                onClick={() =>
                                                    mutate({
                                                        action: "REMOVE",
                                                        productId:
                                                            product.productId,
                                                    })
                                                }
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                    <div className="cart-totals">
                        <p className="cart-totals__name">Cart Totals</p>
                        <div className="cart-totals__subtotal">
                            <p>Subtotal</p>
                            <span>${calculateTotal()}</span>
                        </div>
                        <div className="cart-totals__total">
                            <p>Total</p>
                            <span>${calculateTotal()}</span>
                        </div>

                        <Link to={`/order`}>
                            <button className="cart-totals__checkOut">
                                Check Out
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
