"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const SelectOption = ({ selectedStudyType }) => {
    const options = [
        {
            name: "exam",
            image: "/assets/exam_1.png"
        },
        {
            name: "job",
            image: "/assets/quiz.png"
        },
        {
            name: "practice",
            image: "/assets/practice.png"
        },
        {
            name: "code",
            image: "/assets/code.png"
        },
        {
            name: "other",
            image: "/assets/exam.png"
        }
    ]
    const [selected, setSelected] = useState("exam");
    useEffect(() => { setSelected(selected) }, [])
    return (
        <div className="p-6">
            <h3 className="text-2xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 to-pink-500 dark:from-indigo-400 dark:to-pink-400 text-transparent bg-clip-text text-center">
                What are you preparing for?
            </h3>
            <div className="flex flex-wrap gap-6 justify-center">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`group w-36 p-4 border rounded-lg hover:shadow-lg transition-transform duration-200 hover:scale-105 ${option.name === selected
                            ? "border-primary bg-primary-light"
                            : "border-gray-300 dark:border-gray-600"
                            } cursor-pointer`}
                        onClick={() => {
                            setSelected(option.name);
                            selectedStudyType(option.name);
                        }}
                    >
                        <Image
                            height={50}
                            width={50}
                            src={option.image}
                            alt={`${option.name} image`}
                            className="mx-auto"
                        />
                        <h1 className="text-center mt-4 text-lg font-medium group-hover:text-primary dark:group-hover:text-primary-light">
                            {option.name}
                        </h1>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default SelectOption
