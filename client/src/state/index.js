import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the cart slice of the beatstore
const initialState = {
  isCartOpen: false,
  cart: [],
  beats: [],
}

// Create a new slice of the beatstore called "cart" using the createSlice function
export const cartSlice = createSlice({
  // Specify the name of the slice
  name: "cart",
  // Pass in the initial state to the slice
  initialState,
  // Define the reducers that can modify the state
  reducers: {
    // Set the list of beats in the state
    setBeats: (state, action) => {
      state.beats = action.payload
    },
    // Add a beat to the cart
    addToCart: (state, action) => {
      // Use the spread operator to add the new beat to the existing cart array
      state.cart = [...state.cart, action.payload.beat]
    },
    // Remove a beat from the cart by ID
    removeFromCart: (state, action) => {
      // Filter out the beat with the matching ID from the cart array
      state.cart = state.cart.filter((beat) => beat._id !== action.payload.id)
    },
    // Increase the count of a beat in the cart by ID
    increaseCount: (state, action) => {
      // Map over the cart array and increment the count of the beat with the matching ID
      state.cart = state.cart.map((beat) => {
        if (beat._id === action.payload.id) {
          beat.count++;
        }
        return beat;
      })
    },
    // Decrease the count of a beat in the cart by ID
    decreaseCount: (state, action) => {
      // Map over the cart array and decrement the count of the beat with the matching ID, but only if the count is greater than 1
      state.cart = state.cart.map((beat) => {
        if (beat._id === action.payload.id && beat.count > 1) {
          beat.count--;
        }
        return beat;
      })
    },
    // Toggle the isCartOpen boolean value
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    // Reset the cart to an empty array and set isCartOpen to false
    resetCart: (state) => {
      state.isCartOpen = false;
      state.cart = [];
    },
  }
})

// Export the individual action creators from the cartSlice object
export const {
  setBeats,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  resetCart,
} = cartSlice.actions

// Export the reducer function
export default cartSlice.reducer
