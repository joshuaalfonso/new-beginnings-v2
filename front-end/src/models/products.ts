


export interface ProductList {
    productId: number
    productName: string
    categoryId: number
    productCategory: string
    productDescription: string
    imageUrl: string
    dateCreated: string | null
}

export interface ProductPost {
    productId: number
    productName: string
    categoryId: number
    productDescription: string
}