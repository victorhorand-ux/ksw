// src/hooks/queries/useCategories.js
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebaseFirestore'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'))
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.warn('Categories query failed, returning empty list.', error)
        return []
      }
    }
  })
}