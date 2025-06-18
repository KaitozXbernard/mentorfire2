// src/app/actions/profileActions.ts
'use server';
import { generateProfileTags, type GenerateProfileTagsInput } from '@/ai/flows/generate-profile-tags';
import { z } from 'zod';

const ProfileTagsSchema = z.object({
  skills: z.string().min(3, "Please enter at least 3 characters for skills.").max(500, "Skills input is too long."),
});

export interface ProfileTagsFormState {
  message: string;
  tags?: string[];
  errors?: {
    skills?: string[];
    server?: string[];
  };
  timestamp?: number; // To ensure re-render on new state
}

export async function suggestProfileTagsAction(prevState: ProfileTagsFormState, formData: FormData): Promise<ProfileTagsFormState> {
  const validatedFields = ProfileTagsSchema.safeParse({
    skills: formData.get('skills'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  }

  try {
    const input: GenerateProfileTagsInput = { enteredSkills: validatedFields.data.skills };
    const result = await generateProfileTags(input);
    
    if (!result || !result.suggestedTags) {
        return {
            message: "AI service returned an unexpected response.",
            errors: { server: ["Could not generate tags from the AI service."] },
            timestamp: Date.now(),
        };
    }

    return {
      message: "Tags generated successfully!",
      tags: result.suggestedTags,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error generating profile tags:", error);
    // Check if error is an instance of Error to safely access message property
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      message: "Failed to generate tags due to a server error. Please try again later.",
      errors: { server: [errorMessage] },
      timestamp: Date.now(),
    };
  }
}
