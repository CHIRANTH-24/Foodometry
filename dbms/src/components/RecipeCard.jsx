"use client"
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat,  ChartNoAxesCombined } from 'lucide-react'
import Link from 'next/link'

const RecipeCard = ({ recipe, index }) => {
  const top3 = recipe?.recipeLayout?.tags?.slice(0, 4) || []

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold line-clamp-1">{recipe?.recipeLayout?.title}</CardTitle>
        <p className='text-sm text-muted-foreground line-clamp-2'>{recipe?.recipeLayout?.description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className='flex items-center space-x-2'>
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{recipe?.recipeLayout?.servings} servings</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{recipe?.recipeLayout?.prep_time}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <ChefHat className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{recipe?.recipeLayout?.cuisine}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <ChartNoAxesCombined className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{recipe?.recipeLayout?.difficulty}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {top3.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter >
        <Link href={'/recipe/' + recipe?.recipeId} className="w-full">
        <Button  className="w-full" variant="default">View Recipe</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default RecipeCard

