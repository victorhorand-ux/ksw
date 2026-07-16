import { create } from 'zustand'
import { persist } from 'zustand/middleware' // 🚀 1. Import Zustand's built-in storage manager
import { toast } from 'react-hot-toast'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // 🚀 2. persist handles loading the initial state automatically!
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          const currentQty = existingItem ? existingItem.quantity : 0
          
          if (currentQty + quantity > (product.stock || 0)) {
            toast.error(`Only ${product.stock || 0} items available in stock.`, {
              id: 'stock-limit',
            })
            return state 
          }

          let newItems
          if (existingItem) {
            newItems = state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          } else {
            newItems = [...state.items, { ...product, quantity }]
          }

          toast.success(`${product.name} added to bag!`, {
            icon: '🛒',
            id: 'cart-success', 
          })

          // 🚀 3. No need to call saveCart(), persist handles it!
          return { items: newItems }
        })
      },
      
      removeItem: (productId) => {
        set((state) => {
          const itemToRemove = state.items.find(item => item.id === productId)
          const newItems = state.items.filter(item => item.id !== productId)
          
          if (itemToRemove) {
            toast(`${itemToRemove.name} removed`, {
              icon: '🗑️',
              id: 'cart-remove',
            })
          }

          return { items: newItems }
        })
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const itemToUpdate = state.items.find(item => item.id === productId)
          
          if (itemToUpdate && quantity > (itemToUpdate.stock || 0)) {
            toast.error(`Maximum stock reached (${itemToUpdate.stock}).`, {
              id: 'stock-limit',
            })
            return state 
          }

          const newItems = state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ).filter(item => item.quantity > 0)
          
          return { items: newItems }
        })
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getItemCount: () => {
        const state = get()
        return state.items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage', // 🚀 4. This is the key used in localStorage
    }
  )
)

export default useCartStore