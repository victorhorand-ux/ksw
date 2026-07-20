import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseFirestore';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }
  });
}