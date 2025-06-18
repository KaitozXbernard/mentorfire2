'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Mail, KeyRound, AlertCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['mentee', 'mentor'], { required_error: 'You must select a role.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'mentee',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: "Login Successful",
        description: `Welcome back!`,
      });
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message || 'Invalid credentials',
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async (role: 'mentee' | 'mentor') => {
    setIsLoading(true);
    try {
      await loginWithGoogle(role);
      toast({
        title: "Login Successful",
        description: `Welcome! You are logged in as a ${role} via Google.`,
      });
    } catch (err: any) {
      toast({
        title: "Google Login failed",
        description: err.message || "Something went wrong.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
        <CardDescription>Log in to continue your MentorPath journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="your.email@example.com" {...form.register('email')} className="pl-10" />
            </div>
            {form.formState.errors.email && <p className="text-sm text-destructive flex items-center"><AlertCircle className="h-4 w-4 mr-1"/>{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" {...form.register('password')} className="pl-10" />
            </div>
            {form.formState.errors.password && <p className="text-sm text-destructive flex items-center"><AlertCircle className="h-4 w-4 mr-1"/>{form.formState.errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Log in as:</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="mentee"
                  checked={form.watch('role') === 'mentee'}
                  onChange={() => form.setValue('role', 'mentee')}
                  className="form-radio"
                  id="role-mentee-login"
                />
                <span className="font-normal">Mentee</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="mentor"
                  checked={form.watch('role') === 'mentor'}
                  onChange={() => form.setValue('role', 'mentor')}
                  className="form-radio"
                  id="role-mentor-login"
                />
                <span className="font-normal">Mentor</span>
              </label>
            </div>
            {form.formState.errors.role && <p className="text-sm text-destructive flex items-center"><AlertCircle className="h-4 w-4 mr-1"/>{form.formState.errors.role.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : <><LogIn className="mr-2 h-5 w-5" /> Log In</>}
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={() => handleGoogleLogin(form.getValues('role'))} disabled={isLoading}>
          {isLoading ? 'Processing...' : (
            <>
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.08-2.58 2.26-4.8 2.26-5.72 0-10.4-4.7-10.4-10.4S6.76 0 12.48 0c3.36 0 5.36 1.32 6.56 2.48L16.48 5.48c-.96-.96-2.16-1.84-4-1.84-4.56 0-8.28 3.72-8.28 8.28s3.72 8.28 8.28 8.28c2.96 0 4.92-1.24 5.88-2.16.8-.88 1.32-2.24 1.48-4.04h-7.36z"
                />
              </svg>
              Google
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}