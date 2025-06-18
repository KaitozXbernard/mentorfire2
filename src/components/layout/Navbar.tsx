'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Home, LogIn, LogOut, User, Users, LayoutDashboard, Search, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, userRole, userName, logout } = useAuth();

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-primary font-headline">MentorPath</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className={`transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-foreground/60'}`}>
            Home
          </Link>
          <Link href="/mentors" className={`transition-colors hover:text-primary ${pathname === '/mentors' ? 'text-primary' : 'text-foreground/60'}`}>
            Find a Mentor
          </Link>
          {isLoggedIn && userRole === 'mentee' && (
            <Link href="/dashboard/mentee" className={`transition-colors hover:text-primary ${pathname === '/dashboard/mentee' ? 'text-primary' : 'text-foreground/60'}`}>
              Mentee Dashboard
            </Link>
          )}
          {isLoggedIn && userRole === 'mentor' && (
            <Link href="/dashboard/mentor" className={`transition-colors hover:text-primary ${pathname === '/dashboard/mentor' ? 'text-primary' : 'text-foreground/60'}`}>
              Mentor Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(userName)}`} alt={userName || "User"} data-ai-hint="user avatar" />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userRole === 'mentor' ? 'Mentor Account' : 'Mentee Account'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={userRole === 'mentor' ? "/dashboard/mentor" : "/dashboard/mentee"} className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center">
                     <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-5 w-5" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  <User className="mr-2 h-5 w-5" /> Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
