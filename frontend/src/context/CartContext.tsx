import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  addToCart,
  createCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../api/cart'
import type { CartDto } from '../types/cart'

type CartContextValue = {
  cart: CartDto | null
  addItem: (productId: number) => Promise<void>
  updateItem: (productId: number, quantity: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartDto | null>(null)

  useEffect(() => {
    const initCart = async () => {
      const savedCartId = localStorage.getItem('cartId')

      if (savedCartId) {
        const existingCart = await getCart(savedCartId)
        setCart(existingCart)
        return
      }

      const newCart = await createCart()
      setCart(newCart)
      localStorage.setItem('cartId', newCart.id)
    }

    void initCart()
  }, [])

  const addItem = async (productId: number) => {
    if (!cart) {
      throw new Error('Cart is not initialized')
    }

    await addToCart(cart.id, productId)
    const refreshedCart = await getCart(cart.id)
    setCart(refreshedCart)
  }

  const updateItem = async (productId: number, quantity: number) => {
    if (!cart) {
      throw new Error('Cart is not initialized')
    }

    try {
      await updateCartItem(cart.id, productId, quantity)
      const refreshedCart = await getCart(cart.id)
      setCart(refreshedCart)
    } catch (error) {
      console.error('Failed to update cart item', error)
      throw error
    }
  }

  const removeItem = async (productId: number) => {
    if (!cart) {
      throw new Error('Cart is not initialized')
    }

    try {
      await removeCartItem(cart.id, productId)
      const refreshedCart = await getCart(cart.id)
      setCart(refreshedCart)
    } catch (error) {
      console.error('Failed to remove cart item', error)
      throw error
    }
  }

  const value = useMemo(
    () => ({ cart, addItem, updateItem, removeItem }),
    [cart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
