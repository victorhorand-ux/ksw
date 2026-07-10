import { useQuery } from '@tanstack/react-query'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (!slug) return null
      const q = query(collection(db, 'products'), where('slug', '==', slug))
      const snapshot = await getDocs(q)
      if (snapshot.empty) throw new Error("Product not found")
      
      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    },
    enabled: !!slug,
  })
}