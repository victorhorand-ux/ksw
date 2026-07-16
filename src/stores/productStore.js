import { create } from 'zustand'
import { db } from '../config/firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, limit, increment } from 'firebase/firestore'
import { toast } from 'react-hot-toast' // 🚀 Upgraded to Premium UI
import { products as mockProducts } from '../data/products' 

const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  // 1. FETCH PRODUCTS (With Caching)
  fetchProducts: async (forceRefresh = false) => {
    if (!forceRefresh && get().products.length > 0) return;

    set({ isLoading: true });
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }));
      set({ products: productsData, isLoading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  // 🚀 2. SECURE DEEP-LINK FETCHER
  fetchProductBySlug: async (slug) => {
    const existing = get().products.find(p => p.slug === slug);
    if (existing) return existing;

    try {
      const q = query(collection(db, "products"), where("slug", "==", slug), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error("Error fetching single product:", error);
      return null;
    }
  },

  getProductsByCategory: (category) => {
    const products = get().products;
    if (!category) return products;
    return products.filter(p => p.category === category);
  },

  searchProducts: (searchQuery) => { // Renamed parameter to avoid conflict with Firestore 'query'
    const products = get().products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      (p.nameRw && p.nameRw.toLowerCase().includes(lowerQuery)) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  },

  // 3. ADMIN ACTIONS (No more blocking alerts!)
  addProduct: async (newProduct) => {
    set({ isLoading: true });
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      const productWithId = { ...newProduct, id: docRef.id };
      
      set(state => ({ 
        products: [...state.products, productWithId],
        isLoading: false 
      }));
      toast.success('Product Saved to Cloud!');
    } catch (error) {
      console.error("Error adding:", error);
      toast.error('Failed to save product');
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, updatedData) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedData);
      
      set(state => ({
        products: state.products.map(p => (p.id === id ? { ...p, ...updatedData } : p))
      }));
      toast.success('Product Updated!');
    } catch (error) {
      console.error("Error updating:", error);
      toast.error("Failed to update");
    }
  },

  deleteProduct: async (productId) => {
    // Note: For sensitive deletes, keeping window.confirm is okay, 
    // but ideally, trigger a custom UI modal from the component instead.
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, "products", productId));
      set(state => ({
        products: state.products.filter(p => p.id !== productId)
      }));
      toast.success('Product deleted');
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete");
    }
  },

  // 📉 4. SECURE STOCK DEDUCTION (Atomic Updates)
  updateStock: async (purchasedItems) => {
    try {
      const updatePromises = purchasedItems.map(async (item) => {
        // Use the ID from either the cart item or the product reference
        const productId = item.productId || item.id;
        if (!productId) return;

        const productRef = doc(db, "products", productId);
        
        // 🚀 Tells Firebase server to do the math safely in a queue!
        await updateDoc(productRef, {
          stock: increment(-item.quantity)
        });
      });
      
      await Promise.all(updatePromises);
      await get().fetchProducts(true); // Force refresh to get new stock numbers
    } catch (error) {
      console.error("Failed to deduct inventory:", error);
    }
  },

  seedProducts: async () => {
    const currentProducts = get().products;
    if (currentProducts.length > 0) return toast.error("Database already has data!");
    if (!window.confirm("Upload mock data to Firebase?")) return;

    set({ isLoading: true });
    try {
      const uploadPromises = mockProducts.map(product => {
        const { id, ...productData } = product; 
        return addDoc(collection(db, "products"), productData);
      });
      await Promise.all(uploadPromises);
      await get().fetchProducts(true);
      toast.success("Success! Mock data uploaded.");
    } catch (error) {
      console.error("Seeding error:", error);
      toast.error("Failed to seed data");
    } finally {
      set({ isLoading: false });
    }
  }
}))

export default useProductStore