'use client';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileTagGenerator } from '@/components/dashboard/mentor/ProfileTagGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle, Edit3, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

import { db, storage } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  title: z.string().optional(),
  bio: z.string().optional(),
  currentExpertise: z.string().optional(),
  photoURL: z.string().optional(), // for the image URL
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { userRole, userName, userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      title: '',
      bio: '',
      currentExpertise: '',
      photoURL: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as ProfileFormValues;
          reset(data);
          setPhotoURL(data.photoURL || null);
        } else {
          const defaults = {
            fullName: userName || (userRole === 'mentor' ? 'Dr. Mentor Profile' : 'Mentee Profile'),
            email: userId ? `${userId.split('-')[0]}@example.com` : 'user@example.com',
            title: userRole === 'mentor' ? 'Lead Software Engineer' : '',
            bio: userRole === 'mentor'
              ? 'Experienced professional passionate about guiding others. Specializing in modern web technologies and agile practices.'
              : 'Eager to learn and grow with the guidance of an experienced mentor. Interested in software development and UX design.',
            currentExpertise: userRole === 'mentor' ? 'React, TypeScript, Node.js, Agile Coaching' : '',
            photoURL: '',
          };
          reset(defaults);
          setPhotoURL(null);
        }
      } catch (error) {
        toast({
          title: 'Error loading profile',
          description: 'There was a problem loading your profile data.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId, userRole, userName, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (!userId) throw new Error('User not authenticated');
      await setDoc(doc(db, 'users', userId), data, { merge: true });
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      });
      // eslint-disable-next-line no-console
      console.error("Firestore save error:", error);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setUploading(true);
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `users/${userId}/profile.jpg`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPhotoURL(url);
      setValue('photoURL', url); // update the photoURL field in the form
      await setDoc(doc(db, 'users', userId), { photoURL: url }, { merge: true });
      toast({
        title: "Photo Uploaded",
        description: "Your profile photo has been updated.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your photo.",
        variant: "destructive",
      });
      console.error("Photo upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  };

  const avatarName = control._formValues?.fullName || userName || 'U';
  const avatarUrl = photoURL || `https://placehold.co/150x150.png?text=${avatarName.charAt(0)}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="text-muted-foreground">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <UserCircle className="mr-3 h-7 w-7 text-primary" />
            Edit Your Profile
          </CardTitle>
          <CardDescription>
            Keep your information up to date. Your profile is how others see you on MentorPath.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt={avatarName} data-ai-hint="profile avatar"/>
                <AvatarFallback>{getInitials(avatarName)}</AvatarFallback>
              </Avatar>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
                disabled={uploading}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Edit3 className="mr-2 h-4 w-4" /> {uploading ? 'Uploading...' : 'Change Photo'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => <Input id="fullName" {...field} placeholder="Your full name" />}
                />
                {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                 <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input id="email" type="email" {...field} placeholder="your.email@example.com" />}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
            </div>
            {userRole === 'mentor' && (
              <div>
                <Label htmlFor="title">Professional Title</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <Input id="title" {...field} placeholder="e.g., Senior Software Engineer, UX Lead" />}
                />
              </div>
            )}
            <div>
              <Label htmlFor="bio">Bio / About Me</Label>
               <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => <Textarea id="bio" {...field} placeholder="Tell us a bit about yourself..." rows={5} />}
                />
            </div>
            {userRole === 'mentor' && (
              <div>
                <Label htmlFor="currentExpertise">Your Current Expertise (comma-separated)</Label>
                 <Controller
                  name="currentExpertise"
                  control={control}
                  render={({ field }) => <Textarea id="currentExpertise" {...field} placeholder="e.g., React, Project Management, Public Speaking" rows={3} />}
                />
                <p className="text-xs text-muted-foreground mt-1">This field helps the AI suggest more tags below. It will be saved as part of your profile.</p>
              </div>
            )}
             <div className="flex justify-end pt-4 border-t">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                </Button>
            </div>
          </CardContent>
        </form>
      </Card>
      {userRole === 'mentor' && (
        <ProfileTagGenerator />
      )}
    </div>
  );
}