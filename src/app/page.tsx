'use client'
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { MentorCard, type Mentor } from '@/components/mentors/MentorCard';
import Link from 'next/link';
import { ArrowRight, Users, CheckCircle, BarChart } from 'lucide-react';

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Alice Morgan',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.9,
    reviews: 120,
    bio: 'Seasoned software architect with 15+ years of experience in cloud technologies and AI. Passionate about guiding the next generation of tech leaders.',
    expertise: ['Software Architecture', 'Cloud Computing (AWS, Azure)', 'AI/ML', 'DevOps'],
    title: 'Principal Software Architect'
  },
  {
    id: '2',
    name: 'Johnathan Lee',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.8,
    reviews: 95,
    bio: 'UX/UI design lead specializing in mobile applications and user-centered design principles. Helping mentees build intuitive and beautiful products.',
    expertise: ['UX Design', 'UI Design', 'Prototyping', 'User Research', 'Mobile Apps'],
    title: 'Lead UX Designer'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    imageUrl: 'https://placehold.co/600x400.png',
    rating: 4.7,
    reviews: 78,
    bio: 'Marketing strategist with a focus on digital growth and branding. Proven track record in scaling startups and e-commerce businesses.',
    expertise: ['Digital Marketing', 'SEO', 'Content Strategy', 'Branding', 'Social Media'],
    title: 'Marketing Director'
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">
              Unlock Your Potential with <span className="text-primary">MentorPath</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
              Connect with experienced mentors, gain valuable insights, and accelerate your career or personal growth. Find your path to success today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/mentors">
                  Find a Mentor <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">
                  Become a Mentor
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">Why Choose MentorPath?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Mentors</h3>
                <p className="text-foreground/70">Access a diverse network of highly-vetted professionals across various industries.</p>
              </div>
              <div className="p-6 rounded-lg">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                <p className="text-foreground/70">Receive tailored advice and support to achieve your specific goals.</p>
              </div>
              <div className="p-6 rounded-lg">
                <BarChart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                <p className="text-foreground/70">Develop new skills, expand your network, and advance your career.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Mentors Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">
              Meet Our Top Mentors
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/mentors">
                  Explore All Mentors <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
