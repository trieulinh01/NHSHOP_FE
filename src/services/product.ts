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
export const deleteProduct = async (id: string) => {
    try {
        const response = await instance.delete(`/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Error deleting product');
    }
};
export const editProduct = async (product: IProduct): Promise<IProduct> => {
    try {
        if (!product || !product._id) {
            throw new Error('Product or product _id is missing');
        }
        
        const response = await instance.put(`/products/${product._id}`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        console.log(response.data);
        
        return response.data; 
    } catch (error) {
        console.error('Error editing product:', error);
        throw new Error('Error editing product');
    }
};