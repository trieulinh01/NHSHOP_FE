import { TInputOrder } from "@/common/types/order";
import axios from "axios";
import { toast } from "react-toastify"


export const getAllOrderByUserID = async () => {
    try {
        const {data} = await axios.get("/orders");
        return data;
    } catch (error) {
        toast.error("Lỗi hệ thống, thử lại sau ít phút");
        console.log(error);
    }
}

export const createOrderByUserID = async (order: TInputOrder) => {
    try {
        const { data } = await axios.post('/orders', order);
        return data;
    } catch (error) {
        toast.warning("Đặt hàng thất bại, vui lòng thử lại!");
        console.log(error);
    }
}