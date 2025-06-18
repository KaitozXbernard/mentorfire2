'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar'; // ShadCN Calendar
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Clock, MessageCircle, CheckCircle, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

// Mock mentor data - in a real app, fetch this based on mentorId
const mockMentor = {
  id: '1',
  name: 'Dr. Alice Morgan',
  avatarUrl: 'https://placehold.co/80x80.png?text=AM',
  title: 'Principal Software Architect',
  availability: [ // Example: array of available date-time slots
    new Date(new Date().setDate(new Date().getDate() + 2)).setHours(10,0,0,0),
    new Date(new Date().setDate(new Date().getDate() + 2)).setHours(14,0,0,0),
    new Date(new Date().setDate(new Date().getDate() + 3)).setHours(11,0,0,0),
    new Date(new Date().setDate(new Date().getDate() + 5)).setHours(16,0,0,0),
  ]
};


export default function ScheduleSessionPage({ params }: { params: { mentorId: string } }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [message, setMessage] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select Date/Time, 2: Confirm

  // Filter available times based on selected date
  useEffect(() => {
    if (selectedDate) {
      const timesForDate = mockMentor.availability
        .filter(slotTimestamp => {
          const slotDate = new Date(slotTimestamp);
          return slotDate.getFullYear() === selectedDate.getFullYear() &&
                 slotDate.getMonth() === selectedDate.getMonth() &&
                 slotDate.getDate() === selectedDate.getDate();
        })
        .map(slotTimestamp => new Date(slotTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
      setAvailableTimes(timesForDate);
      setSelectedTime(undefined); // Reset time if date changes
    }
  }, [selectedDate]);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({ title: "Selection Missing", description: "Please select a date and time.", variant: "destructive" });
      return;
    }
    setBookingStep(2); // Move to confirmation step
  };

  const confirmBooking = () => {
    // Simulate booking API call
    console.log('Booking confirmed for:', selectedDate, selectedTime, message);
    toast({ title: "Booking Request Sent!", description: `Your request to book Dr. Alice Morgan for ${selectedDate?.toLocaleDateString()} at ${selectedTime} has been sent.`, className:"bg-green-500 text-white" });
    // Redirect or clear form
    setBookingStep(1);
    setSelectedDate(new Date());
    setSelectedTime(undefined);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-headline flex items-center">
              {bookingStep === 1 ? <Clock className="mr-3 h-7 w-7 text-primary" /> : <CheckCircle className="mr-3 h-7 w-7 text-primary" />}
              {bookingStep === 1 ? 'Schedule a Session' : 'Confirm Your Booking'}
            </CardTitle>
            {bookingStep === 2 && (
                <Button variant="outline" size="sm" onClick={() => setBookingStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back to Calendar
                </Button>
            )}
          </div>
          <CardDescription>
            Book a one-on-one session with {mockMentor.name}.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockMentor.avatarUrl} alt={mockMentor.name} data-ai-hint="mentor avatar"/>
              <AvatarFallback>{mockMentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{mockMentor.name}</h3>
              <p className="text-muted-foreground">{mockMentor.title}</p>
              <Link href={`/mentors/${params.mentorId}`} className="text-sm text-primary hover:underline flex items-center mt-1">
                <User className="mr-1 h-4 w-4"/> View Profile
              </Link>
            </div>
          </div>

          {bookingStep === 1 && (
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <Label className="text-md font-semibold mb-2 block">1. Select a Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border p-0"
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) || !mockMentor.availability.some(slot => new Date(slot).toDateString() === date.toDateString())}
                />
              </div>
              <div className="space-y-4">
                <Label className="text-md font-semibold mb-2 block">2. Select an Available Time</Label>
                {selectedDate && availableTimes.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableTimes.map(time => (
                      <Button 
                        key={time} 
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm p-4 border rounded-md bg-muted/30">
                    {selectedDate ? "No available times for this date." : "Please select a date to see available times."}
                  </p>
                )}
                {selectedDate && selectedTime && (
                  <div className="mt-6 space-y-2">
                    <Label htmlFor="message" className="text-md font-semibold">3. Add a Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Let the mentor know what you'd like to discuss..."
                      rows={3}
                    />
                  </div>
                )}
                <Button 
                  size="lg" 
                  className="w-full mt-6" 
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                >
                  Proceed to Confirmation
                </Button>
              </div>
            </div>
          )}

          {bookingStep === 2 && selectedDate && selectedTime && (
            <div className="space-y-6">
                <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-xl">Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p><strong>Mentor:</strong> {mockMentor.name}</p>
                        <p><strong>Date:</strong> {selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                        {message && <p><strong>Message:</strong> {message}</p>}
                    </CardContent>
                </Card>
              <Button size="lg" className="w-full" onClick={confirmBooking}>
                <CheckCircle className="mr-2 h-5 w-5"/> Confirm & Request Booking
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
