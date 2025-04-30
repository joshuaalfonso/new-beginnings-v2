import { TableCell, TableRow } from "../../components/ui/table"
import { CategoryList } from "../../models/categories"

interface CategoryRowProps {
    row: CategoryList,
    index: number
}

export const CategoryRow = ({row, index}: CategoryRowProps) => {

    const {categoryId, categoryName, dateCreated} = row

    return (
        <>
            <TableRow key={categoryId}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{categoryName}</TableCell>
                <TableCell>{dateCreated}</TableCell>
            </TableRow>
        </>
    )
}