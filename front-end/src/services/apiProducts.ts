import axios from 'axios'
import { ProductList } from '../models/products';

export const fetchProducts = async () => {
    const { data } = await axios.get('http://192.168.1.11:3000/products');
    return data as ProductList[]
}

export const createProduct = async (product: FormData) => {
    const response = await axios.post('http://192.168.1.11:3000/products', product, {
        headers: {
            'Content-Type': 'multipart/form-data' // Let axios handle this, but you can specify it explicitly if needed
        }
    });
    return response.data;
};

export const updateProduct = async (product: FormData) => {
    const response = await axios.put('http://192.168.1.11:3000/products', product);
    return response.data;
};

export const deleteProduct = async (productId: number) => {
    const response = await axios.delete(`http://192.168.1.11:3000/products/${productId}`);
    return response.data;
};
  