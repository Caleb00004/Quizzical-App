import React from 'react';
import StartPage from './components/startPage';
import QuestionPage from './components/questionPage';
import Test  from './testData';
import {nanoid} from 'nanoid'
//import images from '../images'


export default function App () {

    const [Questions, setQuestions] = React.useState([]) // stores quizzical data
    const [displayAnswers, setDisplayAnswers] = React.useState(false) // primary aim to dynamically render different styles in questionPage component
    const [correctAnswers, setcorrectAnswers] = React.useState([]) // stores array of correct answers gotten/selected by the user

    // function to set the sate to the question data gotten
    function requestData () {
        if (displayAnswers) {
            setDisplayAnswers(false)
            setQuestions(Test)
        }
        
        // generate random index to randomly add correct_answer to incorrect_answer array
        function generateRandomIndex () {
            return Math.floor(Math.random() * 4)
        }

        for (let i = 0; i < Test.length; i++) {
            let array = Test[i].incorrect_answers
                const mapping = array.map(item => {
                return ({id: nanoid(), answer: item, isClicked : false })

            }) 
            Test[i].incorrect_answers = mapping
            Test[i].incorrect_answers.splice(generateRandomIndex(), 0, {id: nanoid(), answer: Test[i].correct_answer, isClicked:false})
            Test[i].id = nanoid()
        }

//        console.log(Test)
//        setDisplayAnswers(false)
        setQuestions(Test)

    }
    
    // function to idenify which answer was selected from the 'incorrect_answers' array
    // Has 2 parameters questionId and answerId
    // questionId = used to check which specific question object was clicked
    // answerID = used to get the specific answer object inside the 'incorrect_answer' array that was slecected
    // it is passed down to the "QUESTIONPAGE" component and called as an onClick event hander in the COMPONENT.
    // When called, gets the specific question object that called it using the QUESTIONID
    // Then using the ANSWERID,it maps through the incorrect_answers array and flips isClicked value of the specific answer object inside 'incorrect_answers' array to True
    function selectAnswer(questionId, answerId) {
        let newState = []
        
        let mapQuestion = Questions.map(questionItem => {
            let mapAnswer = questionItem.incorrect_answers.map(answerItem => {
                return answerItem.id === answerId ? {...answerItem, isClicked: !answerItem.isClicked} : answerItem
            })

            if ( questionItem.id === questionId ) {
                mapAnswer.map(ansItem => ansItem.id != answerId ? ansItem.isClicked = false : ansItem)
                return {...questionItem, incorrect_answers : mapAnswer}
            } else {
                return questionItem 
            }
        })

        setQuestions(mapQuestion)
        //console.log(mapQuestion)
            
    }

    // function to check how many answers was gotten right by the user
    function checkAnswer () {
        let selectedAnswer = []

        Questions.map(queItem => {
            queItem.incorrect_answers.map(ansItem => {
                if (ansItem.isClicked && ansItem.answer === queItem.correct_answer) {
                    selectedAnswer.push(ansItem.answer)
                    setcorrectAnswers(selectedAnswer)
                }
//                ansItem.isClicked ? ansItem.answerconsole.log(ansItem.answer)
            })
        })
        setDisplayAnswers(true)
        console.log("answerbtn clicked")
    //    console.log(displayAnswers)
    }

//    console.log(displayAnswers)
    return (
        <div>
            <img className="blob-5" src={'./images/blob 5.png'}></img>
            <img className="blob-4" src={'./images/blob 4.png'}></img>
            {Questions.length < 1 ?
                <StartPage Data={requestData}/> :
                <QuestionPage quizzical={Questions} select={selectAnswer} check={checkAnswer} displayAns={displayAnswers} correct={correctAnswers} newGame={requestData} />}

        </div>
    )
}