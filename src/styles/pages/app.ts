import { styled } from ".."
import * as Dialog from '@radix-ui/react-dialog'

import { keyframes } from '@stitches/react'

const slideInFromRight = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' }
})

const slideOutToRight = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(100%)' },
})

export const Container = styled('div', {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
})

export const Header = styled('header', {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: 'flex',
  alignItems: 'center',

  variants: {
    justify: {
      center: {
        justifyContent: 'center'
      },
      spaceBetween: {
        justifyContent: 'space-between'
      }
    }
  }
})

export const Button = styled('button', {
  position: 'relative',
  padding: 12,
  background: '$gray800',
  border: 0,
  borderRadius: 6,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  
  width: 48,
  height: 48,

  variants: {
    cart: {
      empty: {
        color: '$gray500',
      },
      load: {
        color: '$gray100'
      }
    }
  },
  '&:disabled': {
    cursor: 'not-allowed',
  }
})

export const ItemsQuantity = styled('span', {
  width: 27,
  height: 27,
  borderRadius: 999,
  border: '3px solid $gray900',
  backgroundColor: '$green500',
  color: '$white',
  fontSize: '$sm',
  fontWeight: 'bold',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  top: -8,
  right: -8.345,
})

export const CartContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',

  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,

  width: '30rem',
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  padding: '4.5rem 3rem 3rem 3rem',

  zIndex: 99,

  animation: `${slideInFromRight} 0.3s ease-in-out`,
  '&[data-state="closed"]': {
    animation: `${slideOutToRight} 0.3s ease-in-out`,
  },

  h2: {
    fontSize: '$lg',
    color: '$gray100',

    marginBottom: '2rem',
  },

  img: {
    borderRadius: 8,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  }
})

export const CartItems = styled('div', {
  height: 330,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  overflowY: 'auto',

  marginBottom: '12.375rem'
})

export const CartItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem'
})

export const CardInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  h3: {
    color: '$gray100',
    fontSize: '$md',
    fontWeight: 'normal',
    lineHeight: 1.6,
  },

  span: {
    color: '$gray100',
    fontWeight: 'bold',
    fontSize: '$md',
    lineHeight: 1.6,

    marginBottom: '.5rem'
  },

  button: {
    border: 0,
    background: 'none',
    color: '$green500',
    fontWeight: 'bold',
    
    transition: 'color .2s',
    
    '&:hover': {
      color: '$green300'
    },
    cursor: 'pointer',
  }
})

export const CartClose = styled(Dialog.Close, {
  position: 'absolute',
  top: '1.75rem',
  right: '1.75rem',

  border: 0,
  background: 'none',
  color: '$gray500',

  cursor: 'pointer'
})

export const TotalItems = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBottom: 7,

  span: {
    color: '$gray100',
    lineHeight: 1.6,
  },

  '.items': {
    color: '$gray300',
    fontSize: '$md',
  } 
})

export const TotalPrice = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  span: {
    color: '$gray100',
    lineHeight: 1.6,
    fontWeight: 'bold',
    fontSize: '$md'
  },

  '.price': {
    fontSize: '$xl',
  },
  marginBottom: 57,
})

export const FinishButton = styled('button', {
  border: 0,
  borderRadius: 8,
  backgroundColor: '$green500',
  transition: 'background-color .2s',
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',
  color: '$white',

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  }
})


export const PriceInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  bottom: '3rem',
  right: '3rem',
  left: '3rem',
})