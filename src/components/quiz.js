import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../index.css"
import { Link, useLocation } from 'react-router-dom';


export default function Quiz() {


    const location = useLocation();
    const category = location.state?.category;

    const API_URL = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
    const [questions, setQuestions] = useState([])
    const [score, setScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const [loading, setLoading] = useState(true)
    const [gameOver, setGameOver] = useState(false)


    function handleClicks(a){
        if (a === questions[currentQuestion].correct_answer){
            setScore(score + 1)
        }

        if (currentQuestion < 9 ){
            setCurrentQuestion(currentQuestion + 1)
        }else {
           setGameOver(true)
        }

        

    }
   


    useEffect(function (){

        axios.get(API_URL).then(response => {
            setLoading(true)
            setQuestions(response.data.results)
        

        }).catch(e => {
            console.error(e)
            
        }).finally(() => {
            setLoading(false)
        })

    }, [API_URL])
    
  
    if (loading)
        return <div>Loading ...</div>

    if (questions[currentQuestion] == null)
        return <div>Error question not found .</div>


    if (gameOver)
        return <div>
            <h1>Quiz terminé !</h1>
            <p> Votre score : {score} sur 10</p>
            <Link to={"/"}>Terminé</Link>
        </div>

    let answers = [
        questions[currentQuestion].correct_answer,
        ...questions[currentQuestion].incorrect_answers,
    ]

    answers = answers.sort()

    return (
        <div>
            <h1> { questions[currentQuestion].question } </h1>

            {answers.map(a => (
                <button onClick={() => handleClicks(a)}>{a}</button>
            ))}
           
        </div>
  )
}