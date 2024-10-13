import CategoryType from "./CategoryType";

interface ItemType {
    itemID: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: CategoryType;
}

export default ItemType;