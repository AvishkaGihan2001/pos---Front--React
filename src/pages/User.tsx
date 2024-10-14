import { useEffect, useState } from "react";
import UserType from "../types/UserType";
import axios from "axios";

function User() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [user, setUser] = useState<UserType>({
    userID: 0,
    username: "",
    password: "",
  });
  const [userID, setUserID] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  function handleUserID(event: React.ChangeEvent<HTMLInputElement>) {
    setUserID(parseInt(event.target.value));
  }

  // Load all users
  async function loadUsers() {
    try {
      const apiResponse = await axios.get("http://localhost:8080/users");
      setUsers(apiResponse.data);
    } catch (error) {
      alert("Error loading users: " + error);
    }
  }

  // Load a single user by ID
  async function loadUser() {
    try {
      const apiResponse = await axios.get(
        `http://localhost:8080/user/${userID}`
      );
      setSelectedUser(apiResponse.data); // Set the single user
    } catch (error) {
      alert("User not found: " + error);
    }
  }

  // Add a new user
  async function addUser() {
    if (!user.username || !user.password) return;

    const data = { username: user.username, password: user.password };

    try {
      await axios.post("http://localhost:8080/user", data);
      loadUsers(); // Reload users after adding
    } catch (error) {
      alert("Error adding user: " + error);
    }
  }

  // Update an existing user

  async function updateUser() {
    if (!user.username || !user.password) return;

    const data = { username: user.username, password: user.password };

    try {
      await axios.put(`http://localhost:8080/user/${user.userID}`, data);
      loadUsers(); // Reload users after updating
    } catch (error) {
      alert("Error updating user: " + error);
    }
  }

  // Delete a user
  async function deleteUser(userID: number) {
    try {
      await axios.delete(`http://localhost:8080/user/${userID}`);
      loadUsers(); // Reload users after deleting
    } catch (error) {
      alert("Error deleting user: " + error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // Open the modal
  function openModal(user?: UserType) {
    setIsModalOpen(true);
    if (user) {
      setUser(user);
      setIsEditMode(true);
    } else {
      setUser({ userID: 0, username: "", password: "" });
      setIsEditMode(false);
    }
  }

  // Close the modal
  function closeModal() {
    setIsModalOpen(false);
    setUser({ userID: 0, username: "", password: "" });
    setIsEditMode(false);
  }

  // Handle form submission
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isEditMode) {
      updateUser();
    } else {
      addUser();
    }
    closeModal();
  }

  // Handle form changes
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  // Clear selected user
  function clearSelectedUser() {
    setUserID(0);
    setSelectedUser(null);
  }

  return (
    <div className="container mx-auto mt-5 mb-5 ml-10 w-[1100px]">
      <h1 className="text-4xl font-bold underline mb-5 mt-5 text-violet-500">
        Users
      </h1>
      <div className="flex items-center mb-5">
        <input
          className="flex w-[200px] p-2 border border-slate-400 rounded-lg text-slate-800 text-md mb-4"
          type="number"
          placeholder="Enter User ID"
          value={userID}
          onChange={handleUserID}
        />

        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-10 mb-5"
          onClick={loadUser}
        >
          Load User
        </button>

        <button
          className="p-2 border border-slate-400 rounded-lg text-violet-500 hover:bg-violet-700 hover:text-white ml-3 mb-5"
          onClick={clearSelectedUser}
        >
          Clear
        </button>
      </div>

      <div className="mt-5">
        {selectedUser && (
          <div className="mb-5 p-4 border border-slate-400 rounded-lg">
            <h2 className="text-2xl font-bold underline mb-5 text-violet-500">
              User Details
            </h2>
            <p>
              <span className="font-bold">User ID:</span> {selectedUser.userID}
            </p>
            <p>
              <span className="font-bold">User Name:</span>{" "}
              {selectedUser.username}
            </p>
            <p>
              <span className="font-bold">Password:</span>{" "}
              {selectedUser.password}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => openModal()}
        className="p-4 border border-slate-400 rounded-lg me-3 text-violet-500 hover:bg-violet-700 hover:text-white ml-[950px] mb-5 "
      >
        Add User
      </button>
      <div className="mt-5">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userID}>
                <td className="border px-4 py-2">{user.userID}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.password}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.userID)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.username}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3
                                        sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
