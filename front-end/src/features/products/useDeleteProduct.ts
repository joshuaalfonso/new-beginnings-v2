import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../services/apiProducts";
import { toast } from "sonner";



export const useDeleteProduct = () => {

    const queryClient = useQueryClient();

    const { mutate: deleteProductMutation, isPending: isDeleting } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            toast.success('Product has been deleted.');
        },
        onError: (err) => {
            toast.error(err.message || 'There was an error updating product')
        }
    })

    return { deleteProductMutation, isDeleting }

}