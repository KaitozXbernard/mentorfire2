// src/app/dashboard/mentor/availability/page.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Settings, PlusCircle, Trash2, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TimeSlot {
  id: string; // for unique key
  startTime: string;
  endTime: string;
}

interface DailyAvailability {
  day: string; // e.g., "Monday"
  enabled: boolean;
  slots: TimeSlot[];
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialAvailability: DailyAvailability[] = daysOfWeek.map(day => ({
  day,
  enabled: day === "Monday" || day === "Wednesday" || day === "Friday", // Default some days
  slots: day === "Monday" || day === "Wednesday" || day === "Friday" ? [{id: crypto.randomUUID(), startTime: "09:00", endTime: "17:00" }] : []
}));


export default function MentorAvailabilityPage() {
  const [weeklyAvailability, setWeeklyAvailability] = useState<DailyAvailability[]>(initialAvailability);
  const [specificDate, setSpecificDate] = useState<Date | undefined>(new Date());
  const [specificDateSlots, setSpecificDateSlots] = useState<TimeSlot[]>([]); // For one-off availability/unavailability
  const [isSaving, setIsSaving] = useState(false);

  const toggleDayEnabled = (day: string) => {
    setWeeklyAvailability(prev => 
      prev.map(d => d.day === day ? { ...d, enabled: !d.enabled, slots: !d.enabled ? [{id: crypto.randomUUID(), startTime: "09:00", endTime: "17:00"}] : [] } : d)
    );
  };

  const addSlot = (day: string) => {
    setWeeklyAvailability(prev =>
      prev.map(d => d.day === day ? { ...d, slots: [...d.slots, {id: crypto.randomUUID(), startTime: "", endTime: ""}] } : d)
    );
  };

  const updateSlot = (day: string, slotId: string, field: 'startTime' | 'endTime', value: string) => {
    setWeeklyAvailability(prev =>
      prev.map(d => d.day === day ? { ...d, slots: d.slots.map(s => s.id === slotId ? { ...s, [field]: value } : s) } : d)
    );
  };

  const removeSlot = (day: string, slotId: string) => {
     setWeeklyAvailability(prev =>
      prev.map(d => d.day === day ? { ...d, slots: d.slots.filter(s => s.id !== slotId) } : d)
    );
  };
  
  const handleSaveAvailability = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Saving availability:", weeklyAvailability, specificDateSlots);
    toast({
      title: "Availability Updated",
      description: "Your availability settings have been saved successfully.",
    });
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Settings className="mr-3 h-7 w-7 text-primary" />
            Manage Your Availability
          </CardTitle>
          <CardDescription>
            Set your regular weekly schedule and add specific date overrides for your mentoring sessions.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Weekly Recurring Availability</CardTitle>
          <CardDescription>Set your general availability for each day of the week.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {weeklyAvailability.map(avail => (
            <div key={avail.day} className="p-4 border rounded-md bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`enable-${avail.day}`} 
                    checked={avail.enabled}
                    onCheckedChange={() => toggleDayEnabled(avail.day)}
                  />
                  <Label htmlFor={`enable-${avail.day}`} className="text-lg font-semibold">{avail.day}</Label>
                </div>
                {avail.enabled && (
                  <Button variant="outline" size="sm" onClick={() => addSlot(avail.day)}>
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Time Slot
                  </Button>
                )}
              </div>
              {avail.enabled && (
                <div className="space-y-3 pl-6">
                  {avail.slots.length === 0 && <p className="text-sm text-muted-foreground">No time slots added for {avail.day}. Add a slot to become available.</p>}
                  {avail.slots.map((slot, index) => (
                    <div key={slot.id} className="flex items-center gap-2">
                      <Input type="time" value={slot.startTime} onChange={(e) => updateSlot(avail.day, slot.id, 'startTime', e.target.value)} className="w-full" />
                      <span className="text-muted-foreground">-</span>
                      <Input type="time" value={slot.endTime} onChange={(e) => updateSlot(avail.day, slot.id, 'endTime', e.target.value)} className="w-full" />
                      <Button variant="ghost" size="icon" onClick={() => removeSlot(avail.day, slot.id)} aria-label="Remove slot">
                        <Trash2 className="h-4 w-4 text-destructive"/>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {!avail.enabled && <p className="text-sm text-muted-foreground pl-6">You are unavailable on {avail.day}s.</p>}
            </div>
          ))}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="text-xl">Specific Date Overrides</CardTitle>
          <CardDescription>Add or remove availability for specific dates. This will override your weekly schedule.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 items-start">
           <div>
            <Label className="block mb-2 font-semibold">Select a Date</Label>
            <Calendar
                mode="single"
                selected={specificDate}
                onSelect={setSpecificDate}
                className="rounded-md border"
              />
           </div>
           <div className="space-y-4">
            <Label className="block font-semibold">Manage Slots for {specificDate ? specificDate.toLocaleDateString() : 'Selected Date'}</Label>
            {/* Placeholder for managing specific date slots. This would be similar to weekly slot management but tied to 'specificDateSlots' state. */}
            <p className="text-sm text-muted-foreground p-4 border rounded-md bg-muted/30">
              Functionality to add/remove specific time slots for the selected date will be here.
              For example, you could mark entire days as unavailable or add extra one-off slots.
            </p>
            <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4"/> Add Specific Slot</Button>
           </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-8">
        <Button size="lg" onClick={handleSaveAvailability} disabled={isSaving}>
          {isSaving ? 'Saving...' : <><Save className="mr-2 h-5 w-5" /> Save All Availability</>}
        </Button>
      </div>
    </div>
  );
}
