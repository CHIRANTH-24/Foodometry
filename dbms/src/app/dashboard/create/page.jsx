"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Create = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const recipeId = uuidv4();
  const router = useRouter();
  const createdBy = user?.fullName || "unknown";

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const GenerateRecipeOutline = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post('/api/generate-recipe', {
        recipeId: recipeId,
        ...formData,
        createdBy: createdBy,
      });

      console.log("API response:", result.data.result.resp);
      router.push("/dashboard/view");
      toast.success("Your recipe is ready!");
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Your Recipe</CardTitle>
        </CardHeader>
        <CardContent>
          <TopicInput
            setIngridients={(value) => handleUserInput('ingridients', value)}
            setCalories={(value) => handleUserInput('calories', value)}
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={GenerateRecipeOutline}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Recipe'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Create;

