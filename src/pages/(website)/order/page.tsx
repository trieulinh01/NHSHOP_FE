import useCart from '@/common/hooks/useCart'

const OrderPage = () => {
    const { data } = useCart()
    console.log(data)
    return <div>order</div>
}

export default OrderPage
