import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { type Mentor } from '@/components/mentors/MentorCard'; // Re-using Mentor type
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, CalendarDays, Briefcase, Users, Award, FileText } from 'lucide-react';
import Link from 'next/link';

// Mock data fetching function - replace with actual data fetching
async function getMentorData(mentorId: string): Promise<Mentor | null> {
  const mockMentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Bernard M John',
      imageUrl: 'https://placehold.co/300x300.png',
      rating: 4.9,
      reviews: 120,
      bio: 'Seasoned software architect with 15+ years of experience in cloud technologies and AI. Passionate about guiding the next generation of tech leaders. I specialize in breaking down complex problems and fostering a growth mindset. My approach is collaborative and results-oriented, focusing on practical skills development and career strategy. I have successfully mentored over 50 individuals, many of whom have achieved significant career advancements.',
      expertise: ['Software Architecture', 'Cloud Computing (AWS, Azure)', 'AI/ML', 'DevOps', 'System Design', 'Microservices', 'Leadership'],
      title: 'Principal Software Architect @ TechSolutions Inc.'
    },
    {
      id: '2',
      name: 'Don Desusa',
      imageUrl: 'https://placehold.co/300x300.png',
      rating: 4.8,
      reviews: 95,
      bio: 'UX/UI design lead specializing in mobile applications and user-centered design principles. Helping mentees build intuitive and beautiful products. With a strong background in user research and interaction design, I guide mentees through the entire design process, from concept to launch. I emphasize portfolio development and interview preparation.',
      expertise: ['UX Design', 'UI Design', 'Prototyping', 'User Research', 'Mobile Apps', 'Figma', 'Adobe XD', 'Design Systems'],
      title: 'Lead UX Designer @ CreativeMinds Co.'
    },
  ];
  return mockMentors.find(m => m.id === mentorId) || null;
}

export default async function MentorProfilePage({ params }: { params: { mentorId: string } }) {
  const mentor = await getMentorData(params.mentorId);

  if (!mentor) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Mentor not found</h1>
          <Link href="/mentors" className="text-primary hover:underline">
            Back to mentors list
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/10">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Mentor Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="p-0 items-center flex flex-col pt-8 bg-gradient-to-b from-primary/10 to-transparent">
                <Image
                  src={mentor.imageUrl || `https://placehold.co/150x150.png?text=${mentor.name.split(' ').map(n=>n[0]).join('')}`}
                  alt={mentor.name}
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-background shadow-md"
                  data-ai-hint="mentor portrait"
                />
                <CardTitle className="mt-4 text-2xl font-headline">{mentor.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{mentor.title}</p>
                <div className="flex items-center my-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-md font-semibold mr-1">{mentor.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/dashboard/mentee/schedule/${mentor.id}`}>
                    <CalendarDays className="mr-2 h-5 w-5" /> Book a Session
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><Briefcase className="mr-2 h-5 w-5 text-primary" /> Expertise</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: About, Reviews, etc. */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" /> About {mentor.name}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground/80">
                <p>{mentor.bio}</p>
                {/* Placeholder for intro video */}
                <div className="mt-4 p-4 border border-dashed rounded-md text-center">
                  <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Intro video coming soon!</p>
                   <Image src="https://placehold.co/600x338.png" alt="Intro video placeholder" width={600} height={338} className="mt-2 rounded-md aspect-video object-cover" data-ai-hint="video placeholder" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><Award className="mr-2 h-5 w-5 text-primary" /> Achievements & Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-foreground/80 space-y-1">
                  <li>Successfully mentored 50+ individuals.</li>
                  <li>Speaker at Tech Conference 2023.</li>
                  <li>Published author on "Cloud Native Architectures".</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">Portfolio items or links would go here.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><Users className="mr-2 h-5 w-5 text-primary" /> Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Placeholder for reviews */}
                {[1,2].map(i => (
                  <div key={i} className="p-4 border rounded-md">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`h-4 w-4 ${idx < (i === 1 ? 5:4) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                      ))}
                      <p className="ml-2 text-sm font-semibold">Amazing Mentor!</p>
                    </div>
                    <p className="text-sm text-foreground/70">&quot;{mentor.name.split(' ')[1]} provided incredible insights that helped me land my dream job. Highly recommended!&quot; - Alex P.</p>
                  </div>
                ))}
                <Button variant="link" className="p-0 h-auto">View all reviews</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  // In a real app, fetch all mentor IDs
  const mockMentorIds = ['1', '2', '3', '4', '5', '6']; 
  return mockMentorIds.map((id) => ({
    mentorId: id,
  }));
}

