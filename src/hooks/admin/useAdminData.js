import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

export function useAdminData() {
  return useQuery({
    queryKey: ['admin-data'],
    queryFn: async () => {
      // 🚀 Added subscribersSnap to the parallel fetch
      const [productsSnap, categoriesSnap, ordersSnap, subscribersSnap] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'categories')),
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'subscribers')) 
      ]);

      return {
        products: productsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        categories: categoriesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        orders: ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        // 🚀 Map and sort subscribers by newest automatically
        subscribers: subscribersSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt))
      };
    }
  });
}