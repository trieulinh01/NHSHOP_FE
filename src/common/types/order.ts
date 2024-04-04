export type TOrder = {
    _id: string,
    address: string,
    numberPhone: string,
    userID: {
        _id: string,
        username: string,
        email: string,
    },
    cartID: {
        _id: string,
        userID: string,
        items: [
            {
                productID: {
                    _id: string,
                    product_name: string,
                    price: number,
                    tags: string[],
                    feature: boolean,
                    gallery: string[],
                    countStocks: number,
                    image: string,
                    description: string,
                    category: string,
                },
                quantity: number
            }
        ],
        status: boolean,
    },
    totalPrice: number,
    paymentType: "COD" | "ONLINE",
    isCancel: boolean,

}

export type TInputOrder = {
    address: string,
    numberPhone: string,
    totalPrice: number,
    cartID: string,
}