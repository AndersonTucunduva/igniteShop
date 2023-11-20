import { styled } from "..";

export const HomeContainerWrapper = styled('div', {
  display: 'flex',
  position: 'relative',

  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  
  '& > button': {
    color: '$gray300',
    width: 136,
    minHeight: 656,
    border: 0,
    position: 'absolute',
  },
  
  '.left': {
    background: 'linear-gradient(to right, $gray900, transparent)',
  },
  
  '.right': {
    background: 'linear-gradient(to left, $gray900, transparent)',
    right: 0
  },

})

export const HomeContainer = styled('main', {
  // display: 'flex',
  // width: '100%',
  // maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  // marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled('div', {
  width: 696,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.25rem 2rem 1.25rem 1.25rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,

      strong: {
        fontSize: '$lg',
        color: '$gray100',
      },
  
      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
      },
    },

    button: {
      color: '$white',
      backgroundColor: '$green500',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color .2s',

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },

      border: 'none',
      borderRadius: 6,
      padding: 12,
      cursor: 'pointer',
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})