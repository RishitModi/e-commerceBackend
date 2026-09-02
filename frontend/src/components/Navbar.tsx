import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const { cart } = useCart()
  const cartItemCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Modeiji Store</Link>

      <div className="navbar-links">
        <Link to="/">Products</Link>
        <Link to="/cart">
          <span className="navbar-cart">
            <span>Cart</span>
            {cartItemCount > 0 ? <span>({cartItemCount})</span> : null}
          </span>
        </Link>
        <Link to="/orders">Orders</Link>
        {isAdmin ? <Link to="/admin/products">Admin</Link> : null}
      </div>

      <div className="navbar-auth">
        {user ? (
          <>
            <Link to="/account">{user.name}</Link>
            <button className="button-danger" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
