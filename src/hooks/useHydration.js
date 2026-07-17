import { useState, useEffect } from 'react';

export default function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This only runs AFTER React has successfully mounted on the client.
    // It tells the app: "Okay, we are safely in the browser now."
    setIsHydrated(true);
  }, []);

  return isHydrated;
}