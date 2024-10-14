import ItemType from "./ItemType";

interface OrderType {
  orderID: number;
  itemIDs: number[];
  quantities: number[];
  customerName: string;

    orderDateTime?: string;
    orderTotal?: number;
    orderItems?: ItemType[];
}

export default OrderType;