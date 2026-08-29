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
      <div>
        <Link to="/">Products</Link> <Link to="/cart">Cart</Link>
        {cartItemCount > 0 ? ` (${cartItemCount})` : null}{' '}
        <Link to="/orders">Orders</Link>{' '}
        {isAdmin ? <Link to="/admin/products">Admin</Link> : null}
      </div>
      <div>
        {user ? (
          <>
            <span>{user.name}</span> <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
