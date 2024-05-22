
/*
TODO:

Some way to store the data locally (done)
some way to remove a bullet point
better style
refactor code

*/


let form = document.getElementById("form");
let unorderedList = document.getElementById("bookList");
let have = new Set();
let dict = {};
let id = 1;


function Initialize(){
    getPastBooks();
    document.getElementById("saveButton").addEventListener('click', function() {
        saveState()
    });
    document.getElementById("form").addEventListener('submit', function(event){
        receive(event);
    });
}
Initialize();

function receive(event){
    

        event.preventDefault();
    
        let form = event.target;

        let formData = new FormData(form);
        let jsonData = {};
        formData.forEach((value, key) => jsonData[key] = value);
    
        console.log(jsonData);
    
        let name = jsonData.bookName;
        let date = jsonData.dateFinished;
    
        if (name == "" || date == ""){
            alert("Enter something valid");
            return
        }
        date = date.split("-").reverse().join("-");
    
        let stringToAdd = name + " " + date;
    
        addBook(stringToAdd, id);
        alert("Your book was added! Don't forget to save!");
    
}

function getPastBooks(){

    let pastBooksString = localStorage.pastBooks;

    console.log(pastBooksString)
    if (pastBooksString == undefined || pastBooksString == ""){

    }
    else{
        pastBooksList = pastBooksString.split('@#@'); //@#@ a way to separate books
        
        pastBooksList.forEach((book, index) => {
            addBook(book, id);
        })
    }
}

function removeBook(liTag){

    let idToRemove = liTag.id;
    idToRemove = parseInt(idToRemove);

    console.log(liTag);
    console.log(idToRemove);

    have.delete(idToRemove);
    unorderedList.removeChild(liTag);

}

function saveState(){
    console.log("save button clicked!")
    let books = [];
    have.forEach((bookId) =>{
        console.log(bookId);
        books.push(dict[bookId]);
    })

    console.log(books);

    let state = books.join("#@#");
    localStorage.pastBooks = state;
    alert("Saved!");
}



function addBook(stringToAdd, id){ // takes the final string.

    console.log(stringToAdd);

    dict[id] = stringToAdd;
    have.add(id);
    id++;

    let bulletPoint = document.createElement("li");
    bulletPoint.className = "bulletPoint";
    bulletPoint.id = id - 1;
    bulletPoint.textContent = stringToAdd;

    let deleteButton = document.createElement("button");
    deleteButton.className = "X-btn" ;
    deleteButton.textContent = "X";


    bulletPoint.appendChild(deleteButton);
    unorderedList.appendChild(bulletPoint);

    console.log(unorderedList.children);

    console.log(bulletPoint);

    deleteButton.addEventListener("click", function() {
        removeBook(deleteButton.parentElement)});

    
}





