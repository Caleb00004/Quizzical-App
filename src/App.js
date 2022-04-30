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
    

    function selectAnswer(id) {
//        console.log(id)
        return (
            Questions.map(item => {
                console.log(item.incorrect_answers)
            }))
            //setQuestions(prevState => prevState.map(item => {
            //    return item.incorrect_answers.id === id ? {...item, [incorrect_answers.isClicked] : !item.incorrect_answers.isClicked} : item }))
            //) 
    }
    
    console.log(Test)

    return (
        <div>
            <img className="blob-5" src={'./images/blob 5.png'}></img>
            <img className="blob-4" src={'./images/blob 4.png'}></img>
            {Questions.length < 1 ? <StartPage Data={requestData}/> : <QuestionPage quizzical={Questions} Answer={selectAnswer}/>}
            
        </div>
    )
}