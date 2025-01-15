"use client";

import { UserButton } from '@clerk/nextjs';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, ChefHat, Utensils } from 'lucide-react'

function RecipePage() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        getRecipe();
    }, []);

    const getRecipe = async () => {
        try {
            const result = await axios.get('/api/recipe?recipeId=' + recipeId);
            setRecipe(result.data.result);
            console.log(result.data.result);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    }

    if (!recipe) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">{recipe?.recipeLayout?.title}</h1>
                    <UserButton />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{recipe?.recipeLayout?.description}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {recipe?.recipeLayout?.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <span>{recipe?.recipeLayout?.servings} serving(s)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>{recipe?.recipeLayout?.total_time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ChefHat className="h-5 w-5" />
                                <span>{recipe?.recipeLayout?.cuisine}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Utensils className="h-5 w-5" />
                                <span>{recipe?.recipeLayout?.difficulty}</span>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    {recipe?.recipeLayout?.ingredients.map((ingredient, index) => (
                                        <li key={index}>
                                            <span className="font-medium">{ingredient.name}</span> - {ingredient.quantity}
                                            {ingredient.notes && <span className="text-gray-600 ml-2">({ingredient.notes})</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                                <ol className="list-decimal pl-5 space-y-2">
                                    {recipe?.recipeLayout?.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex flex-wrap gap-4">
                            <div>
                                <h3 className="font-semibold">Total Calories</h3>
                                <p>{recipe?.recipeLayout?.total_calories} cal</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Calories per Serving</h3>
                                <p>{recipe?.recipeLayout?.calories_per_serving} cal</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Dietary Preferences</h3>
                                <p>{recipe?.recipeLayout?.dietary_preferences.join(", ")}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default RecipePage

