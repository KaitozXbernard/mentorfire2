import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarCheck, Bell, Users, CheckCircle, XCircle, ExternalLink, Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Mock data types
interface SessionRequest {
  id: string;
  menteeName: string;
  menteeAvatar: string;
  requestedDateTime: string;
  topic: string;
}

interface UpcomingMentorSession {
  id: string;
  menteeName: string;
  menteeAvatar: string;
  dateTime: string;
  topic: string;
  meetingLink?: string;
}

const mockSessionRequests: SessionRequest[] = [
  {
    id: 'req1',
    menteeName: 'Eager Mentee',
    menteeAvatar: 'https://placehold.co/40x40.png?text=EM',
    requestedDateTime: '2023-10-27 10:00 UTC',
    topic: 'Career Advice for Web Dev',
  },
  {
    id: 'req2',
    menteeName: 'Curious Coder',
    menteeAvatar: 'https://placehold.co/40x40.png?text=CC',
    requestedDateTime: '2023-10-29 16:00 UTC',
    topic: 'React Best Practices',
  },
];

const mockUpcomingMentorSessions: UpcomingMentorSession[] = [
  {
    id: 'msess1',
    menteeName: 'Proactive Learner',
    menteeAvatar: 'https://placehold.co/40x40.png?text=PL',
    dateTime: '2023-10-25 09:00 UTC',
    topic: 'System Design Interview Prep',
    meetingLink: '#',
  },
];

export default function MentorDashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Bell className="mr-3 h-6 w-6 text-primary" />
            Pending Session Requests
          </CardTitle>
          <CardDescription>
            Review and respond to new session requests from potential mentees.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockSessionRequests.length > 0 ? (
            <ul className="space-y-4">
              {mockSessionRequests.map((request) => (
                <li key={request.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-grow">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.menteeAvatar} alt={request.menteeName} data-ai-hint="avatar profile" />
                      <AvatarFallback>{request.menteeName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{request.menteeName}</p>
                      <p className="text-sm text-muted-foreground">{request.topic}</p>
                      <p className="text-xs text-muted-foreground">Requested: {request.requestedDateTime}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 self-start sm:self-center mt-2 sm:mt-0">
                    <Button variant="default" size="sm"><CheckCircle className="mr-1 h-4 w-4"/> Approve</Button>
                    <Button variant="destructive" size="sm"><XCircle className="mr-1 h-4 w-4"/> Decline</Button>
                    <Button variant="outline" size="sm"><MessageSquare className="mr-1 h-4 w-4"/> Message</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No pending session requests at the moment.</p>
          )}
        </CardContent>
        <CardFooter>
            <Button variant="outline" asChild>
                <Link href="/dashboard/mentor/sessions">Manage All Requests <ExternalLink className="ml-2 h-4 w-4"/></Link>
            </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <CalendarCheck className="mr-3 h-6 w-6 text-primary" />
            Your Upcoming Sessions
          </CardTitle>
          <CardDescription>
            Prepare for your confirmed mentoring sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockUpcomingMentorSessions.length > 0 ? (
            <ul className="space-y-4">
              {mockUpcomingMentorSessions.map((session) => (
                <li key={session.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-grow">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.menteeAvatar} alt={session.menteeName} data-ai-hint="avatar profile" />
                      <AvatarFallback>{session.menteeName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{session.menteeName}</p>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                      <p className="text-xs text-muted-foreground">{session.dateTime}</p>
                    </div>
                  </div>
                   <div className="flex space-x-2 self-start sm:self-center mt-2 sm:mt-0">
                    {session.meetingLink && (
                      <Button variant="default" size="sm" asChild>
                        <Link href={session.meetingLink}>Join Meeting</Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">You have no upcoming confirmed sessions.</p>
          )}
        </CardContent>
         <CardFooter>
            <Button variant="outline" asChild>
                <Link href="/dashboard/mentor/sessions">View Full Schedule <ExternalLink className="ml-2 h-4 w-4"/></Link>
            </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Users className="mr-3 h-6 w-6 text-primary" />
            Manage Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Keep your profile updated to attract more mentees. Add your expertise, bio, and availability.
          </p>
          <Button asChild>
            <Link href="/dashboard/profile">
              Edit Your Profile <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
