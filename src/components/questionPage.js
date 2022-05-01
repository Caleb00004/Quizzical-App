import React from "react"

export default function renderQuestions (props) {

    const question = props.quizzical
    const mapQuizzical = question.map(item => {

        //console.log(item.incorrect_answers[1])

        return (
            <div key={item.id}>                
                <br></br>
                <h1 className="questionpage-h1">{item.question}</h1>
                <ul className="answer-list">
                    {item.incorrect_answers.map(answerItem => 
                        <li 
                            key={answerItem.id}
                            onClick={(id)=> props.Answer(item.id, answerItem.id)}
                            id={answerItem.id}
                            style={answerItem.isClicked ? {backgroundColor: '#D6DBF5'} : {backgroundColoe: '#293264'} }> 
                            {answerItem.answer}
                        </li>)}
                    {/*
                    <li key={item.incorrect_answers[0].id} onClick={(id)=> props.Answer(id)} id={item.incorrect_answers[0].id}>{item.incorrect_answers[0].answer}</li>
                    <li key={item.incorrect_answers[1].id} id={item.incorrect_answers[1].id}>{item.incorrect_answers[1].answer}</li>
                    <li key={item.incorrect_answers[2].id} id={item.incorrect_answers[2].id}>{item.incorrect_answers[2].answer}</li>
                    <li key={item.incorrect_answers[3].id} id={item.incorrect_answers[3].id}>{item.incorrect_answers[3].answer}</li>
                    */}
                    
                </ul>
                <hr></hr>
            </div>

        )
    }) 

    return (
        <div className="question-page">
            {mapQuizzical}
        </div>
        /*
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
        */
    )
}