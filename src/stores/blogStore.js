import { create } from 'zustand'
import { db } from '../config/firebaseFirestore'
import { collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore'

const useBlogStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    // 🚀 Performance boost: Don't re-fetch if we already have the posts in memory!
    if (get().posts.length > 0) return;

    set({ isLoading: true, error: null })
    try {
      const q = query(
        collection(db, "posts"), 
        where("status", "==", "published"),
        orderBy("publishedAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      set({ posts: postsData, isLoading: false })
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      set({ error: error.message, isLoading: false })
    }
  },

  // 🚀 NEW: Robust fetcher for deep links and SEO
  fetchPostBySlug: async (slug) => {
    // 1. Instant Cache Check: If it's already in Zustand, return it instantly
    const existingPost = get().posts.find(post => post.slug === slug);
    if (existingPost) return existingPost;

    // 2. Fallback: If a user navigates directly to the URL from Google, fetch just this post
    try {
      const q = query(
        collection(db, "posts"),
        where("slug", "==", slug),
        where("status", "==", "published"), // Security: ensure unpublished drafts aren't accessed
        limit(1) // Optimization: We only need one post
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      
      return null; // Post actually does not exist
    } catch (error) {
      console.error("Error fetching single post:", error);
      return null;
    }
  }
}))

export default useBlogStore