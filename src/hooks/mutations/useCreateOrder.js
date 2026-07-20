// src/hooks/mutations/useCreateOrder.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseFirestore'

export function useCreateOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (orderData) => {
      const newOrder = {
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      const docRef = await addDoc(collection(db, "orders"), newOrder)
      return docRef.id
    },
    onSuccess: (_, variables) => {
      // 🚀 MAGIC: Automatically refresh the Admin Dashboard AND the User's Profile
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      if (variables.userId) {
        queryClient.invalidateQueries({ queryKey: ['orders', variables.userId] })
      }
    }
  })
}