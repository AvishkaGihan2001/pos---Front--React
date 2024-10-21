/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import ItemType from "../types/ItemType";
import OrderType from "../types/OrderType";

function Order() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [itemID, setItemID] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState<ItemType | null>(null);
  const [itemIDs, setItemIDs] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [customerName, setCustomerName] = useState("");

  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);

  function handleItemID(event: React.ChangeEvent<HTMLInputElement>) {
    setItemID(parseInt(event.target.value));
  }

  function handleQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(parseInt(event.target.value));
  }

  function handleCustomerName(event: React.ChangeEvent<HTMLInputElement>) {
    setCustomerName(event.target.value);
  }

  async function getItem(itemID: number) {
    if (itemID <= 0) return alert("Item ID should be greater than 0");
    try {
      const apiResponse = await axios.get(
        `http://localhost:8080/item/${itemID}`
      );
      if (apiResponse.data) {
        setItem(apiResponse.data);
        setItemName(apiResponse.data.name);
        setItemDescription(apiResponse.data.description);
      }
    } catch (error) {
      alert("Item not found: " + error);
    }
  }

  async function addToItemList() {
    if (!item) return;
    if (item.quantity < quantity) {
      alert("Not enough stock");
      return;
    }
    if (quantity <= 0) {
      alert("Quantity should be greater than 0");
      return;
    }
    itemList.push(item);
    itemIDs.push(item.itemID);
    quantities.push(quantity);
    clearItem();
  }

  async function removeFromItemList(itemID: number) {
    const index = itemIDs.indexOf(itemID);
    itemList.splice(index, 1);
    itemIDs.splice(index, 1);
    quantities.splice(index, 1);

    setItemList([...itemList]);
  }

  async function addOrder() {
    if (!itemIDs || !quantities || !customerName)
      return alert("Please fill Customer Name & Add Items");

    const data = {
      itemIDs: itemIDs,
      quantities: quantities,
      customerName: customerName,
    };

    try {
      const apiResponse = await axios.post("http://localhost:8080/order", data);

      setOrderDetails(apiResponse.data);
      setIsModalOpen(true);

      setOrders([...orders, apiResponse.data]);
    } catch (error) {
      alert("Error adding order: " + error);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setOrderDetails(null);
    setCustomerName("");
    setItemIDs([]);
    setQuantities([]);
    setItemList([]);
  };

  function clearItem() {
    setItem(null);
    setItemID(0);
    setQuantity(0);
    setItemName("");
    setItemDescription("");
  }
  return (
    <div className="flex">
      <div className="container mx-auto mt-5 mb-5 ml-10 w-[500px] border border-gray-400 p-5 rounded-lg">
        <h1 className="text-2xl font-semibold mb-5">Place Order</h1>
        <div>
          <label className="block mb-2">Customer Name</label>
          <input
            type="text"
            className="border border-gray-300 p-1 mb-3 w-full"
            onChange={handleCustomerName}
            value={customerName}
          />
        </div>
        <div>
          <label className="block mb-2">Item ID</label>
          <input
            type="number"
            placeholder="Enter Item ID"
            className="border border-gray-300 p-1 mb-3 w-[150px]"
            onChange={handleItemID}
            value={itemID}
          />
          <button
            className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-3 mb-5"
            onClick={() => getItem(itemID)}
          >
            Load Item
          </button>
          <button
            className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-3 mb-5"
            onClick={clearItem}
          >
            Clear Item
          </button>
        </div>
        <div>
          <label className="block mb-2">Item Name</label>
          <input
            type="text"
            placeholder="Enter Item Name"
            className="border border-gray-300 p-1 mb-3 w-full"
            value={itemName}
            disabled
          />
        </div>
        <div>
          <label className="block mb-2">Item Description</label>
          <input
            type="text"
            placeholder="Enter Item Description"
            className="border border-gray-300 p-1 mb-3 w-full"
            value={itemDescription}
            disabled
          />
        </div>
        <div>
          <label className="block mb-2">Quantities</label>
          <input
            type="text"
            className="border border-gray-300 p-1 mb-3 w-full"
            onChange={handleQuantity}
            value={quantity}
          />
        </div>

        <div>
          <button
            className="bg-violet-500 text-white p-2 w-full mt-5 rounded-xl hover:bg-violet-700 hover:text-white hover:shadow-lg"
            onClick={addToItemList}
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-5 mb-5 ml-10 w-[1000px] border border-gray-400 p-5 rounded-lg">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">#</th>
              <th className="border border-gray-400 p-2">Name</th>
              <th className="border border-gray-400 p-2">Description</th>
              <th className="border border-gray-400 p-2">Unit Price</th>
              <th className="border border-gray-400 p-2">Quantity</th>
              <th className="border border-gray-400 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item) => (
              <tr key={item.itemID}>
                <td className="border border-gray-400 p-2">{item.itemID}</td>
                <td className="border border-gray-400 p-2">{item.name}</td>
                <td className="border border-gray-400 p-2">
                  {item.description}
                </td>
                <td className="border border-gray-400 p-2">{item.price}</td>
                <td className="border border-gray-400 p-2">
                  {quantities[itemList.indexOf(item)]}
                </td>
                <td className="border border-gray-400 p-2">
                  <button
                    className="p-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-3 rounded-lg"
                    onClick={() => removeFromItemList(item.itemID)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-violet-500 text-white p-2 w-full mt-5 rounded-xl hover:bg-violet-700 hover:text-white hover:shadow-lg"
          onClick={() => addOrder()}
        >
          Place Order
        </button>

        {isModalOpen && orderDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
              <h2 className="text-xl font-bold mb-4">Order Summery</h2>
              <p>
                <strong>Customer Name:</strong> {orderDetails.customerName}
              </p>
              <p>
                <strong>Order ID:</strong> {orderDetails.orderID}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(orderDetails.orderDateTime).toLocaleString()}
              </p>

              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {orderDetails.orderItems.map((item: any, index: number) => (
                  <li key={index} className="mb-2">
                    <strong>Item Name:</strong> {item.name}
                  </li>
                ))}
              </ul>
              <p className="text-xl font-bold  mt-4">
                <strong>Order Total:</strong>
                {orderDetails.orderTotal.toFixed(2)}
              </p>

              <label className="block mb-2 text-green-500 text-2xl align-middle">
                Order placed successfully !! Come back soon
              </label>

              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
