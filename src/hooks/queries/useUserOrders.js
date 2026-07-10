import { useQuery } from '@tanstack/react-query'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'

export function useUserOrders(userId) {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return []
      // Note: Make sure you have a composite index in Firebase for userId + createdAt!
      const q = query(
        collection(db, 'orders'), 
        where('userId', '==', userId), 
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    enabled: !!userId, // Only fetch if we have a valid userId
  })
}