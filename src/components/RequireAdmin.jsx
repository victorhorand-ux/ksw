import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { db } from '../config/firebaseFirestore';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // 🚀 Import Firestore methods

export default function RequireAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // 1. Target the specific user's document in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          // 2. Check if the document exists AND if their role is 'admin'
          // (Adjust '.role === 'admin'' if you use a different field like '.isAdmin === true')
          if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error verifying admin status:", error);
          setIsAdmin(false); // Default to false on error to stay secure
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false); // Stop the loading spinner once the check is done
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <p className="font-black text-slate-400 uppercase tracking-widest animate-pulse">
          Verifying Database Records...
        </p>
      </div>
    );
  }

  // If they are not an admin, boot them to the homepage safely
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the Firestore check passes, let them into the dashboard!
  return children;
}