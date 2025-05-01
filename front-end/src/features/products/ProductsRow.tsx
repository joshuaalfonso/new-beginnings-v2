import { TableCell, TableRow } from "../../components/ui/table"
import { format } from 'date-fns';
import { DeleteProductDialog } from "./DeleteProductDialog";
import { CreateEditProduct } from "./CreateEditProduct";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "../../components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Ellipsis } from 'lucide-react';
import { Pencil, Trash2  } from 'lucide-react';
import { ProductList } from "../../models/products";

// Define the type for the row prop
interface ProductRowProps {
    row: ProductList,
    index: number
}

export const ProductRow: React.FC<ProductRowProps> = ({row, index}) => {

    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
    const [showCreateEditDialog, setShowCreateEditDialog] = useState<boolean>(false);

    const {
        productId,
        productName,
        productCategory,
        productDescription,
        dateCreated
    } = row;

    return (
        <>
            <TableRow key={productId}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                    <img 
                        src={`http://192.168.1.11:3000/images/${row.imageUrl}`} 
                        alt="image" 
                        
                        className="h-10 w-15 object-cover"
                    />
                </TableCell>
                <TableCell>{productName}</TableCell>
                <TableCell>{productCategory}</TableCell>
                <TableCell>{productDescription}</TableCell>
                <TableCell className="text-right">
                    {format(dateCreated as string, 'MMMM dd, yyyy HH:mm')}
                </TableCell>

                <TableCell>

                    <DeleteProductDialog 
                        productId={productId as number}
                        open={showDeleteDialog}
                        setOpen={setShowDeleteDialog}  
                    />

                    <CreateEditProduct 
                        product={row}
                        open={showCreateEditDialog}
                        setOpen={setShowCreateEditDialog}
                    />

                    <DropdownMenu open={showDropdownMenu} onOpenChange={setShowDropdownMenu}>

                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">

                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onSelect={(e) => {
                                 e.preventDefault();
                                 setShowDropdownMenu(false);
                                 setShowCreateEditDialog(true)
                            }} >
                               <Pencil /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem onSelect={(e) => {
                                 e.preventDefault();
                                 setShowDropdownMenu(false);
                                 setShowDeleteDialog(true)
                            }} >
                               <Trash2 /> Delete
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                        
                    </DropdownMenu>
                    

                </TableCell>
            </TableRow>
        </>
    )
} 