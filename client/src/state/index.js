import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isCartOpen: false,
  cart: [],
  beats: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setBeats: (state, action) => {
      state.beats = action.payload
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.beat]
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((beat) => beat.id !== action.payload.id)
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((beat) => {
        if (beat.id == action.payload.id) {
          beat.count++;
        }
        return beat;
      })
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((beat) => {
        if (beat.id == action.payload.id && beat.count > 1) {
          beat.count--;
        }
        return beat;
      })
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    }
  }
})

export const {
  setBeats,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions

export default cartSlice.reducer
