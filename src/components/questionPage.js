import React from "react"

export default function renderQuestions (props) {

    const question = props.quizzical
    const mapQuizzical = question.map(item => {
        console.log(item.incorrect_answers)
    }) 

    //console.log(props.quizzical[0].incorrect_answers)
    return (
        <div className="question-page">
            <br></br>
            <h1>How would one say goodbye in Spanish? This is also a test of character because we cant know</h1>
            <ul className="answer-list">
                <li>adios</li>
                <li>mama cita</li>
                <li>senorita</li>
                <li>casper</li>
            </ul>
            <hr></hr>
        </div>
        
    )
}