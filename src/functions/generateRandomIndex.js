// function to generate non repeating radom numbers
// numbers generted will be used to select which 5 questons from the full queston array will be dsipalyed 

let i = 0
let array=[]

// Generate array 
while (i <= 29) {
    array.push(i)
    i++
}

export default function generateRandomIndex () {
    let random = Math.floor(Math.random() * 30)
    console.log(array)

    if (array.length <= 0) {
        array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
        return generateRandomIndex()

    } else { 
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

}