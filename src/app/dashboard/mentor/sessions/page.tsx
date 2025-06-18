import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarClock, CheckCircle, XCircle, MessageSquare, Users, Video, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Mock data types
interface SessionRequest {
  id: string;
  menteeName: string;
  menteeAvatar: string;
  requestedDateTime: string;
  topic: string;
  message?: string;
}

interface ConfirmedSession {
  id: string;
  menteeName: string;
  menteeAvatar: string;
  dateTime: string;
  topic: string;
  meetingLink: string;
}

interface PastSession {
  id: string;
  menteeName: string;
  menteeAvatar: string;
  dateTime: string;
  topic: string;
  feedbackGiven: boolean;
}

const mockSessionRequests: SessionRequest[] = [
  { id: 'req1', menteeName: 'Alex Johnson', menteeAvatar: 'https://placehold.co/40x40.png?text=AJ', requestedDateTime: '2023-11-05 10:00 UTC', topic: 'React Query Best Practices', message: 'Hoping to get some guidance on structuring my data fetching layer.' },
  { id: 'req2', menteeName: 'Maria Garcia', menteeAvatar: 'https://placehold.co/40x40.png?text=MG', requestedDateTime: '2023-11-07 14:30 UTC', topic: 'UX Career Path Advice' },
];

const mockConfirmedSessions: ConfirmedSession[] = [
  { id: 'conf1', menteeName: 'Sam Lee', menteeAvatar: 'https://placehold.co/40x40.png?text=SL', dateTime: '2023-11-02 11:00 UTC', topic: 'Code Review: Python Project', meetingLink: '#' },
];

const mockPastSessions: PastSession[] = [
  { id: 'past1', menteeName: 'Chen Wei', menteeAvatar: 'https://placehold.co/40x40.png?text=CW', dateTime: '2023-10-15 09:00 UTC', topic: 'Initial Consultation', feedbackGiven: true },
  { id: 'past2', menteeName: 'Jessica Miller', menteeAvatar: 'https://placehold.co/40x40.png?text=JM', dateTime: '2023-10-01 16:00 UTC', topic: 'Portfolio Review', feedbackGiven: false },
];


export default function MentorSessionsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <CalendarClock className="mr-3 h-7 w-7 text-primary" />
            Session Management
          </CardTitle>
          <CardDescription>
            Oversee your session requests, upcoming appointments, and past interactions.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="requests">Requests ({mockSessionRequests.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({mockConfirmedSessions.length})</TabsTrigger>
          <TabsTrigger value="past">Past Sessions ({mockPastSessions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Review and respond to new session inquiries.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSessionRequests.length > 0 ? mockSessionRequests.map(req => (
                <Card key={req.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={req.menteeAvatar} alt={req.menteeName} data-ai-hint="avatar profile" />
                        <AvatarFallback>{req.menteeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{req.menteeName}</p>
                        <p className="text-sm text-muted-foreground">Topic: {req.topic}</p>
                        <p className="text-xs text-muted-foreground">Requested: {req.requestedDateTime}</p>
                      </div>
                    </div>
                     <div className="flex space-x-2 self-start sm:self-auto mt-2 sm:mt-0 shrink-0">
                        <Button size="sm" variant="default"><CheckCircle className="mr-1 h-4 w-4"/>Accept</Button>
                        <Button size="sm" variant="destructive"><XCircle className="mr-1 h-4 w-4"/>Decline</Button>
                      </div>
                  </div>
                  {req.message && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-md border">
                        <p className="text-sm text-foreground/80"><strong>Message:</strong> {req.message}</p>
                    </div>
                  )}
                   <div className="mt-3 flex justify-end">
                     <Button size="sm" variant="outline"><MessageSquare className="mr-1 h-4 w-4"/>Message Mentee</Button>
                   </div>
                </Card>
              )) : <p className="text-muted-foreground">No pending requests.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Confirmed Upcoming Sessions</CardTitle>
              <CardDescription>Prepare for your scheduled meetings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockConfirmedSessions.length > 0 ? mockConfirmedSessions.map(sess => (
                <Card key={sess.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={sess.menteeAvatar} alt={sess.menteeName} data-ai-hint="avatar profile" />
                        <AvatarFallback>{sess.menteeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{sess.menteeName}</p>
                        <p className="text-sm text-muted-foreground">Topic: {sess.topic}</p>
                        <p className="text-sm font-medium text-primary">{sess.dateTime}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 self-start sm:self-auto mt-2 sm:mt-0 shrink-0">
                      <Button size="sm" asChild><Link href={sess.meetingLink}><Video className="mr-1 h-4 w-4"/>Join Call</Link></Button>
                      <Button size="sm" variant="outline">Reschedule</Button>
                    </div>
                  </div>
                </Card>
              )) : <p className="text-muted-foreground">No upcoming sessions scheduled.</p>}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card className="shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>Review your session history and provide feedback.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPastSessions.length > 0 ? mockPastSessions.map(sess => (
                <Card key={sess.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={sess.menteeAvatar} alt={sess.menteeName} data-ai-hint="avatar profile"/>
                        <AvatarFallback>{sess.menteeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{sess.menteeName}</p>
                        <p className="text-sm text-muted-foreground">Topic: {sess.topic}</p>
                        <p className="text-xs text-muted-foreground">Completed: {sess.dateTime}</p>
                      </div>
                    </div>
                    <Button size="sm" variant={sess.feedbackGiven ? "secondary" : "outline"}>
                      {sess.feedbackGiven ? "View Feedback" : "Provide Feedback"}
                    </Button>
                  </div>
                </Card>
              )) : <p className="text-muted-foreground">No past sessions recorded yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
