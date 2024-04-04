import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TInputOrder } from "../types/order";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createOrderByUserID, getAllOrderByUserID } from "@/services/orderService";


export const useQueryOrder = () => {
    const order = useQuery({
        queryKey: ['ORDER'],
        queryFn: async () => {
            return await getAllOrderByUserID();
        },
    })

    return { ...order }
}

export const useOrderMutation = ({ type }: { type: "ADD" | "UPDATE" | "CANCEL" }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const form = useForm();
    const mutation = useMutation({
        mutationFn: async (order: any) => {
            switch (type) {
                case "ADD": return await createOrderByUserID((order as TInputOrder));
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ORDER'],
            })
        }
    })

    const onSubmit: SubmitHandler<any> = (data) => {
        mutation.mutate(data);
        navigate('/order');
        // console.log(data);
    }

    return { ...form, mutation, onSubmit }
}