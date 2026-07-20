// src/hooks/mutations/useUpdateOrderStatus.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseFirestore'

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ orderId, newStatus }) => {
      const orderRef = doc(db, "orders", orderId)
      await updateDoc(orderRef, { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      })
      return { orderId, newStatus }
    },
    onSuccess: () => {
      // 🚀 Instantly refresh the Admin Dashboard so the new status shows up
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
    }
  })
}