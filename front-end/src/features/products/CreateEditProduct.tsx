
// import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { ProductForm } from "./ProductsForm"
import { ProductList } from "../../models/products"


interface CreateDeleteProps {
    product?: ProductList,
    open: boolean, 
    setOpen: (open: boolean) => void
}

export const CreateEditProduct = ({product = {} as ProductList, open, setOpen}: CreateDeleteProps) => {

    const isEditMode = Boolean(product.productId);

    // const [open, setOpen] = useState<boolean>(false);

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}> 

            {/* <DialogTrigger asChild>
                <Button 
                    variant={isEditMode ? 'secondary' : 'default'} 
                    onClick={() => setOpen(true)}
                >
                    {isEditMode ? 'Edit' : 'Create'}
                </Button>
            </DialogTrigger> */}

            { !isEditMode && (
                <DialogTrigger asChild>
                    <Button variant={'default'}>Create</Button>
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-[425px]"
                 
            >

                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                    <DialogDescription>
                        {/* Make changes to your profile here. Click save when you're done. */}
                    </DialogDescription>
                </DialogHeader>

                <ProductForm 
                    product={product} 
                    onCloseDialog={closeDialog}
                />

            </DialogContent>

        </Dialog>
    )
}