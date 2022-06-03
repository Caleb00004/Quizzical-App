import React from 'react';
import StartPage from './components/startPage';
import QuestionPage from './components/questionPage';
//import Test  from './testData';
import {nanoid} from 'nanoid'


export default function App () {

    const [Questions, setQuestions] = React.useState([]) // stores the processed quizzical/question data
    const [displayAnswers, setDisplayAnswers] = React.useState(false) // primary aim to dynamically render different styles in questionPage component
    const [correctAnswers, setcorrectAnswers] = React.useState([]) // stores array of correct answers gotten/selected by the user
    const [data, setData] = React.useState([]) // stores all the data gotten from api after it has being processed
    const [waitingMessage, setWaitingMessage] = React.useState("") //stores message to be displayed to user while quiz data is being fetched from api
    const [displayWaitingMessage, setDisplayWaitingMessage] = React.useState(false) // Tells react when to render display message 
    const [errorMesssage] = React.useState("Error try refreshing the page") // message to be displayed if error occurs
    const [displayErrorMessage, setDisplayErrorMessage] = React.useState(false) // Tells when to render error message i.e if True


    // useEffect hook to dynamically render message to DOM while data is being fetched from api
    React.useEffect(()=> {
        if (displayWaitingMessage) {
            data.length <= 0 ? setWaitingMessage('fetching Data please hold') : setWaitingMessage("proceed")
        }
    },[displayWaitingMessage, data])
    
    
    // function to convert html special characters to normal plain text.
    function convertToPlain(html){
        let tempDivElement = document.createElement("div"); // Create a new div element
        tempDivElement.innerHTML = html; // Set the HTML content with the given value
        // Retrieve the text property of the element 
        return tempDivElement.textContent || tempDivElement.innerText || "";
    }

    // function to process api data and store it in RAWDATA State
    // it inserts an id to every single data object,
    // merges the correct_answer to incorrect_answer array and adds the isClicked property to every object in the array
    function processData(apiData) {
        console.log("called")
        // generate random index to randomly add correct_answer to incorrect_answer array
        function generateRandomIndex () {
            return Math.floor(Math.random() * 4)
        }

        for (let i = 0; i < apiData.length; i++) {
            apiData[i].question = convertToPlain(apiData[i].question) //to remove html special characters from the question gotten from api
            let array = apiData[i].incorrect_answers
                const mapping = array.map(item => {
                item = convertToPlain(item)
                return ({id: nanoid(), answer: item, isClicked : false })

            }) 
            apiData[i].incorrect_answers = mapping
            apiData[i].incorrect_answers.splice(generateRandomIndex(), 0, {id: nanoid(), answer: apiData[i].correct_answer, isClicked:false})
            apiData[i].id = nanoid()
        }
        
        setData(apiData)
    }

    // fetching quiz Data from api
    React.useEffect(()=> {
        async function getResponse() {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple',
                {
                    method: 'GET',
                }
            );
            if (!response.ok) {
                const message = `an error occured`
                throw new Error(message)
            }
            let data = await response.json(); // Extracting data as a JSON Object from the response
            console.log("comes second")
            processData(data.results)// calls processData function and passes raw data fetched from api as parameter
        }
        getResponse().catch(error => { // To handle errors in fecthing data
            setDisplayErrorMessage(true) // tells react to render error message to DOM
            setDisplayWaitingMessage(false) // tells react to stop rendering waiting message to DOM
        })

        getResponse()
    },[])

    console.log("comes first")
 
    // function to select which (5) questions will be displayed to the DOM and update QUESTIONS state. 
    function requestData () {
        !displayErrorMessage && setDisplayWaitingMessage(true)
        if (data.length > 0 ) { //To confirm that data has being fetched and saved in state [i.e to prevent error]
            let i = 0
            let array=[]

            while (i <= 50) {
                array.push(i)
                i++
            }

            // function to generate non repeating radom numbers
            // nunbers generted will be used to select which 5 questons from the full queston array will be dsipalyed 
            function generateRandomIndex () {
                let random = Math.floor(Math.random() * 49)

                if (array.includes(random)) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] === random) {
                            array.splice(i, 1)
                        }
                    }
                    return random
                } else {
                    return generateRandomIndex()
                }
            }
            
            let questionArray = []// stores the 5 questions randomly selected using for loop to be displayed
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
    // Then using the ANSWERID,it maps through the incorrect_answers array and flips isClicked value of the specific answer object inside 'incorrect_answers' array to True
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
        console.log(mapQuestion)
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
        console.log("answerbtn clicked")
    }

    
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
                <StartPage Data={requestData}/> 
                {displayMessage()}
            {/* {displayWaitingMessage && !displayErrorMessage ? (<h1 className='waiting-message'>{waitingMessage}</h1>) : (displayErrorMessage && !displayWaitingMessage ? <h1 className='error-message'>{errorMesssage}</h1> : false)} */}
                </div>:
                <QuestionPage quizzical={Questions} select={selectAnswer} check={checkAnswer} displayAns={displayAnswers} correct={correctAnswers} newGame={requestData} />}

        </div>
    )
}