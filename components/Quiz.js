import React from "react"
import Question from "./Question"
import { nanoid } from "nanoid"

export default function Quiz({ resetQuiz }) {
    const [quizFinished, setQuizFinished] = React.useState(false)
    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => data.results)
            .then(questions => setQuestions(questions.map(question => {
                return Object.assign(question, {
                    id: nanoid(),
                    allAnswers: shuffleArray([...question.incorrect_answers, question.correct_answer])
                })
            })))
    }, [])

    React.useEffect(() => {
        let allQuestionsAnswered
        if (questions.length !== 0) {
            allQuestionsAnswered = questions.every(question => question.selectedAnswer)
            allQuestionsAnswered && setQuizFinished(true)
        }
    }, [questions])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

    function handleAnswerSelection(id, selectedAnswer) {
        setQuestions(prevQuestions => prevQuestions.map(question => {
            return (
                question.id === id
                    ? Object.assign(question, { selectedAnswer: selectedAnswer })
                    : question
            )
        }))
    }

    function checkAnswers() {
        if (quizFinished) {
            setQuestions(prevQuestions => prevQuestions.map(question => {
                return Object.assign(question, { answered: true })
            }))
        }
    }

    const questionsEl = questions.map(el => {
        return (
            <Question
                key={el.id}
                id={el.id}
                question={el.question}
                allAnswers={el.allAnswers}
                correct_answer={el.correct_answer}
                handleChange={handleAnswerSelection}
                answered={el.answered}
                selectedAnswer={el.selectedAnswer}
            />
        )
    })

    return (
        <section className="quiz-container">
            <div className="questions-container">
                {questionsEl}
            </div>
            {
                questions.every(q => q.answered) && quizFinished
                    ? (
                        <div className="footer">
                            <p className="question">
                                You scored {
                                    questions.filter(q => q.correct_answer === q.selectedAnswer).length}/{questions.length} correct answers
                            </p>
                            <button className="btn" onClick={resetQuiz}>Play again</button>
                        </div>
                    )
                    : <button className="btn" onClick={checkAnswers}>Check answers</button>}
        </section>
    )
}