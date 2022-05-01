import React from 'react';
import StartPage from './components/startPage';
import QuestionPage from './components/questionPage';
import Test  from './testData';
import {nanoid} from 'nanoid'

//import images from '../images'

export default function App () {

    const [Questions, setQuestions] = React.useState([])

    // function to sey the sate to the question data gotten
    function requestData () {
             
        for (let i = 0; i < Test.length; i++) {
            let array = Test[i].incorrect_answers
                const mapping = array.map(item => {
                return ({id: nanoid(), answer: item, isClicked : false })

            }) 
            Test[i].incorrect_answers = mapping
            Test[i].incorrect_answers.push({id: nanoid(), answer: Test[i].correct_answer, isClicked:false})
            Test[i].id = nanoid()
        }
        
        setQuestions(Test)

    }
    
    // function to idenify which answer was selected from the 'incorrect_answers' array
    // Has 2 parameters questionId and answerId
    // questionId is to check which specific question object was clicked
    // answerID is used to get the specifc 'incorrect_answer' array that was se inside the question object slecected
    function selectAnswer(questionId, answerId) {
        console.log(`${questionId} and ${answerId}`)

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
            /*
            return (questionItem.id === questionId ?
                ({...questionItem, incorrect_answers : mapAnswer})
                : questionItem ) */
        })

        setQuestions(mapQuestion)
        console.log(mapQuestion)        
            
    }
    
    //console.log(Test)

    return (
        <div>
            <img className="blob-5" src={'./images/blob 5.png'}></img>
            <img className="blob-4" src={'./images/blob 4.png'}></img>
            {Questions.length < 1 ? <StartPage Data={requestData}/> : <QuestionPage quizzical={Questions} Answer={selectAnswer}/>}
            
        </div>
    )
}