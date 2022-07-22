import React from "react"
import StartPage from './startPage';

export default function renderQuestions (props) {
    console.log('question page')

    // IF satatement is used to check whether quizzical question exist. if not, return startPage component 
    // i.e quizzical question wont exist if main menu button has being clicked so it will return to startPage component
    // The main Menu button deletes all data gotten from the api
    if (props.quizzical.length > 0) { 
        const question = props.quizzical

        // function to dynamically generate style for the answer items
        // it renders different styles based on props.dispalyAns
        function styleGenerator (type, condition, condition2 = false ) {
            if (type === 'selectingAnswer' ) {
                if (condition) { 
                    return {backgroundColor : '#D6DBF5'}
                }
            } else {
                if (condition) {
                    return {backgroundColor : '#94D7A2'}
                } if (condition2) { 
                    return {backgroundColor : '#F8BCBC'}
                } else {
                    return {opacity : 0.5, backgroundColor: '#F5F7FB' }
                }
            }
            
        }

        // mapping through the quiz data passed down as a prop from APP.js parent component
        // maps through it and displays/renders each individaul question and it's corresponding answers array to the DOM
        const mapQuizzical = question.map(item => {

            return (
                <div key={item.id}>
                    <br></br>
                    <h1 className="questionpage-h1">{item.question}</h1>
                    <ul className="answer-list">
                        {item.incorrect_answers.map(answerItem =>
                            <li
                                key={answerItem.id}
                                {...(!props.displayAns && {onClick: (id) => {props.select(item.id, answerItem.id)}})}
    //                            onClick={(id)=> props.select(item.id, answerItem.id)}
                                id={answerItem.id}
                                style = { !props.displayAns ?
                                        styleGenerator('selectingAnswer', answerItem.isClicked) :
                                        styleGenerator('displayingAnswer', answerItem.answer === item.correct_answer, answerItem.isClicked)}
                            >
                                {answerItem.answer}
                            </li>)}
                    </ul>
                    <hr></hr>
                </div>

            )
        }) 

        return (
            <div className="question-page">
                {mapQuizzical}
                {props.displayAns && <span>You scored {props.correct.length}/5 correct answers </span>}
                {!props.displayAns ? <button onClick={props.check}>check Answers</button> : <button onClick={props.newGame}>continue Game</button> }
                <br></br>
                {props.displayAns && <button onClick={props.menu}>Main Menu</button> }
            </div>

        )
    } else {
        return (
            <StartPage Start={props.newGame}/>
        )
    }
    
}