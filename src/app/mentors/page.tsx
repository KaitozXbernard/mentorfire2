import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MentorCard, type Mentor } from '@/components/mentors/MentorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Alan Tojo',
    imageUrl: 'https://placehold.co/600x400.png?text=AM',
    rating: 4.9,
    reviews: 120,
    bio: 'Seasoned software architect with 15+ years of experience in cloud technologies and AI. Passionate about guiding the next generation of tech leaders.',
    expertise: ['Software Architecture', 'Cloud Computing (AWS, Azure)', 'AI/ML', 'DevOps', 'System Design', 'Microservices'],
    title: 'Principal Software Architect'
  },
  {
    id: '2',
    name: 'Johnathan Lee',
    imageUrl: 'https://placehold.co/600x400.png?text=JL',
    rating: 4.8,
    reviews: 95,
    bio: 'UX/UI design lead specializing in mobile applications and user-centered design principles. Helping mentees build intuitive and beautiful products.',
    expertise: ['UX Design', 'UI Design', 'Prototyping', 'User Research', 'Mobile Apps', 'Figma'],
    title: 'Lead UX Designer'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    imageUrl: 'https://placehold.co/600x400.png?text=SC',
    rating: 4.7,
    reviews: 78,
    bio: 'Marketing strategist with a focus on digital growth and branding. Proven track record in scaling startups and e-commerce businesses.',
    expertise: ['Digital Marketing', 'SEO', 'Content Strategy', 'Branding', 'Social Media', 'Google Analytics'],
    title: 'Marketing Director'
  },
  {
    id: '4',
    name: 'Michael Brown',
    imageUrl: 'https://placehold.co/600x400.png?text=MB',
    rating: 4.9,
    reviews: 150,
    bio: 'Cybersecurity expert with a decade of experience in threat intelligence and network security. Committed to fostering talent in the cybersecurity field.',
    expertise: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'Cryptography', 'Incident Response'],
    title: 'Senior Cybersecurity Analyst'
  },
  {
    id: '5',
    name: 'Linda Williams',
    imageUrl: 'https://placehold.co/600x400.png?text=LW',
    rating: 4.6,
    reviews: 65,
    bio: 'Product Management leader with experience in SaaS and B2B products. Enjoys coaching aspiring product managers on strategy and execution.',
    expertise: ['Product Management', 'Agile', 'Scrum', 'Roadmapping', 'Market Analysis'],
    title: 'Head of Product'
  },
    {
    id: '6',
    name: 'David Garcia',
    imageUrl: 'https://placehold.co/600x400.png?text=DG',
    rating: 4.8,
    reviews: 110,
    bio: 'Data Scientist specializing in machine learning models and big data analytics. Passionate about helping others break into the data science field.',
    expertise: ['Data Science', 'Machine Learning', 'Python', 'R', 'Big Data', 'Statistics'],
    title: 'Lead Data Scientist'
  },
];


export default function MentorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-headline mb-4">Find Your Mentor</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Browse our community of experienced mentors ready to help you achieve your goals.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-10 p-6 bg-card border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2 lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search by keyword</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="search" placeholder="e.g., 'Software Engineering', 'UX Design', 'Alice'" className="pl-10" />
              </div>
            </div>
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-foreground mb-1">Expertise</label>
              <Select>
                <SelectTrigger id="expertise">
                  <SelectValue placeholder="All Expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swe">Software Engineering</SelectItem>
                  <SelectItem value="ux">UX Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="product">Product Management</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto lg:mt-0 mt-4 self-end">
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </div>
        
        {/* Mentor Grid */}
        {mockMentors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Mentors Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
