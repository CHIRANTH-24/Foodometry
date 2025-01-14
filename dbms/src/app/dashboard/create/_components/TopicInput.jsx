import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const TopicInput = ({ setIngridients, setCalories }) => {
    return (
        <div className="">
            <h3 className="text-xl font-bold mb-6   bg-clip-text">Enter the ingridients:</h3>
            <Textarea placeholder="eg: Fruits, Veggies..." className="mb-10 w-full" onChange={(e) => { setIngridients(e.target.value) }} />
            <h3 className="text-xl font-bold mb-6   bg-clip-text">Enter the calories:</h3>
            <div>
                <Textarea placeholder="eg: 100,200..." className="mb-10 w-full" onChange={(e) => { setCalories(e.target.value) }} />
            </div>
        </div>
    )
}

export default TopicInput
