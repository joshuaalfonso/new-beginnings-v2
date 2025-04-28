import axios from "axios";
import { CategoryList } from "../models/categories";


export const fetchCategories = async () => {
    const { data } = await axios.get('http://192.168.1.11:3000/categories');
    return data as CategoryList[]
}