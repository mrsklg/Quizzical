import React from "react"

export default function Intro(props) {
    return (
        <div className="start">
            <h1>Quizzical</h1>
            <h2 className="description">Try yourself in a trivia quiz!!</h2>
            <button className="btn" onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}