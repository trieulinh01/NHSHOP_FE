import instance from '@/configs/axios'
import { IProduct } from '@/common/types/product'

const { token } = JSON.parse(localStorage.getItem('user') || '');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProducts = async (params?: any): Promise<IProduct[]> => {
    try {
        const response = await instance.get('/products', { params })
        return response.data
    } catch (error) {
        return []
    }
}
export const getProductById = async (id: number | string) => {
    try {
        const response = await instance.get(`/products/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`/products`, product, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token ? token : ''
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
