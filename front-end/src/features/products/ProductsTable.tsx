// import { Button } from "../../components/ui/button"
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Input } from "../../components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { CreateEditProduct } from "./CreateEditProduct";
import { ProductRow } from "./ProductsRow"
import { useProducts } from "./useProducts"
import { useState } from "react";
  
  
export function ProductsTable() {

    const [open, setOpen] = useState<boolean>(false);

    const { data, isPending, error } = useProducts();

    if (isPending) return <p>Loading...</p>;

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error.message || 'There was an error fetching products'}
                </AlertDescription>
            </Alert>
        )
    }
        
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <Input placeholder="Search"  className="w-50"/>

                <CreateEditProduct open={open} setOpen={setOpen}/>
            </div>
            
            <div className="p-4 border-solid border border-border rounded-[var(--radius)]">
                <Table>
                    <TableCaption>A list of your products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Date Created</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((row) => (
                            <ProductRow row={row} key={row.productId}/>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
        </div>
    )
}
  