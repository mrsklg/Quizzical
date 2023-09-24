import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

export default function App() {
    const [quizStarted, setQuizStarted] = React.useState(false)
    
    function toggleStart() {
        setQuizStarted(prevQuizStarted => !prevQuizStarted)
    }
    
    return (
        <main>
           {quizStarted ? <Quiz resetQuiz={toggleStart} /> : <Intro handleClick={toggleStart} />}
        </main>
    )
}