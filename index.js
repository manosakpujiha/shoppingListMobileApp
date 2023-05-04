import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
// import Toastify from '../toastify-js'

const appSettings = {
    databaseURL : 'https://playground-f1eed-default-rtdb.firebaseio.com/'
}


let todos = document.querySelector('#list');
let addBtn = document.querySelector('#add-button');
let input = document.querySelector('#input-field');
addBtn.addEventListener('click' , handleClick);
input.addEventListener('keydown', handleSubmit);


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

onValue(shoppingListInDB, function(snapshot){
    todos.innerHTML = ''
    let items = Object.values(snapshot.val())
    items.map((item) => { 
        todos.innerHTML += `<li>${item}</li>`
        }) 
})

function handleClick () {
    if (input.value) push(shoppingListInDB, input.value);
    input.value = '';
    Toastify({
        text: "Added an Item!",
        duration: 3000,
        gravity: "top", // Available options: "top", "bottom", "left", "right"
        position: "center", // Available options: "center", "left", "right"
        style: {
            background: "linear-gradient(to right, red, gold)",
            borderRadius: '10px'
        },
        }).showToast();
}

function handleSubmit(e) {
    if (e.key === 'Enter') {
      // call your function here
      console.log('Enter key pressed!');
      handleClick();
    }
  }


