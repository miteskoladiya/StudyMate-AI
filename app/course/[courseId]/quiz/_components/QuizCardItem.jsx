import { Button } from '@/components/ui/button'
import React, { useState } from 'react'


const QuizCardItem = ({ quiz,userSelectedOption }) => {
    const [selectedOption,setSelectedOption]=useState();

    if (!quiz || !quiz.options) {
        return <div>Loading...</div>; 
    }
    return quiz && (
        <div className='mt-10 p-5'>
            <h2 className='font-medium text-3xl text-center'>{quiz?.questionText}</h2>


            <div className='mt-6 grid grid-cols-2 gap-5'>
                {quiz.options.map((option, index) => (
                    <h2 key={index}
                    onClick={()=>{setSelectedOption(option)
                        userSelectedOption(option);
                    }}
                        variant='outline' className={`w-full border rounded-full p-3 px-4  text-center text-lg hover:bg-gray-200 cursor-pointer  ${selectedOption==option && 'bg-primary hover:bg-primary text-white'}`}
                        >

                        {option}
                    </h2>
                ))}
            </div>
        </div>
    )
}

export default QuizCardItem
