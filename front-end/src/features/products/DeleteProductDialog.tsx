// import { useState } from "react";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    // AlertDialogTrigger 
} from "../../components/ui/alert-dialog"
// import { Button } from "../../components/ui/button";
import { useDeleteProduct } from "./useDeleteProduct";
import { Loader2 } from "lucide-react";
// import { DropdownMenuItem } from "../../components/ui/dropdown-menu";


interface DeleteProps {
    productId: number, 
    open: boolean, 
    setOpen: (open: boolean) => void
}

export const DeleteProductDialog = ({productId, open, setOpen}: DeleteProps) => {

    const { deleteProductMutation, isDeleting } = useDeleteProduct();

    // const [open, setOpen] = useState<boolean>(false);

    const handleContinueClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        deleteProductMutation(
            productId,
            {
                onSuccess: () => setOpen(false)
            }
        )
    }   

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            {/* <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger> */}

            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={isDeleting}
                        onClick={handleContinueClick}
                    >
                        { isDeleting && <Loader2 className="animate-spin" /> }
                        { isDeleting ? 'Deleting' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    )
}