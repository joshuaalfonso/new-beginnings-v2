import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/apiProducts";
import { toast } from "sonner";
import { AxiosError } from 'axios';


// Define an interface for the error response
interface ErrorResponse {
    message: string;
}

export const useCreateProduct = () => {

    const queryClient = useQueryClient();

    const {mutate: createProductMutation, isPending: isCreating} = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            toast.success('Product has been created.');
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            toast.error(err.response?.data.message  || 'There was an error creating product')
        }
    })

    return { createProductMutation, isCreating }

}