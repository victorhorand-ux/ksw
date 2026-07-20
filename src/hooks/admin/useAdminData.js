import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseFirestore';

export function useAdminData() {
  return useQuery({
    queryKey: ['admin-data'],
    queryFn: async () => {
      // 🚀 Added posts collection to the Promise.all array
      const [productsSnap, categoriesSnap, ordersSnap, subscribersSnap, postsSnap] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'categories')),
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'subscribers')),
        getDocs(collection(db, 'posts')) 
      ]);

      return {
        products: productsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        categories: categoriesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        orders: ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        subscribers: subscribersSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt)),
        // 🚀 Map and sort posts by newest
        posts: postsSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      };
    }
  });
}