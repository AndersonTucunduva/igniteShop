import Image from "next/image"
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, HomeContainerWrapper, Product } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"

import Link from "next/link"
import Head from "next/head"
import { Handbag, CaretRight, CaretLeft } from "@phosphor-icons/react"
import { MouseEvent, useContext, useEffect, useState } from "react"
import { CartContext } from "../contexts/CartContext"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    numberPrice: number
    description: string
    defaultPriceId: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addToCart } = useContext(CartContext)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  function handleAddToCartClick(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, product: HomeProps['products'][0]) {
    event.preventDefault()

    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainerWrapper>
        <HomeContainer ref={sliderRef} className="keen-slider">
          {
            products.map(product => {
              return (
                <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
                  <Product className="keen-slider__slide">
                    <Image src={product.imageUrl} width={520} height={480} alt=""/>

                    <footer>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.price}</span>
                      </div>

                      <button onClick={(e) => handleAddToCartClick(e, product)}>
                        <Handbag size={32} weight="bold" />
                      </button>
                    </footer>
                  </Product>
                </Link>
              )
            })
          }
        </HomeContainer>

        {
          loaded && instanceRef.current &&
          (
            <>
              {currentSlide !== 0 &&
                <button
                  className='left'
                  onClick={() => instanceRef.current.prev()}
                >
                  <CaretLeft size={48} />
                </button>
              }
              {currentSlide !== instanceRef.current.track.details.slides.length - 2 &&
                <button
                  className='right'
                  onClick={() => instanceRef.current.next()}
                >
                  <CaretRight size={48} />
                </button>
              }
            </>
          )
        }
      </HomeContainerWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      description: product.description,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}