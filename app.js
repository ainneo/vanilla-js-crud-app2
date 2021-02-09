//Loading the DOM and the ‘R’ of CRUD
//In order to get started, we need to make sure DOM has fully loaded 
//before anything else occurs add an event listener to the DOM:
document.addEventListener('DOMContentLoaded', function() {
    // everything else we type will go inside this!!
    // It is taking the entire document and listens for event of 'DOMContentLoaded' 
    // which is when the entire DOM has finished loading in
    // Once the event is heard, it then runs whatever code  {} 

    //cache DOM elements we want to use
    const bookContainer = document.querySelector('#book-container') //Read
    const bookForm = document.querySelector('#book-form') //Create
    
    const bookURL = `http://localhost:3000/books`
    let allBooks = [] //storing book data
    
    //READ
    //fetching data and iterating data into UI
    //run forEach on bookData, which will run a function on each individual book in bookData
    fetch(`${bookURL}`)
      .then( response => response.json() ) //read and parse the data using json()
      .then( bookData => bookData.forEach(function(book) {
        allBooks = bookData  //empty array is now assigned to the bookData
        bookContainer.innerHTML += `
        <div id=book-${book.id}>
          <h2>${book.title}</h2>
          <h4>Author: ${book.author}</h4>
          <img src="${book.coverImage}" width="333" height="500">
          <p>${book.description}</p>
          <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
          <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
        </div>
        <div id=edit-book-${book.id}>
        </div>`
      })) 
  

     //CREATE
     //This is listening for an event called ‘submit’ on bookForm
     //We have an input type “submit” (<input type="submit" value="Add Book">) 
     //if input is submitted then it will trigger the functions in this event listener
     //e.preventDefault() prevents button from automatically refreshing pg
     //so you will see data uploaded to database appear automatically instead of on a page refresh.
      bookForm.addEventListener('submit', (e) => {
      e.preventDefault();

     //cache DOM elems from the form we want to use in create
      const titleInput = bookForm.querySelector('#title').value
      const authorInput = bookForm.querySelector('#author').value
      const coverImageInput = bookForm.querySelector('#coverImage').value
      const descInput = bookForm.querySelector('#description').value

      //Similarly to previous fetch, 'POST' to post the data to database
      //then, body: JSON.stringify() takes data we feed into it and turns it
      //into stringified data, which humans don't like to read but easier for JSON to read
      fetch(`${bookURL}`, {
        method: 'POST',
        body: JSON.stringify({
          title: titleInput,
          author: authorInput,
          coverImage: coverImageInput,
          description: descInput
        }),
        //learn more about headers: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#headers
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( response => response.json())
        .then( book => {
          allBooks.push(book)
          bookContainer.innerHTML += `
          <div id=book-${book.id}>
            <h2>${book.title}</h2>
            <h4>Author: ${book.author}</h4>
            <img src="${book.coverImage}" width="333" height="500">
            <p>${book.description}</p>
            <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
            <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
          </div>
          <div id=edit-book-${book.id}>
          </div>`
        })
  
    }) // end of eventListener for adding a book
  
    //UPDATE
    //Now that we can CREATE and READ, we should be able to UPDATE our information
    bookContainer.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'edit') {
  
        const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
        editButton.disabled = true
  
        const bookData = allBooks.find((book) => {
          return book.id == e.target.dataset.id
        })
  
        const editForm = bookContainer.querySelector(`#edit-book-${e.target.dataset.id}`)
        editForm.innerHTML = `
          <form class='form' id='edit-book' action='index.html' method='post'>
            <form id="book-form">
              <input required id="edit-title" placeholder="${bookData.title}">
              <input required id="edit-author" placeholder="${bookData.author}">
              <input required id="edit-coverImage" placeholder="${bookData.coverImage}">
              <input required id="edit-description" placeholder="${bookData.description}">
              <input type="submit" value="Edit Book">
          </form>`
  
          editForm.addEventListener("submit", (e) => {
            event.preventDefault()
  
            const titleInput = document.querySelector("#edit-title").value
            const authorInput = document.querySelector("#edit-author").value
            const coverImageInput = document.querySelector("#edit-coverImage").value
            const descInput = document.querySelector("#edit-description").value
            const editedBook = document.querySelector(`#book-${bookData.id}`)
  
            fetch(`${bookURL}/${bookData.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                title: titleInput,
                author: authorInput,
                coverImage: coverImageInput,
                description: descInput
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then( response => response.json() )
            .then( book => {
              editedBook.innerHTML = `
              <div id=book-${book.id}>
                <h2>${book.title}</h2>
                <h4>Author: ${book.author}</h4>
                <img src="${book.coverImage}" width="333" height="500">
                <p>${book.description}</p>
                <button data-id=${book.id} id="edit-${book.id}" data-action="edit">Edit</button>
                <button data-id=${book.id} id="delete-${book.id}" data-action="delete">Delete</button>
              </div>
              <div id=edit-book-${book.id}>
              </div>`
              editForm.innerHTML = ""
            })
        }) // end of this event Listener for edit submit
  
                //D of CRUD delete
      } else if (e.target.dataset.action === 'delete') {
        document.querySelector(`#book-${e.target.dataset.id}`).remove()
          fetch(`${bookURL}/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json())
        }
  
    }) // end of eventListener for editing and deleting a book
  
  })
  