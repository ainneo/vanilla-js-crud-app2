## This site is a vanilla JavaScript CRUD app
Built with vanilla JS, HTML, and CSS. See directions below for installing and using the json server.

### Download and run JSON server from your terminal
Type ```npm install -g json-server``` and once that’s done installing, 
run ```json-server books.json``` to start server on http://localhost:3000/books
and run your index.html file... 

### How to fix the "Missing write access" error when using npm
If you have permission issues and write acess to your /usr/local/lib/node_modules
then run ```sudo chown -R $USER /usr/local/lib/node_modules```
https://flaviocopes.com/npm-fix-missing-write-access-error/

### On Page Start
On start the page opens with the default json obj, we only have one book.
We can add and remove books by entering and deleting the data.

*** Notes: 
- need to add input validation with regex
- for more info: https://medium.com/@jmartinez729/full-crud-with-javascript-1c3fb77f81f

