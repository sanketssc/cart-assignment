
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

export type CartItem = {
    id: string;
    userId: string;
    productId: number;
    quantity: number;
    productPrice: string
}