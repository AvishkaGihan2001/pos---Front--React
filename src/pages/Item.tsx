import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import axios from "axios";
import CategoryType from "../types/CategoryType";

function Item() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [itemID, setItemID] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [categoryID, setCategoryID] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItemID, setEditItemID] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  async function loadItems() {
    try {
      const apiResponse = await axios.get("http://localhost:8080/items");
      setItems(apiResponse.data);
    } catch (error) {
      alert("Error loading items: " + error);
    }
  }

  async function loadItem() {
    try {
      const apiResponse = await axios.get(
        `http://localhost:8080/item/${itemID}`
      );
      setSelectedItem(apiResponse.data); // Set the single item
    } catch (error) {
      alert("Item not found: " + error);
    }
  }

  function handleItemID(event: React.ChangeEvent<HTMLInputElement>) {
    setItemID(parseInt(event.target.value));
  }

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handlePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(parseInt(event.target.value));
  }

  function handleQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(parseInt(event.target.value));
  }

  function handleCategoryID(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategoryID(parseInt(event.target.value));
  }

  async function addItem() {
    if (!name || !description || !price || !quantity || !categoryID) return;

    const data = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      categoryID: categoryID,
    };

    try {
      await axios.post("http://localhost:8080/item", data);
      loadItems(); // Reload items after adding
      closeModal();
    } catch (error) {
      alert("Error adding item: " + error);
    }
  }

  async function updateItem() {
    if (
      !editItemID ||
      !name ||
      !description ||
      !price ||
      !quantity ||
      !categoryID
    )
      return;

    const data = {
      itemID: editItemID,
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      categoryID: categoryID,
    };

    try {
      await axios.put(`http://localhost:8080/item/${editItemID}`, data);
      loadItems(); // Reload items after updating
      closeModal();
    } catch (error) {
      alert("Error updating item: " + error);
    }
  }

  async function deleteItem(itemID: number) {
    try {
      confirm("Are you sure you want to delete this item?");
      await axios.delete(`http://localhost:8080/item/${itemID}`);
      loadItems(); // Reload items after deleting
    } catch (error) {
      alert("Error deleting item: " + error);
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditItemID(null);
    setName("");
    setDescription("");
    setPrice(0);
    setQuantity(0);
    setCategoryID(0);
  }

  function clearSelectedItem() {
    setItemID(0);
    setSelectedItem(null);
  }

  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  function loadCategories() {
    axios.get("http://localhost:8080/categories").then((response) => {
      setCategories(response.data);
    });
  }

  return (
    <div className="container mx-auto mt-5 mb-5 ml-10 w-[1200px]">
      <h1 className="text-4xl font-bold  mb-5 mt-5 text-violet-500">
        Product
      </h1>
      <div className="flex items-center mb-5">
        <input
          className="flex w-[200px] p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-4"
          type="number"
          placeholder="Enter Product ID"
          value={itemID}
          onChange={handleItemID}
        />
        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-3 mb-5"
          onClick={loadItem}
        >
          Load Product
        </button>

        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-3 mb-5"
          onClick={clearSelectedItem}
        >
          Clear
        </button>
      </div>

      {selectedItem && (
        <div className="flex flex-col border border-slate-400 rounded-lg p-5 mb-5">
          <h2 className="text-2xl font-bold text-violet-500 mb-3">
            Selected Product:
          </h2>
          <p>ID: {selectedItem.itemID}</p>
          <p>Name: {selectedItem.name}</p>
          <p>Description: {selectedItem.description}</p>
          <p>Price: {selectedItem.price}</p>
          <p>Quantity: {selectedItem.quantity}</p>
          <p>Category ID: {selectedItem.category.name}</p>
        </div>
      )}

      <button
        className="p-4 border border-slate-400 rounded-lg me-3 text-violet-500 hover:bg-violet-700 hover:text-white ml-[950px] mb-5 w-[200px] "
        onClick={() => openModal()}
      >
        Add Product
      </button>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-400 p-2">ID</th>
            <th className="border border-slate-400 p-2">Name</th>
            <th className="border border-slate-400 p-2">Description</th>
            <th className="border border-slate-400 p-2">Price</th>
            <th className="border border-slate-400 p-2">Quantity</th>
            <th className="border border-slate-400 p-2">Category ID</th>
            <th className="border border-slate-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemID}>
              <td className="border border-slate-400 p-2">{item.itemID}</td>
              <td className="border border-slate-400 p-2">{item.name}</td>
              <td className="border border-slate-400 p-2">
                {item.description}
              </td>
              <td className="border border-slate-400 p-2">{item.price}</td>
              <td className="border border-slate-400 p-2">{item.quantity}</td>
              <td className="border border-slate-400 p-2">
                {item.category.name}
              </td>
              <td className="border border-slate-400 p-2">
                <button
                  className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white"
                  onClick={() => {
                    openModal();
                    setIsEditMode(true);
                    setEditItemID(item.itemID);
                    setName(item.name);
                    setDescription(item.description);
                    setPrice(item.price);
                    setQuantity(item.quantity);
                    setCategoryID(item.category.categoryID);
                  }}
                >
                  Edit
                </button>
                <button
                  className="p-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-3 rounded-lg"
                  onClick={() => deleteItem(item.itemID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded-lg w-[500px]">
            <h2 className="text-2xl font-bold text-violet-500 mb-5">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h2>

            <input
              className="w-full p-2 border border-slate-400 rounded-lg mb-3"
              type="text"
              placeholder="Enter Product Name"
              value={name}
              onChange={handleName}
            />
            <input
              className="w-full p-2 border border-slate-400 rounded-lg mb-3"
              type="text"
              placeholder="Enter Product Description"
              value={description}
              onChange={handleDescription}
            />
            <label className="block text-sm text-gray-700 mb-2">Price</label>
            <input
              className="w-full p-2 border border-slate-400 rounded-lg mb-3"
              type="number"
              placeholder="Enter Product Price"
              value={price}
              onChange={handlePrice}
            />
            <label className="block text-sm text-gray-700 mb-2">Quantity</label>
            <input
              className="w-full p-2 border border-slate-400 rounded-lg mb-3"
              type="number"
              placeholder="Enter Product Quantity"
              value={quantity}
              onChange={handleQuantity}
            />
            <select
              className="w-full p-2 border border-slate-400 rounded-lg mb-3"
              value={categoryID}
              onChange={handleCategoryID}
            >
              <option disabled value={0}>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <button
                className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:text-violet-700"
                onClick={isEditMode ? updateItem : addItem}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
              <button
                className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:text-violet-700 ml-3"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
