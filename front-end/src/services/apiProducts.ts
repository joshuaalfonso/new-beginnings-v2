import axios from 'axios'
import { ProductList, ProductPost } from '../models/products';

export const fetchProducts = async () => {
    const { data } = await axios.get('http://192.168.1.11:3000/products');
    return data as ProductList[]
}

export const createProduct = async (product: ProductPost) => {
    const response = await axios.post('http://192.168.1.11:3000/products', product);
    return response.data;
};

export const updateProduct = async (product: ProductPost) => {
    const response = await axios.put('http://192.168.1.11:3000/products', product);
    return response.data;
};

export const deleteProduct = async (productId: number) => {
    const response = await axios.delete(`http://192.168.1.11:3000/products/${productId}`);
    return response.data;
};
  