'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, getGoogleProvider } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

type UserRole = 'mentor' | 'mentee' | null;

interface AuthState {
  isLoggedIn: boolean;
  userRole: 'mentor' | 'mentee' | null;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (role: 'mentor' | 'mentee') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
        setUserEmail(user.email);

        let userDoc = await getDoc(doc(db, "profiles", user.uid));
        if (!userDoc.exists()) {
          userDoc = await getDoc(doc(db, "signupRequests", user.uid));
        }
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserRole(data.role as UserRole);
          setUserName(data.fullName || data.name || "");
        } else {
          setUserRole(null);
          setUserName(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserId(null);
        setUserName(null);
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    setIsLoggedIn(true);
    setUserId(user.uid);
    setUserEmail(user.email);

    let userDoc = await getDoc(doc(db, "profiles", user.uid));
    if (!userDoc.exists()) {
      userDoc = await getDoc(doc(db, "signupRequests", user.uid));
    }
    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserRole(data.role as UserRole);
      setUserName(data.fullName || data.name || "");
      if (data.role === 'mentor') {
        router.push('/dashboard/mentor');
      } else if (data.role === 'mentee') {
        router.push('/dashboard/mentee');
      } else {
        router.push('/');
      }
    } else {
      setUserRole(null);
      setUserName(null);
      router.push('/');
    }
  };

  // SOCIAL LOGIN
  const loginWithGoogle = async (role: 'mentor' | 'mentee') => {
    if (!role) throw new Error("Role is required for Google login.");

    const result = await signInWithPopup(auth, getGoogleProvider());
    const user = result.user;

    setIsLoggedIn(true);
    setUserId(user.uid);
    setUserEmail(user.email);

    let userDoc = await getDoc(doc(db, "profiles", user.uid));
    if (!userDoc.exists()) {
      userDoc = await getDoc(doc(db, "signupRequests", user.uid));
    }

    if (!userDoc.exists()) {
      await setDoc(doc(db, "signupRequests", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || "",
        role: role,
        createdAt: serverTimestamp(),
        status: "pending"
      });
      setUserRole(role);
      setUserName(user.displayName || "");
      router.push('/dashboard/' + role);
      return;
    }

    const data = userDoc.data();
    setUserRole(data.role as UserRole);
    setUserName(data.fullName || data.name || "");
    if (data.role === 'mentor') {
      router.push('/dashboard/mentor');
    } else if (data.role === 'mentee') {
      router.push('/dashboard/mentee');
    } else {
      router.push('/');
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, userId, userName, userEmail, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};