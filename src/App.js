import React from 'react';
import StartPage from './components/startPage';
import QuestionPage from './components/questionPage';
//import Test  from './testData';
import {nanoid} from 'nanoid'
//import images from '../images'


export default function App () {

    const [Questions, setQuestions] = React.useState([]) // stores quizzical data
    const [displayAnswers, setDisplayAnswers] = React.useState(false) // primary aim to dynamically render different styles in questionPage component
    const [correctAnswers, setcorrectAnswers] = React.useState([]) // stores array of correct answers gotten/selected by the user
    const [rawData, setRawData] = React.useState([])
    
    // function to convert html special characters to normal plain text.
    function convertToPlain(html){
        // Create a new div element
        let tempDivElement = document.createElement("div");
        // Set the HTML content with the given value
        tempDivElement.innerHTML = html;
        // Retrieve the text property of the element 
        return tempDivElement.textContent || tempDivElement.innerText || "";
    }

    // function to process api data and store it in RAWDATA State
    function processData(apiData) {
//        console.log("called")
        // generate random index to randomly add correct_answer to incorrect_answer array
        function generateRandomIndex () {
            return Math.floor(Math.random() * 4)
        }

        for (let i = 0; i < apiData.length; i++) {
            apiData[i].question = convertToPlain(apiData[i].question) //to remove html special characters from the question gotten from api
            let array = apiData[i].incorrect_answers
                const mapping = array.map(item => {
                return ({id: nanoid(), answer: item, isClicked : false })

            }) 
            apiData[i].incorrect_answers = mapping
            apiData[i].incorrect_answers.splice(generateRandomIndex(), 0, {id: nanoid(), answer: apiData[i].correct_answer, isClicked:false})
            apiData[i].id = nanoid()
        }
        
        setRawData(apiData)
    }

    // fetching quiz Data from api
    React.useEffect(()=> {
        async function getResponse() {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=50&category=11&difficulty=easy&type=multiple',
                {
                    method: 'GET',
                }
            );
            let data = await response.json(); // Extracting data as a JSON Object from the response
            console.log("comes second")        
//            console.log(data.results)
//            setRawData(data)
            processData(data.results)
        }
        getResponse()
    },[])

    console.log("comes first")


    // function to select which (5) questions will be displayed to the DOM and update QUESTIONS state. 
    function requestData () {
        if (rawData.length > 0 ) {
            let i = 0
            let array=[]

            while (i <= 50) {
                array.push(i)
                i++
            }

//            Questions.map(item => item.incorrect_answers.map(incorrectItem => incorrectItem.isClicked = false))
            // function to generate non repeating radom numbers
            // nunbers generted will be used to select which questons from the full queston array will be dsipalyed 
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
    //            return Math.floor(Math.random() * 49)
            }
            
            let questionArray = []// stores the 5 questions randomly selected using for loop to be displayed
            for (let i = 0; i < 5; i++) {
                questionArray.push(rawData[generateRandomIndex()])
            }

            if (displayAnswers) {
                setDisplayAnswers(false)
                //console.log(Test)
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
        //console.log(Questions)
        //console.log(mapQuestion)
            
    }

    // function to check how many answers was gotten right by the user
    function checkAnswer () {
        let selectedAnswer = []
//        selectedAnswer.length = 0

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