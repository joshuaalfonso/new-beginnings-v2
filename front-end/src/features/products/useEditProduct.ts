import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../services/apiProducts";
import { toast } from "sonner";


export const useEditProduct = () => {
    
    const queryClient = useQueryClient();

    const {mutate: updateProductMutation, isPending: isUpdating} = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            toast.success('Product has been updated.');
        },
        onError: (err) => {
            toast.error(err.message || 'There was an error updating product')
        }
    })

    return { updateProductMutation, isUpdating } 

}