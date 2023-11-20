import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import logoImg from '../assets/logo.svg'
import { Button, CardInfo, CartItem, CartClose, CartContent, ItemsQuantity, Container, Header, CartItems, TotalItems, TotalPrice, FinishButton, PriceInfo } from "../styles/pages/app"
import Image from "next/image"

import { Handbag, X } from '@phosphor-icons/react'

import * as Dialog from '@radix-ui/react-dialog'
import { CartContext, CartContextProvider } from "../contexts/CartContext"
import { useContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <HeaderComp />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}

function HeaderComp() {
  const { pathname } = useRouter()
  const showCartButton = pathname !== '/success'

  const { cart, removeFromCart, cartTotal } = useContext(CartContext)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  
  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        products: cart,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <Header justify={showCartButton ? "spaceBetween" : "center"}>
      <Image src={logoImg} alt="" />
      {
        showCartButton &&
        <Dialog.Root>
          <Dialog.Trigger asChild>    
            <Button cart={cart.length !== 0 ? 'load' : 'empty'} disabled={cart.length === 0}>
              <Handbag size={24} weight="bold" />
              {cart.length !== 0 && <ItemsQuantity>{cart.length}</ItemsQuantity>}
            </Button>
          </Dialog.Trigger>
          <CartContent>
            <CartClose>
              <X size={24} weight="bold"/>
            </CartClose>

            <h2>Sacola de compras</h2>

            <CartItems>
              {cart && 
                cart.map((cartItem, cartItemIndex) => {
                  return (
                    <CartItem key={cartItemIndex}>
                      <Image src={cartItem.imageUrl} width={101.94} height={93} alt="" />
                      <CardInfo>
                        <h3>{cartItem.name}</h3>
                        <span>{cartItem.price}</span>
                        <button onClick={() => removeFromCart(cartItem.id, cartItemIndex)}>Remover</button>
                      </CardInfo>
                    </CartItem>
                  )
                })
              }
            </CartItems>

            <PriceInfo>
              <TotalItems>
                <span>Quantidade</span>
                {cart && <span className="items">{cart.length === 1 ? `${cart.length} item` : `${cart.length} itens`}</span>}
              </TotalItems>
              <TotalPrice>
                <span>Valor total</span>
                <span className="price">
                  {
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(cartTotal)
                  }
                </span>
              </TotalPrice>
              <FinishButton onClick={handleCheckout} disabled={isCreatingCheckoutSession}>Finalizar compra</FinishButton>
            </PriceInfo>
          </CartContent>
        </Dialog.Root>
      }
    </Header>
  )
}


