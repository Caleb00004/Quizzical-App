import React from "react"

export default function start(props) {
    // category of Quiz Questions
    const categoryArray = [{"id":0,"name":"Any category"},{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},
        {"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},
        {"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},
        {"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},
        {"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},
        {"id":24,"name":"Politics"},{"id":26,"name":"Celebrities"},
        {"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},
        {"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]


    let formData = {
        category : ''
        } 

    function handleForm(e) {
        if (e.target.name == 'category') {
            formData.category = e.target.value
//            category = e.target.value
//            setFormData((prevState) => )            
        } 
        console.log(formData)
        return formData
    }


    return (
        <div className="startPage">
            <div className="startPage-el">
                <h1>Quizzical</h1>
                <p>A fun quiz game. <br></br>Pick your category and get quiz questions about them</p>
                <br></br>
                <div className="custom-select">
                    <select onChange={handleForm} name='category'>
                        {categoryArray.map((arr) => <option className="custom-option" value={arr.id} key={arr.id}>{arr.name}</option>)}
                    </select>
                </div>
                <button type={"submit"} onClick = {() => {props.Start(formData.category)}} >Start quiz</button>
            </div>
        </div>
        
    )
}
