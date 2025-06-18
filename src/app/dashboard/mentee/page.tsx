import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, History, Users, MessageSquare, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Mock data types
interface UpcomingSession {
  id: string;
  mentorName: string;
  mentorAvatar: string;
  dateTime: string;
  topic: string;
  meetingLink?: string;
}

interface PastMentor {
  id: string;
  name: string;
  avatar: string;
  lastSessionDate: string;
  expertise: string[];
}

const mockUpcomingSessions: UpcomingSession[] = [
  {
    id: 'sess1',
    mentorName: 'Dr. Alice Morgan',
    mentorAvatar: 'https://placehold.co/40x40.png?text=AM',
    dateTime: '2023-10-26 14:00 UTC',
    topic: 'Cloud Architecture Review',
    meetingLink: '#',
  },
  {
    id: 'sess2',
    mentorName: 'Johnathan Lee',
    mentorAvatar: 'https://placehold.co/40x40.png?text=JL',
    dateTime: '2023-10-28 10:00 UTC',
    topic: 'UX Portfolio Feedback',
  },
];

const mockPastMentors: PastMentor[] = [
  {
    id: 'mentor3',
    name: 'Sarah Chen',
    avatar: 'https://placehold.co/40x40.png?text=SC',
    lastSessionDate: '2023-09-15',
    expertise: ['Marketing', 'SEO'],
  },
];

export default function MenteeDashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <CalendarDays className="mr-3 h-6 w-6 text-primary" />
            Upcoming Sessions
          </CardTitle>
          <CardDescription>
            Manage your scheduled sessions and prepare for your next meeting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockUpcomingSessions.length > 0 ? (
            <ul className="space-y-4">
              {mockUpcomingSessions.map((session) => (
                <li key={session.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-grow">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.mentorAvatar} alt={session.mentorName} data-ai-hint="avatar profile" />
                      <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{session.mentorName}</p>
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
                    <Button variant="outline" size="sm">Reschedule</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">You have no upcoming sessions. <Button variant="link" asChild className="p-0 h-auto"><Link href="/mentors">Find a mentor</Link></Button> to book one!</p>
          )}
        </CardContent>
        <CardFooter>
            <Button variant="outline" asChild>
                <Link href="/dashboard/mentee/sessions">View All Sessions <ExternalLink className="ml-2 h-4 w-4"/></Link>
            </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <History className="mr-3 h-6 w-6 text-primary" />
            Past Mentors
          </CardTitle>
          <CardDescription>
            Reconnect with mentors you&apos;ve worked with previously.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockPastMentors.length > 0 ? (
            <ul className="space-y-4">
              {mockPastMentors.map((mentor) => (
                <li key={mentor.id} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-grow">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} data-ai-hint="avatar profile" />
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">Expertise: {mentor.expertise.join(', ')}</p>
                      <p className="text-xs text-muted-foreground">Last session: {mentor.lastSessionDate}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 self-start sm:self-center mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                    </Button>
                    <Button variant="default" size="sm" asChild>
                      <Link href={`/dashboard/mentee/schedule/${mentor.id}`}>Book Again</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No past mentor interactions yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
             <Users className="mr-3 h-6 w-6 text-primary" />
            Find New Mentors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Explore our community of experts and find the perfect mentor to guide you.
          </p>
          <Button asChild>
            <Link href="/mentors">
              Browse All Mentors <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
