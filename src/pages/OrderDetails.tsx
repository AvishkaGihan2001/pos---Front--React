import { useEffect, useState } from "react";
import OrderType from "../types/OrderType";
import axios from "axios";

function OrderDetails() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [orderID, setOrderID] = useState<number>(0);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  async function loadOrders() {
    try {
      const apiResponse = await axios.get("http://localhost:8080/orders");
      setOrders(apiResponse.data);
    } catch (error) {
      alert("Error loading orders: " + error);
    }
  }

  async function loadOrder() {
    try {
      const apiResponse = await axios.get(
        `http://localhost:8080/order/${orderID}`
      );
      setSelectedOrder(apiResponse.data);
    } catch (error) {
      alert("Order not found: " + error);
      }
      
  }

  function handleOrderID(event: React.ChangeEvent<HTMLInputElement>) {
    setOrderID(parseInt(event.target.value));
  }

  function clearSelectedOrder() {
    setOrderID(0);
    setSelectedOrder(null);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="container mx-auto mt-5 mb-5 ml-10 w-[1200px]">
      <h1 className="text-4xl font-bold  mb-5 mt-5 text-violet-500">Order</h1>

      <div className="flex items-center mb-5">
        <input
          className="flex w-[200px] p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-4"
          type="number"
          placeholder="Enter Order ID"
          value={orderID}
          onChange={handleOrderID}
        />

        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-10 mb-5"
          onClick={loadOrder}
        >
          Load Order
        </button>

        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-3 mb-5"
          onClick={clearSelectedOrder}
        >
          Clear
        </button>
      </div>

      {selectedOrder && (
        <div className="border border-slate-400 p-5 mb-5">
          <h2 className="text-xl font-bold text-violet-500 mb-3">
            Order Details
          </h2>
          <p>
            <span className="font-bold">Order ID:</span> {selectedOrder.orderID}
          </p>
          <p>
            <span className="font-bold">Order Date:</span>{" "}
            {selectedOrder.orderDateTime}
          </p>
          <p>
            <span className="font-bold">Customer Name:</span>{" "}
            {selectedOrder.customerName}
          </p>
          <p>
            <span className="font-bold">Total Amount:</span>{" "}
            {selectedOrder.orderTotal}
          </p>
        </div>
          )}
          
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border border-slate-400 p-2">Order ID</th>
                <th className="border border-slate-400 p-2">Order Date</th>
                <th className="border border-slate-400 p-2">Customer Name</th>
                <th className="border border-slate-400 p-2">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderID}
                  className="text-center border border-slate-400"
                >
                  <td className="p-2">{order.orderID}</td>
                  <td className="p-2">{order.orderDateTime}</td>
                  <td className="p-2">{order.customerName}</td>
                  <td className="p-2">{order.orderTotal}</td>
                </tr>
              ))}
            </tbody>
           </table>
    </div>
  );
}

export default OrderDetails;
