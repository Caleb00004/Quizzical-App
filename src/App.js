import React from 'react';
import StartPage from './components/startPage';
import QuestionPage from './components/questionPage';
//import Test  from './testData';
import processData from './functions/processData'
import generateRandomIndex from './functions/generateRandomIndex';

export default function App () {

    const [data, setData] = React.useState([]) // stores all the data gotten from api after it has being processed
    const [Questions, setQuestions] = React.useState([]) // stores the 5 processed data/questions to be displayed
    const [displayAnswers, setDisplayAnswers] = React.useState(false) // primary aim to dynamically render different styles in questionPage component
    const [correctAnswers, setcorrectAnswers] = React.useState([]) // stores array of correct answers gotten/selected by the user
    const [waitingMessage, setWaitingMessage] = React.useState("") //stores message to be displayed to user while quiz data is being fetched from api
    const [displayWaitingMessage, setDisplayWaitingMessage] = React.useState(false) // Tells react when to render display message 
    const [errorMesssage] = React.useState("Error try refreshing the page") // message to be displayed if error occurs while fetching data
    const [displayErrorMessage, setDisplayErrorMessage] = React.useState(false) // Tells react when to render error message


    // useEffect hook to dynamically render waiting message to DOM while data is being fetched from api
    React.useEffect(()=> {
        console.log("useEffect triggered ")
        if (displayWaitingMessage) {
            data.length <= 0 ? setWaitingMessage('fetching Data please hold') : setWaitingMessage('proceed')
        }
    },[displayWaitingMessage, data]) 

    // restores the game back to its original state 
    function mainMenu() {
        setData([])
        setDisplayWaitingMessage(false)
        setDisplayErrorMessage(false)
        setQuestions([])
    }

    // function to select which (5) questions will be displayed to the DOM and update QUESTIONS state. 
    function startGame (category) {
        //To make sure it only fectches data when 'Data' array set is empty i.e no data has being fetched
        if (data.length < 1) {

            // fetching quiz Data from api
            async function getResponse() {
                const response = await fetch(
                      `https://opentdb.com/api.php?amount=30&category=${category}&type=multiple`,
                    {
                        method: 'GET',
                    } 
                );
                if (!response.ok) {
                    const message = `an error occured`
                    throw new Error(message)
                }
                let data = await response.json(); // Extracting data as a JSON Object from the response
                setData(processData(data.results))// calls processData function and passes raw data fetched from api as parameter
            }
            getResponse().catch(error => { // To handle errors in fecthing data
                setDisplayErrorMessage(true) // tells react to render error message to DOM
                setDisplayWaitingMessage(false) // tells react to stop rendering waiting message to DOM
            })
    
            getResponse()
        }
    
        
        !displayErrorMessage && setDisplayWaitingMessage(true)
        // selecting answers to display
        if (data.length > 0 ) { //To confirm that data has being fetched and saved in state [i.e to prevent error]
            // stores the 5 questions randomly selected using for loop to be displayed
            let questionArray = []
            for (let i = 0; i < 5; i++) {
                questionArray.push(data[generateRandomIndex()])
            }

            if (displayAnswers) {
                setDisplayAnswers(false)
                setQuestions(questionArray)
            } else {
                setQuestions(questionArray)
            } 
            //setDisplayAnswers(false)
        } else {
            return false
        }        
    }
    
    // function to idenify which answer was selected from the 'incorrect_answers' array
    // Has 2 parameters questionId and answerId
    // questionId = used to check which specific question object was clicked
    // answerID = used to get the specific answer object inside the 'incorrect_answer' array that was slecected
    // it is passed down to the "QUESTIONPAGE" component and called as an onClick event hander in the COMPONENT.
    // When called, gets the specific question object that called it using the QUESTIONID
    // Then using the ANSWERID,it maps through the incorrect_answers array and flips isClicked value of the specific clicked answer object inside 'incorrect_answers' array to True
    function selectAnswer(questionId, answerId) {
        let mapQuestion = Questions.map(questionItem => {
            let mapAnswer = questionItem.incorrect_answers.map(answerItem => {
                return answerItem.id === answerId ? {...answerItem, isClicked: !answerItem.isClicked} : answerItem
            }) // maps through all incorrect_answers array and returns new incorrect_answer array with a flipped isClicked value.

            if ( questionItem.id === questionId ) { //identifies the question object that an answer was selected for
                mapAnswer.map(ansItem => ansItem.id !== answerId ? ansItem.isClicked = false : ansItem) //falsify all answers in question object that was not clicked & leaves only clicked answer as true
                return {...questionItem, incorrect_answers : mapAnswer} //spreads through questionOBject and replaces the incorrect_answers with the updated one 
            } else {
                return questionItem 
            }
        })
        setQuestions(mapQuestion)
    }

    // function to check how many answers was gotten right by the user
    function checkAnswer () {
        let selectedAnswer = []

        Questions.map(queItem => {
            queItem.incorrect_answers.map(ansItem => {
                if (ansItem.isClicked && ansItem.answer === queItem.correct_answer) {
                    selectedAnswer.push(ansItem.answer)
                }
            })
        })
        
        setcorrectAnswers(selectedAnswer)
        setDisplayAnswers(true)
//        console.log("answerbtn clicked")
    }

    // function to choose which display message to be rendered to DOM [waiting or error message]
    function displayMessage() {
        if (displayWaitingMessage) {
            if (!displayErrorMessage) {
                return <h1 className='waiting-message'>{waitingMessage}</h1>
            }
        } else if (displayErrorMessage) {
            if (!displayWaitingMessage) {
                if (data.length <= 0) {
                    return <h1 className='error-message'>{errorMesssage}</h1>
                }
            }
        } else {
            return false
        }
    }

    return (
        <div>
            <img className="blob-5" alt="blob 5" src={'./images/blob 5.png'}></img>
            <img className="blob-4" alt="blob 4" src={'./images/blob 4.png'}></img>
            {Questions.length < 1 ?
                <div>
                <StartPage Start={startGame} /> 
                {displayMessage()}
                </div>:
                <QuestionPage quizzical={Questions} select={selectAnswer} check={checkAnswer} displayAns={displayAnswers} correct={correctAnswers} newGame={startGame} menu={mainMenu} />}

        </div>
    )
}
