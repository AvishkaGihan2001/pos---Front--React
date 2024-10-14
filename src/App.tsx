import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Navbar from './pages/Navbar'
import Item from './pages/Item';
import Order from './pages/Order';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Item />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
