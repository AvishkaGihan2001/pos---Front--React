/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";

function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryID, setCategoryID] = useState<number>(0);
  const [categoryName, setCategoryName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCategoryID, setEditCategoryID] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  // Load all categories
  async function loadCategories() {
    try {
      const apiResponse = await axios.get("http://localhost:8080/categories");
      setCategories(apiResponse.data);
    } catch (error) {
      alert("Error loading categories: " + error);
    }
  }

  // Load a single category by ID
  async function loadCategory() {
    try {
      const apiResponse = await axios.get(
        `http://localhost:8080/category/${categoryID}`
      );
      setSelectedCategory(apiResponse.data); // Set the single category
    } catch (error) {
      alert("Category not found: " + error);
    }
  }

  function handleCategoryID(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoryID(parseInt(event.target.value));
  }

  // Handle input changes with correct typing
  function handleCategoryName(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoryName(event.target.value);
  }

  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  // Add a new category
  async function addCategory() {
    if (!categoryName || !description) return;

    const data = { name: categoryName, description: description };

    try {
      await axios.post("http://localhost:8080/category", data);
      loadCategories(); // Reload categories after adding
      closeModal();
    } catch (error) {
      alert("Error adding category: " + error);
    }
  }

  // Update an existing category
  async function updateCategory() {
    if (!editCategoryID || !categoryName || !description) return;

    const data = {
      categoryID: editCategoryID,
      name: categoryName,
      description: description,
    };

    try {
      await axios.put(`http://localhost:8080/category/${editCategoryID}`, data);
      loadCategories(); // Reload categories after updating
      closeModal();
    } catch (error) {
      alert("Error updating category: " + error);
    }
  }

  // Delete a category
  async function deleteCategory(categoryID: number) {
    try {
      confirm("Are you sure you want to delete this category?");
      await axios.delete(`http://localhost:8080/category/${categoryID}`);
      loadCategories();
    } catch (error) {
      alert("Error deleting category: " + error);
    }
  }

  function clearSelectedCategory() {
    setCategoryID(0);
    setSelectedCategory(null);
  }

  // Open modal for adding or editing categories
  const openModal = (category: CategoryType | null = null) => {
    if (category) {
      setCategoryName(category.name);
      setDescription(category.description || "");
      setEditCategoryID(category.categoryID);
      setIsEditMode(true);
    } else {
      setCategoryName("");
      setDescription("");
      setIsEditMode(false);
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditCategoryID(null);
  };

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container mx-auto mt-5 mb-5 ml-10 w-[1100px]">
      <h1 className="text-4xl font-bold underline mb-5 mt-5 text-violet-500">
        Category
      </h1>
      <div className="flex items-center mb-5">
        <input
          className="flex w-[200px] p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-4"
          type="number"
          placeholder="Enter Category ID"
          value={categoryID}
          onChange={handleCategoryID}
        />

        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-10 mb-5"
          onClick={loadCategory}
        >
          Load Category
        </button>

        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-3 mb-5"
          onClick={clearSelectedCategory}
        >
          Clear
        </button>
      </div>

      {selectedCategory && (
        <div className="mb-5 p-4 border border-slate-400 rounded-lg">
          <h2 className="text-xl font-bold">Selected Category:</h2>
          <p>ID: {selectedCategory.categoryID}</p>
          <p>Name: {selectedCategory.name}</p>
          <p>Description: {selectedCategory.description}</p>
        </div>
      )}

      <button
        className="p-4 border border-slate-400 rounded-lg me-3 text-violet-500 hover:bg-violet-700 hover:text-white ml-[950px] mb-5 "
        onClick={() => openModal()}
      >
        Add Category
      </button>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-400 p-2">ID</th>
            <th className="border border-slate-400 p-2">Name</th>
            <th className="border border-slate-400 p-2">Description</th>
            <th className="border border-slate-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryID}>
              <td className="border border-slate-400 p-2">
                {category.categoryID}
              </td>
              <td className="border border-slate-400 p-2">{category.name}</td>
              <td className="border border-slate-400 p-2">
                {category.description}
              </td>
              <td className="border border-slate-400 p-2">
                <button
                  className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white"
                  onClick={() => openModal(category)}
                >
                  Edit
                </button>
                <button
                  className="p-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-3 rounded-lg"
                  onClick={() => deleteCategory(category.categoryID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Category" : "Add Category"}
            </h2>
            <input
              className="block w-full p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-4"
              type="text"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={handleCategoryName}
            />
            <input
              className="block w-full p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-4"
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={handleDescription}
            />
            <div className="flex justify-end">
              <button
                className="mr-3 px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 border border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white rounded-lg"
                onClick={isEditMode ? updateCategory : addCategory}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
