import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

export default function App() {
    const [quizStarted, setQuizStarted] = React.useState(false)
    const [quizOptions, setQuizOptions] = React.useState({ num_of_questions: 5 })

    function toggleStart() {
        if (quizStarted) {
            setQuizOptions({ num_of_questions: 5 })
        }
        setQuizStarted(prevQuizStarted => !prevQuizStarted)
    }

    function changeOptions(e) {
        const { name, value } = e.target
        setQuizOptions(prevQuizOptions => Object.assign(prevQuizOptions, { [name]: value }))
    }

    return (
        <main>
            {
                quizStarted ? 
                    <Quiz resetQuiz={toggleStart} quizOptions={quizOptions}/> : 
                    <Intro handleChange={changeOptions} handleClick={toggleStart} />
            }
        </main>
    )
}