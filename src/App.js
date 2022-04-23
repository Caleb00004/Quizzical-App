import React from 'react';
import StartPage from './components/startPage';
import QuestionPage from './components/questionPage';
//import images from '../images'

export default function App () {

    const [Questions, setQuestions] = React.useState([])

    return (
        <div>
            <img className="blob-5" src={'./images/blob 5.png'}></img>            
            {Questions.length < 1 ? <StartPage /> : <QuestionPage />}
            <img className="blob-4" src={'./images/blob 4.png'}></img>
        </div>
    )
}