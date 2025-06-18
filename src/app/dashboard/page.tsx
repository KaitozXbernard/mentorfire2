'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { isLoggedIn, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }

    if (userRole === 'mentor') {
      router.replace('/dashboard/mentor');
    } else if (userRole === 'mentee') {
      router.replace('/dashboard/mentee');
    } else {
      // Fallback if role is not set, though AuthContext should handle this
      router.replace('/'); 
    }
  }, [isLoggedIn, userRole, router]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-lg text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
}
