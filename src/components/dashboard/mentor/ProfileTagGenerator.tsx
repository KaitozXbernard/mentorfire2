'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { suggestProfileTagsAction, type ProfileTagsFormState } from '@/app/actions/profileActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const initialState: ProfileTagsFormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" />
          Suggest Tags
        </>
      )}
    </Button>
  );
}

export function ProfileTagGenerator() {
  const [state, formAction] = useFormState(suggestProfileTagsAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      if (state.errors) {
         toast({
          title: "Error",
          description: state.message || "An error occurred.",
          variant: "destructive",
        });
      } else if (state.tags) {
        toast({
          title: "Success",
          description: state.message || "Tags generated!",
        });
        // Optionally clear form on success
        // formRef.current?.reset(); 
      }
    }
  }, [state]);


  return (
    <Card className="shadow-lg rounded-xl w-full">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-primary" />
          AI-Powered Expertise Tags
        </CardTitle>
        <CardDescription>
          Enter your skills and let our AI suggest relevant tags to enhance your profile's searchability by mentees.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="skills" className="block text-sm font-medium mb-1">
              Enter Your Skills (comma-separated)
            </Label>
            <Textarea
              id="skills"
              name="skills"
              placeholder="e.g., JavaScript, React, Node.js, Project Management, UX Design"
              rows={4}
              className="focus:ring-accent focus:border-accent"
              required
            />
            {state?.errors?.skills && (
              <p className="mt-2 text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {state.errors.skills[0]}
              </p>
            )}
          </div>

          {state?.tags && state.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-md font-semibold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Suggested Tags:
              </h3>
              <div className="flex flex-wrap gap-2 p-4 border rounded-md bg-secondary/30">
                {state.tags.map((tag, index) => (
                  <Badge key={index} variant="default" className="text-sm px-3 py-1">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {state?.errors?.server && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
              <div>
                <strong>Server Error:</strong> {state.errors.server[0]}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-6 flex flex-col sm:flex-row justify-end items-center gap-4">
            <p className="text-sm text-muted-foreground order-2 sm:order-1 text-center sm:text-left flex-grow">
              AI suggestions help improve visibility. Review and select tags that best represent you.
            </p>
            <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
