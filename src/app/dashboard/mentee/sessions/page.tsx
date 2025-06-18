// src/app/dashboard/mentee/sessions/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, History, Video, MessageSquare, FileText } from 'lucide-react';
import Link from 'next/link';

interface Session {
  id: string;
  mentorName: string;
  mentorAvatar: string;
  dateTime: string;
  topic: string;
  status: 'upcoming' | 'past' | 'cancelled';
  meetingLink?: string;
  notesLink?: string;
}

const mockAllSessions: Session[] = [
  { id: 'sess1', mentorName: 'Dr. Alice Morgan', mentorAvatar: 'https://placehold.co/40x40.png?text=AM', dateTime: '2023-10-26 14:00 UTC', topic: 'Cloud Architecture Review', status: 'upcoming', meetingLink: '#' },
  { id: 'sess2', mentorName: 'Johnathan Lee', mentorAvatar: 'https://placehold.co/40x40.png?text=JL', dateTime: '2023-10-28 10:00 UTC', topic: 'UX Portfolio Feedback', status: 'upcoming' },
  { id: 'sess3', mentorName: 'Sarah Chen', mentorAvatar: 'https://placehold.co/40x40.png?text=SC', dateTime: '2023-09-15 11:00 UTC', topic: 'Marketing Strategy Kickoff', status: 'past', notesLink: '#' },
  { id: 'sess4', mentorName: 'Dr. Alice Morgan', mentorAvatar: 'https://placehold.co/40x40.png?text=AM', dateTime: '2023-08-20 16:00 UTC', topic: 'AI Ethics Discussion', status: 'past', notesLink: '#' },
  { id: 'sess5', mentorName: 'Johnathan Lee', mentorAvatar: 'https://placehold.co/40x40.png?text=JL', dateTime: '2023-07-10 09:00 UTC', topic: 'Mobile App Design Patterns', status: 'cancelled' },
];

const SessionListItem = ({ session }: { session: Session }) => (
  <Card className="p-4 hover:shadow-md transition-shadow">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-grow">
        <Avatar className="h-12 w-12">
          <AvatarImage src={session.mentorAvatar} alt={session.mentorName} data-ai-hint="avatar profile" />
          <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-lg">{session.mentorName}</p>
          <p className="text-sm text-muted-foreground">Topic: {session.topic}</p>
          <p className="text-sm font-medium text-primary">{session.dateTime}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 self-start sm:self-auto mt-2 sm:mt-0 shrink-0">
        {session.status === 'upcoming' && session.meetingLink && (
          <Button size="sm" asChild><Link href={session.meetingLink}><Video className="mr-1 h-4 w-4"/>Join Call</Link></Button>
        )}
        {session.status === 'upcoming' && (
          <Button size="sm" variant="outline">Reschedule</Button>
        )}
        {session.status === 'past' && session.notesLink && (
           <Button size="sm" variant="outline" asChild><Link href={session.notesLink}><FileText className="mr-1 h-4 w-4"/>View Notes</Link></Button>
        )}
        {session.status === 'past' && (
          <Button size="sm" variant="secondary" asChild><Link href={`/mentors/${session.id}/review`}><MessageSquare className="mr-1 h-4 w-4"/>Leave Review</Link></Button>
        )}
         {session.status === 'cancelled' && (
          <span className="text-xs px-2 py-1 bg-destructive/20 text-destructive-foreground rounded-md">Cancelled</span>
        )}
      </div>
    </div>
  </Card>
);


export default function MenteeAllSessionsPage() {
  const upcomingSessions = mockAllSessions.filter(s => s.status === 'upcoming');
  const pastSessions = mockAllSessions.filter(s => s.status === 'past');
  const cancelledSessions = mockAllSessions.filter(s => s.status === 'cancelled');

  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <CalendarDays className="mr-3 h-7 w-7 text-primary" />
            My Sessions
          </CardTitle>
          <CardDescription>
            View and manage all your mentoring sessions.
          </CardDescription>
        </CardHeader>
      </Card>

       <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming ({upcomingSessions.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastSessions.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledSessions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card className="shadow-md rounded-xl">
            <CardHeader><CardTitle>Upcoming Sessions</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.length > 0 ? upcomingSessions.map(s => <SessionListItem key={s.id} session={s}/>) 
              : <p className="text-muted-foreground">No upcoming sessions. <Button variant="link" asChild className="p-0 h-auto"><Link href="/mentors">Find a mentor</Link></Button> to book one!</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card className="shadow-md rounded-xl">
            <CardHeader><CardTitle>Past Sessions</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {pastSessions.length > 0 ? pastSessions.map(s => <SessionListItem key={s.id} session={s}/>) 
              : <p className="text-muted-foreground">No past sessions recorded yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cancelled">
          <Card className="shadow-md rounded-xl">
            <CardHeader><CardTitle>Cancelled Sessions</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {cancelledSessions.length > 0 ? cancelledSessions.map(s => <SessionListItem key={s.id} session={s}/>) 
              : <p className="text-muted-foreground">No cancelled sessions.</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
