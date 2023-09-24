import React from "react"
import {decode} from 'html-entities'

export default function Question({ id, question, handleChange, selectedAnswer, allAnswers, correct_answer, answered }) {
        
    const answElements = allAnswers.map((answ, index) => {
        let isDisabled 
        let answClass = ""
        const decodedAnswer =  decode(answ)
        if (answered) {
            isDisabled = true
            if (decodedAnswer != correct_answer) {
                answClass = "unchecked-answ"
                if (decodedAnswer == selectedAnswer) {
                    answClass += " incorrect-answ"
                }
            } else if (decodedAnswer == correct_answer) {
                answClass = "correct-answ"
            } 
        }
        
        return (
            <div key={index}>
                <input 
                    type="radio" 
                    id={`${decodedAnswer}-${id}`} 
                    value={decodedAnswer} 
                    name={`answer-q${id}`} 
                    className={answClass} 
                    onChange={() => handleChange(id, answ)}
                    disabled={isDisabled}                    
                />
                <label htmlFor={`${decodedAnswer}-${id}`}>{decodedAnswer}</label>
            </div>
            )
    })
        
    return (
        <div>
            <p className="question">{decode(question)}</p>
            <div className="answers-container">
                {answElements}
            </div>
            <hr/>
        </div>
    )
}