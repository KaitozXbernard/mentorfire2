'use client';
import { SignupForm } from '@/components/auth/SignupForm';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { isLoggedIn, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'mentor') {
        router.replace('/dashboard/mentor');
      } else if (userRole === 'mentee') {
        router.replace('/dashboard/mentee');
      } else {
        router.replace('/');
      }
    }
  }, [isLoggedIn, userRole, router]);

   if (isLoggedIn) {
     return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}
