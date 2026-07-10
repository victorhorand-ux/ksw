// src/hooks/queries/useAllOrders.js
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'

export function useAllOrders() {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      // Firebase can do the sorting for us directly in the query!
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
  })
}