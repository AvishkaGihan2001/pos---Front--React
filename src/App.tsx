import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Navbar from './pages/Navbar'
import Item from './pages/Item';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Item />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
