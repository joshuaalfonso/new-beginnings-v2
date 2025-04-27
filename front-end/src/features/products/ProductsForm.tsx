
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../../components/ui/form"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { DialogFooter } from "../../components/ui/dialog"
import { Product } from "../../models/products"
import { useCreateProduct } from "./useCreateProduct"
import { useEditProduct } from "./useEditProduct"
import { Loader2 } from "lucide-react"


const formSchema = z.object({
    productId: z.number().nullable(),
    productName: z.string().min(2),
    productCategory: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    productDescription: z.string().min(5, {
        message: "Username must be at least 5 characters.",
    }),
    dateCreated: z.string().nullable()
});

interface ProductFormProps {
    product?: Product
    onCloseDialog: () => void
}

export const ProductForm =  ({ product = {} as Product, onCloseDialog }: ProductFormProps)  => {

    const { productId } = product;

    const isEditMode = Boolean(productId);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isEditMode ? product : {
            productId: 0,
            productName: "",
            productCategory: "",
            productDescription: "",
            dateCreated: null,
        }
    })

    const { createProductMutation, isCreating } = useCreateProduct();

    const { updateProductMutation, isUpdating } = useEditProduct();

    const isLoading = isCreating || isUpdating;

    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values)

        if (isEditMode) {
            updateProductMutation(  
                values,
                {
                    onSuccess: () => {
                        onCloseDialog();
                    }
                }
            )
        } else {
            createProductMutation(
                values,
                {
                    onSuccess: () => {
                        form.reset();
                        onCloseDialog();
                    }
                }
            )
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} tabIndex={-1}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} tabIndex={-1}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} tabIndex={-1}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <DialogFooter>
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                    >
                        { isLoading && <Loader2 className="animate-spin" /> }
                        {isEditMode ? 'Apply Changes' : 'Create' }
                    </Button>
                </DialogFooter>
                
            </form>
        </Form>
    )
}