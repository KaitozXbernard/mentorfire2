import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink } from 'lucide-react';

export interface Mentor {
  id: string;
  name: string;
  imageUrl?: string;
  rating: number;
  reviews: number;
  bio: string;
  expertise: string[];
  title: string;
}

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      <CardHeader className="p-0 relative">
        <Image
          src={mentor.imageUrl || `https://placehold.co/600x400.png?text=${mentor.name.split(' ').map(n=>n[0]).join('')}`}
          alt={mentor.name}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint="mentor profile"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-headline mb-1">{mentor.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
        <div className="flex items-center mb-3">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-md font-semibold mr-1">{mentor.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
        </div>
        <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{mentor.bio}</p>
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground">Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
            ))}
            {mentor.expertise.length > 3 && (
              <Badge variant="outline">+{mentor.expertise.length - 3} more</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        <Button asChild className="w-full">
          <Link href={`/mentors/${mentor.id}`}>
            View Profile <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
