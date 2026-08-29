import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Orders from './pages/Orders'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminProducts from './pages/admin/AdminProducts'
import Products from './pages/Products'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProductForm />} />
        <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
      </Routes>
    </BrowserRouter>
  )
}
