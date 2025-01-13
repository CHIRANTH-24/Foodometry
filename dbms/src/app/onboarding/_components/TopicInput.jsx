import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const TopicInput = ({ setTopic, selectDifficultyLevel }) => {
    return (
        <div className="">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-400 dark:from-indigo-300 dark:to-pink-300 text-transparent bg-clip-text">Let us know what topics are you wiiling to focus on?</h3>
            <Textarea placeholder="eg: DSA, CN..." className="mb-10 w-full" onChange={(e) => { setTopic(e.target.value) }} />
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-400 dark:from-indigo-300 dark:to-pink-300 text-transparent bg-clip-text">Select your difficulty</h3>

            <div>
                <Select onValueChange={(value) => selectDifficultyLevel(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                </Select>

            </div>
        </div>
    )
}

export default TopicInput
