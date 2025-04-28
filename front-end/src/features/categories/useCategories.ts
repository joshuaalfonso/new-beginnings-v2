import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../services/api.Categories";


export const useCategories = () => {
    
    const { data, isPending, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    return { data, isPending, isError }

}