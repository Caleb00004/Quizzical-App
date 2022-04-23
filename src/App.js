import React from 'react';
import StartPage from './components/startPage';
import QuestionPage from './components/questionPage';

export default function App () {

    const [Questions, setQuestions] = React.useState([])

    return (
        <div>
            {Questions.length < 1 ? <StartPage /> : <QuestionPage />}

        </div>
    )
}