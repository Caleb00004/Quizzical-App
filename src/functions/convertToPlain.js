// function to convert html special characters to normal plain text.

export default  function convertToPlain(html){
    let tempDivElement = document.createElement("div"); // Create a new div element
    tempDivElement.innerHTML = html; // Set the HTML content with the given value
    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
}

