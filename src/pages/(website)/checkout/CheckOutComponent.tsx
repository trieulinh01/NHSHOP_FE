import { useCartQuery } from "../../../hooks/useCart"
import { useOrderMutation } from "../../../hooks/useOrder";
import { TCart } from "../../../types/cart";
import Loading from "../Loading";
import CartEmpty from "../cart/CartEmpty";
import ServiceHome from "../home/ServiceHome"
import "./../../../sass/checkout.scss"

const CheckOutComponent = () => {

    const { data: cart, isLoading, isError } = useCartQuery();
    const { register, formState: { errors }, handleSubmit, onSubmit } = useOrderMutation({ type: "ADD" });
    if (isLoading) return <Loading />
    if (isError) return <CartEmpty />
    return (
        <>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <a href="#" className="text-2xl font-bold text-gray-800">
                    Sneekpeeks
                </a>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                    href="#"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </a>
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                                    href="#"
                                >
                                    2
                                </a>
                                <span className="font-semibold text-gray-900">Shipping</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">
                        Check your items. And select a suitable shipping method.
                    </p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {(cart as TCart).items.map((item, index) => (
                            <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img
                                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                    src={item.productID.image}
                                    alt=""
                                />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">
                                        {item.productID.product_name}
                                    </span>
                                    <p className="text-lg font-bold">${item.productID.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">
                        Complete your order by providing your payment details.
                    </p>
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="email" className="text-left mt-4 mb-2 block text-sm font-medium">
                                Address
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...register("address", { required: true })}
                                    className="w-full rounded-md border border-gray-200 px-5 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Address"
                                />
                                {errors.address && <span className="fs-6 text-danger">Address is required</span> }
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-geo-alt-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                </div>
                            </div>
                            <label
                                htmlFor="card-holder"
                                className="text-left mt-4 mb-2 block text-sm font-medium"
                            >
                                Number Phone
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...register("numberPhone", { required: true })}
                                    className="w-full rounded-md border border-gray-200 px-5 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Number Phone"
                                />
                                {errors.numberPhone && <span className="fs-6 text-danger">Number Phone is required</span>}
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-telephone-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <label
                                htmlFor="card-holder"
                                className="text-left mt-4 mb-2 block text-sm font-medium"
                            >
                                Payment Type
                            </label>
                            <div className="relative">
                                <select id="" className="w-full rounded-md border border-gray-200 px-5 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                                    {/* <option value="" selected disabled >Payment Type</option> */}
                                    <option defaultValue="COD">COD</option>
                                    <option defaultValue="ONLINE" disabled>ONLINE (Tính năng chưa phát triển)</option>
                                </select>
                                {/* <input
                                    type="text"
                                    className="w-full rounded-md border border-gray-200 px-5 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Number Phone"
                                /> */}
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-credit-card-2-back-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1z" />
                                    </svg>

                                </div>
                            </div>
                            {/* Total */}
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                    <p className="font-semibold text-gray-900">${(cart.items as []).reduce((accumulator: number, currentValue: any) => accumulator + currentValue.productID.price * currentValue.quantity, 0)}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                                    <p className="font-semibold text-gray-900">$8.00</p>
                                    <input type="number" hidden {...register("totalPrice")} value={(cart.items as []).reduce((accumulator: number, currentValue: any) => accumulator + currentValue.productID.price * currentValue.quantity, 0) + 8} />
                                    <input type="text" hidden {...register("cartID")} value={cart._id} />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-2xl font-semibold text-gray-900">${(cart.items as []).reduce((accumulator: number, currentValue: any) => accumulator + currentValue.productID.price * currentValue.quantity, 0) + 8}</p>
                            </div>
                            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div >
            <ServiceHome />
        </>
    )
}

export default CheckOutComponent