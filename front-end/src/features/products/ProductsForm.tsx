
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { DialogFooter } from "../../components/ui/dialog"
import { ProductList } from "../../models/products"
import { useCreateProduct } from "./useCreateProduct"
import { useEditProduct } from "./useEditProduct"
import { Loader2 } from "lucide-react"
import { Textarea } from "../../components/ui/textarea"
import { useCategories } from "../categories/useCategories"
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "../../components/ui/select"


// const formSchema = z.object({
//     productId: z.number(),
//     productName: z.string().min(2),
//     categoryId: z.number().min(1, {
//         message: "This field is required."
//     }),
//     productDescription: z.string().min(5, {
//         message: "Username must be at least 5 characters.",
//     }),
//     imageUrl: z.string(),
//     file: z.instanceof(File, {
//         message: "A file is required."
//     }).nullable()
// });

interface ProductFormProps {
    product?: ProductList
    onCloseDialog: () => void
}

export const ProductForm =  ({ product = {} as ProductList, onCloseDialog }: ProductFormProps)  => {

    const { productId } = product;

    const isEditMode = Boolean(productId);

    const formSchema = z.object({
        productId: z.number(),
        productName: z.string().min(2),
        categoryId: z.number().min(1, {
            message: "This field is required."
        }),
        productDescription: z.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
        imageUrl: z.string(),
        file: z.instanceof(File).optional().nullable()
    }).refine((data) => {
        return isEditMode || !!data.file;
    }, {
        message: "Image is required",
        path: ["file"], 
    });
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isEditMode ? {...product, file: null} : {
            productId: 0,
            productName: "",
            categoryId: 0,
            productDescription: "",
            imageUrl: "",
            file: null
        }   
    })

    const { createProductMutation, isCreating } = useCreateProduct();

    const { updateProductMutation, isUpdating } = useEditProduct();

    const isLoading = isCreating || isUpdating;

    const { data: categories, isPending: isLoadingCategories, isError: categoriesError } = useCategories();

    function onSubmit(values: z.infer<typeof formSchema>) {

        const formData = new FormData();

        const productData = {
            productId: values.productId ?? '',
            productName: values.productName,
            categoryId: values.categoryId,
            productDescription: values.productDescription,
            imageUrl: values.imageUrl
        };

        formData.append('data', JSON.stringify(productData))

        if (values.file) {
            formData.append("image", values.file);
        }

        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });

        if (isEditMode) {
            updateProductMutation(  
                formData,
                {
                    onSuccess: () => {
                        onCloseDialog();
                    }
                }
            )
        } else {
            createProductMutation(
                formData,
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} tabIndex={-1} autoComplete="off"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                {/* <Input placeholder="" {...field} tabIndex={-1} autoComplete="off"/> */}
                                <Select 
                                    {...field}
                                    onValueChange={(value) => field.onChange(Number(value))} // Convert back to number if needed
                                    value={String(field.value)} // Make sure it's always a string
                                >
                                    <SelectTrigger className="w-full" disabled={isLoadingCategories || categoriesError}>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            {categories?.map(category => (
                                                <SelectItem 
                                                    value={String(category.categoryId)} 
                                                    key={category.categoryId}
                                                >
                                                    {category.categoryName}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            { categoriesError && <FormMessage> We encountered an error with the categories. </FormMessage> }
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
                                <Textarea placeholder="" {...field} tabIndex={-1} autoComplete="off"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="hidden">
                            <FormLabel>Image Url</FormLabel>
                            <FormControl>
                                <Input placeholder=""  {...field} tabIndex={-1} autoComplete="off"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input 
                                    id="picture"  
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file); // Pass the file to react-hook-form
                                        console.log(form.getValues())
                                    }} 
                                    className="cursor-pointer"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <DialogFooter>
                    <Button 
                        type="submit" 
                        disabled={isLoading || !form.formState.isDirty}
                    >
                        { isLoading && <Loader2 className="animate-spin" /> }
                        {isEditMode ? 'Apply Changes' : 'Create' }
                    </Button>
                </DialogFooter>
                
            </form>
        </Form>
    )
}