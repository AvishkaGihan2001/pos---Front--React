import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Navbar from "./pages/Navbar";
import Item from "./pages/Item";
import Order from "./pages/Order";
import User from "./pages/User";
import Login from "./pages/auth/Login";
import OrderDetails from "./pages/OrderDetails";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/product" element={<Item />} />
              <Route path="/order" element={<Order />} />
              <Route path="/orderDetails" element={<OrderDetails />} />
              <Route path="/user" element={<User />} />
            </Route>
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
