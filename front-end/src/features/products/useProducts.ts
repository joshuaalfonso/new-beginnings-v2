import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/apiProducts";

export const useProducts = () => {
    
    const { data, isPending, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });

    return { data, isPending, error }

}