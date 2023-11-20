import { ReactNode, createContext, useEffect, useState } from "react";


interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

interface CartContextProps {
  cart: ProductProps[]
  cartTotal: number
  addToCart: (item: ProductProps) => void
  removeFromCart: (itemId: string, itemIndex: number) => void
}

interface CartContextProviderProps {
  children: ReactNode
}


export const CartContext = createContext({} as CartContextProps)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState([] as ProductProps[])

  const cartTotal = cart.reduce((acc, item) => acc + item.numberPrice, 0)

  function addToCart(item: ProductProps) {
    setCart(prevCart => [...prevCart, item])
  }

  function removeFromCart(itemId: string, itemIndex: number) {
    const updatedCart = [...cart];
  
    if (itemIndex >= 0 && itemIndex < updatedCart.length) {
      if (updatedCart[itemIndex].id === itemId) {
        updatedCart.splice(itemIndex, 1);
        setCart(updatedCart);
      }
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}