import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useCategories } from "./useCategories"
import { CategoryRow } from "./CategoryRow";



export const CategoriesTable = () => {


    const { data, isPending, error } = useCategories();

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
                {/* <CreateEditProduct open={open} setOpen={setOpen}/> */}
                <Button>Create</Button>
            </div>
            
            <div className="p-4 border-solid border border-border rounded-[var(--radius)]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Date Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((row, index) => (
                            <CategoryRow row={row} key={row.categoryId} index={index}/>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
        </div>
    )
}