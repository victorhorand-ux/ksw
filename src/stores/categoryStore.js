import { create } from 'zustand'
import { db } from '../config/firebaseFirestore'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore'

// Default categories to seed if empty
const defaultCategories = [
  { name: 'Swimming Caps', nameRw: 'Ingofero zo koga', icon: '🧢' },
  { name: 'Goggles', nameRw: 'Amadarubindi', icon: '🥽' },
  { name: 'Swimsuits', nameRw: 'Imyenda yo koga', icon: '🩱' },
  { name: 'Training Gear', nameRw: 'Ibikoresho', icon: '🏊‍♂️' },
]

const useCategoryStore = create((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  // 1. FETCH FROM FIREBASE (Optimized)
  fetchCategories: async (forceRefresh = false) => {
    // 🚀 Performance: Don't fetch if we already have them, unless forced!
    if (!forceRefresh && get().categories.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoryData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // State perfectly mirrors the database
      set({ categories: categoryData, isLoading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  // 2. ADD CATEGORY 
  addCategory: async (newCategory) => {
    set({ isLoading: true });
    try {
      const docRef = await addDoc(collection(db, "categories"), newCategory);
      
      const categoryWithId = { ...newCategory, id: docRef.id };
      set(state => ({ 
        categories: [...state.categories, categoryWithId]
      }));
      return categoryWithId;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error; 
    } finally {
      set({ isLoading: false });
    }
  },

  // 3. UPDATE CATEGORY
  updateCategory: async (id, updatedData) => {
    try {
      const catRef = doc(db, "categories", id);
      await updateDoc(catRef, updatedData);
      
      set(state => ({
        categories: state.categories.map(c => (c.id === id ? { ...c, ...updatedData } : c))
      }));
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  // 4. DELETE CATEGORY
  deleteCategory: async (categoryId) => {
    try {
      await deleteDoc(doc(db, "categories", categoryId));
      set(state => ({
        categories: state.categories.filter(c => c.id !== categoryId)
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },

  // 🚀 NEW: SAFE SEED FUNCTION (For Admin Use Only)
  // This uses a Firestore Batch to write all defaults to the DB simultaneously.
  seedDefaultCategories: async () => {
    set({ isLoading: true });
    try {
      const batch = writeBatch(db);
      
      defaultCategories.forEach((cat) => {
        const newCatRef = doc(collection(db, "categories"));
        batch.set(newCatRef, cat);
      });

      await batch.commit();
      
      // Force a fresh fetch so the UI gets the newly generated Firebase IDs
      await get().fetchCategories(true); 
    } catch (error) {
      console.error("Error seeding categories:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}))

export default useCategoryStore