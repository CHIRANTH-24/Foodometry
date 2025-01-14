"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Create = () => {
  const { user } = useUser();
  const [state, setState] = useState(0);
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const recipeId = uuidv4();
  const router = useRouter();
  const createdBy = user?.fullName || "unknown";
  const handleUserInput = (fieldName, fieldValue) => {
    setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
    console.log(formData);
  };
  
  useEffect(() => {
    console.log("Updated formData:", formData);

  }, [formData]);


  const GenerateRecipeOutline = async () => {
    setIsLoading(true);
    const result = await axios.post('/api/generate-recipe', {
      recipeId: recipeId,
      ...formData,
      createdBy: createdBy,
    });

    console.log("API is hit", result.data.result.resp);
    setIsLoading(false);
    router.push("/dashboard/view");
    toast("Your recipe is ready!");

  };
  return (
    <div className='w-full mt-10'>
      <div className='flex-row justify-evenly'>
         <div className='mt-2'>

      
          <div className='mt-4'>
            <TopicInput setIngridients={(value) => handleUserInput('ingridients', value)} setCalories={(value) => handleUserInput('calories', value)} />
          </div>


        </div>
      </div>
      <div className='flex justify-evenly mt-40'>

        <Button onClick={GenerateRecipeOutline} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate'}
        </Button>

      </div>
    </div>
  );
};

export default Create;


