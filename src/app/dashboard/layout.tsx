'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutDashboard, User, CalendarDays, MessageSquare, DollarSign, Settings, BookOpen, ShieldCheck, Users } from 'lucide-react';
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn, userRole, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background">
        <p>Loading...</p> {/* Or a spinner component */}
      </div>
    );
  }

  const menteeLinks = [
    { href: '/dashboard/mentee', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/mentee/sessions', label: 'My Sessions', icon: CalendarDays },
    { href: '/mentors', label: 'Find Mentors', icon: Users },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const mentorLinks = [
    { href: '/dashboard/mentor', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/mentor/sessions', label: 'Session Management', icon: CalendarDays },
    { href: '/dashboard/mentor/availability', label: 'My Availability', icon: Settings },
    { href: '/dashboard/profile', label: 'Profile & Tags', icon: User },
    // { href: '/dashboard/mentor/earnings', label: 'Earnings', icon: DollarSign },
  ];

  const navLinks = userRole === 'mentor' ? mentorLinks : menteeLinks;

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Navbar />
      <div className="flex-grow container mx-auto px-2 sm:px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 lg:w-1/5">
            <Card className="shadow-md rounded-xl p-0 md:p-2 lg:p-4">
              <CardContent className="p-2 md:p-4">
                <nav className="space-y-1.5">
                  {navLinks.map(link => (
                    <Button
                      key={link.href}
                      variant={pathname === link.href ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      asChild
                    >
                      <Link href={link.href}>
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>
          <main className="md:w-3/4 lg:w-4/5">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
