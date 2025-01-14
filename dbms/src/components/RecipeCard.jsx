"use client"
import React from 'react'

const RecipeCard = ({ recipe }, index) => {
    
    const top3 = recipe?.recipeLayout?.tags;
    
    return (
      <div className="">
            <h1>{recipe?.recipeLayout?.title}</h1>
            <h6 className='text-sm text-gray-700 line-clamp-1'>{recipe?.recipeLayout?.description}</h6>
            <div className="grid grid-cols-2">
                <div className=''><h4 className="text-sm">🥤Servings:{recipe?.recipeLayout?.servings}</h4 ><h4 className="text-sm">⏱️{recipe?.recipeLayout?.prep_time}</h4 > </div>
                <div className=""><h6>{recipe?.recipeLayout?.cuisine}</h6><h6>{recipe?.recipeLayout?.difficulty}</h6> </div>
            </div>
    </div>
  )
}

export default RecipeCard
