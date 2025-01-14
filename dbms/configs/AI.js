import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const recipeOutline = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate a recipe using these ingredients: Wheat , with a calorie limit of 100 per serving, in JSON format with title, description, ingredients (name, quantity, notes), steps, total calories, calories per serving, servings, prep time, cook time, total time, cuisine, dietary preferences, difficulty, and tags.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "title": "Sprouted Wheat Berry Salad with Lemon & Herbs",\n  "description": "A light and refreshing salad featuring sprouted wheat berries, bursting with flavor and fiber. Perfect for a healthy lunch or side dish.",\n  "ingredients": [\n    {\n      "name": "Sprouted Wheat Berries",\n      "quantity": "1/4 cup",\n      "notes": "Sprouted, cooked. If using dry wheat berries, increase to 1/8 cup and soak/cook before sprouting."\n    },\n        {\n      "name": "Cucumber",\n      "quantity": "1/4 cup",\n      "notes": "Diced small"\n    },\n    {\n       "name": "Fresh Parsley",\n      "quantity": "1 tbsp",\n      "notes": "Chopped"\n    },\n     {\n      "name": "Fresh Mint",\n      "quantity": "1 tsp",\n      "notes": "Chopped"\n    },\n     {\n       "name": "Lemon Juice",\n      "quantity": "1 tbsp",\n      "notes": "Freshly squeezed"\n    },\n     {\n      "name": "Dijon Mustard",\n       "quantity": "1/2 tsp",\n      "notes": "For emulsifying dressing"\n    },\n    {\n      "name": "Water",\n      "quantity": "1 tbsp",\n      "notes": "To adjust dressing consistency"\n    },\n    {\n      "name": "Salt",\n      "quantity": "Pinch",\n      "notes": "To taste"\n    },\n     {\n      "name": "Black Pepper",\n      "quantity": "Pinch",\n      "notes":"To taste"\n    }\n  ],\n  "steps": [\n    "If using dry wheat berries, soak them for 8-12 hours. Then drain and rinse, and let them sprout by keeping them in a jar or container, rinsing 2-3 times a day until you see little sprouts. Cook the sprouted wheat berries according to package instructions, or until tender.",\n    "While the wheat berries are cooking or cooling, dice the cucumber and chop the fresh parsley and mint.",\n    "In a small bowl, whisk together the lemon juice, Dijon mustard, water, salt and pepper.",\n     "In a medium bowl, combine the cooled sprouted wheat berries, diced cucumber, chopped parsley and mint.",\n     "Pour the lemon dressing over the salad and toss gently to combine.",\n    "Serve immediately or chill for later."\n  ],\n  "total_calories": 95,\n  "calories_per_serving": 95,\n  "servings": 1,\n  "prep_time": "10 minutes",\n  "cook_time": "15 minutes",\n   "total_time": "25 minutes",\n  "cuisine": "Mediterranean",\n  "dietary_preferences": ["Vegan", "Vegetarian", "High-Fiber", "Low-Calorie"],\n  "difficulty": "Easy",\n  "tags": ["salad", "wheat", "sprouted", "healthy", "light", "low calorie", "vegan", "vegetarian", "lunch", "side dish"]\n}\n```\n',
          },
        ],
      },
    ],
  });

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());

