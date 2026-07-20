import { create } from 'zustand'
import { auth } from '../config/firebase' 
import { db } from '../config/firebaseFirestore' 
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const useAuthStore = create((set, get) => ({
  user: null,
  isAdmin: false,
  isLoading: true, 
  error: null,
  unsubscribeAuth: null, // 🚀 Keep track of the listener to prevent duplicates

  // 1. AUTO-LOGIN LISTENER (Single Source of Truth)
  initializeAuth: () => {
    const existingUnsubscribe = get().unsubscribeAuth;
    if (typeof existingUnsubscribe === 'function') {
      existingUnsubscribe();
      set({ unsubscribeAuth: null });
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      set({ isLoading: true, error: null });
      
      if (currentUser) {
        try {
          // Fetch user profile from Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          let profileData = {};
          if (userDocSnap.exists()) {
            profileData = userDocSnap.data();
          }

          const mergedUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            ...profileData
          };
          
          // Role validation is database-driven
          const isAdmin = mergedUser.role === 'admin';
          
          set({ user: mergedUser, isAdmin, isLoading: false });
        } catch (err) {
          console.error("Error fetching user profile from Firestore:", err);
          // Safe fallback: Logged in, but without custom profile data
          set({ 
            user: { uid: currentUser.uid, email: currentUser.email }, 
            isAdmin: false, 
            isLoading: false 
          });
        }
      } else {
        set({ user: null, isAdmin: false, isLoading: false });
      }
    });

    set({ unsubscribeAuth: unsubscribe });
    return unsubscribe; 
  },

  // 2. SIGN IN FUNCTION (Clean & Lightweight)
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      let profileData = {};
      if (userDocSnap.exists()) {
        profileData = userDocSnap.data();
      }

      const mergedUser = {
        uid: currentUser.uid,
        email: currentUser.email,
        ...profileData
      };

      set({
        user: mergedUser,
        isAdmin: mergedUser.role === 'admin',
        isLoading: false,
        error: null
      });

      return true; 
    } catch (err) {
      console.error("Sign in error:", err);
      let errorMessage = "Failed to login.";
      if (err.code === 'auth/invalid-credential') errorMessage = "Wrong email or password.";
      if (err.code === 'auth/too-many-requests') errorMessage = "Too many failed attempts. Try later.";
      
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage); 
    }
  },

  // 3. REGISTER FUNCTION (Keeps explicit customer payload assignment)
  signUp: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const currentUser = userCredential.user;

      const newUserProfile = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        createdAt: new Date().toISOString(),
        role: 'customer' // Secure: Hardcoded to prevent role spoofing
      };

      // Create the document in Firestore
      await setDoc(doc(db, "users", currentUser.uid), newUserProfile);

      set({
        user: {
          uid: currentUser.uid,
          email: currentUser.email,
          ...newUserProfile
        },
        isAdmin: false,
        isLoading: false,
        error: null
      });
      
      return true;
    } catch (err) {
      console.error("Registration error:", err);
      let errorMessage = "Failed to register.";
      if (err.code === 'auth/email-already-in-use') errorMessage = "This email is already registered.";
      if (err.code === 'auth/weak-password') errorMessage = "Password should be at least 6 characters.";

      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  // 4. LOGOUT FUNCTION
  signOut: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAdmin: false, isLoading: false, error: null });
    } catch (err) {
      console.error("Logout error:", err);
    }
  },

  // 5. FORGOT PASSWORD FUNCTION
  resetPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await sendPasswordResetEmail(auth, email);
      set({ isLoading: false });
      return true;
    } catch (err) {
      console.error("Password reset error:", err);
      let errorMessage = "Failed to send reset email.";
      if (err.code === 'auth/user-not-found') errorMessage = "No account found with this email.";
      if (err.code === 'auth/invalid-email') errorMessage = "Please enter a valid email address.";
      
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  }
}))

export default useAuthStore;