import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Addresses from './pages/Addresses'
import ProductDetail from './pages/ProductDetail'
import Register from './pages/Register'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminProducts from './pages/admin/AdminProducts'
import Products from './pages/Products'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { initializing } = useAuth()
  if (initializing) {
    return <div className="loading-state" style={{ textAlign: 'center', marginTop: 40 }}>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/account/addresses" element={<Addresses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProductForm />} />
        <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
