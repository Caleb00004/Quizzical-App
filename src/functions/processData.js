import {nanoid} from 'nanoid'
import convertToPlain from './convertToPlain';

// function to process api data and store it in RAWDATA State
// it inserts an id to every single data object,
// merges the correct_answer to incorrect_answer array and adds the isClicked property to every object in the array
export default function processData(apiData) {
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
    
    return apiData
    //setData(apiData)
}