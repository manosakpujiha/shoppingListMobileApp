import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
const appSettings = {
    databaseURL : 'https://playground-f1eed-default-rtdb.firebaseio.com/'
}

const outline = document.querySelector('.outline');
outline.innerHTML = `
        <div id="toast">
            <div id="img"><img alt="toast image" src='./jiggly.png' width='50px' height='50px' /></div>
            <div id="desc">An new item was added by ...</div>
        </div>
        <div class="container">
            <img src="./pokemon-png-image-famous-anime-character-png-only-6.png" alt="pokemon">
        </div>
        <input type="text" id="input-field" placeholder="Bread"/>
        <button id="add-button">Add to cart</button>
        
        <ul id="list"></ul>
    `

const todos = document.querySelector('#list');
const addBtn = document.querySelector('#add-button');
const input = document.querySelector('#input-field');

input.addEventListener('keydown', handleSubmit);
addBtn.addEventListener('click' , submitToDb);


const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

onValue(shoppingListInDB, function(snapshot){
    todos.innerHTML = '';
    if (snapshot.exists()) {
        let items = Object.entries(snapshot.val())
        items.map((item) => { 
            const button = document.createElement('li')
            button.innerText=item[1];
            let deleteItem = del.bind(item);
            button.addEventListener('click', deleteItem);
            todos.append(button);
            launch_toast('Welcome!')
        })
    } else {
        todos.innerHTML= 'Your shopping list is empty!';
    }
})

function del() {
    remove(ref(database, `shoppingList/${this[0]}`));
    launch_toast(`${this[1]} was removed by ...`, 'red')
    
}

function submitToDb() {
    if (input.value) {
        push(shoppingListInDB, input.value);
        launch_toast(`${input.value} was added by ...`, 'green')
        
    }
    input.value = '';
}

function handleSubmit(e) {
    if (e.key === 'Enter') {
      submitToDb();

    }
  }

  function runToast () {
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

  function launch_toast(text, color='green') {
    let x = document.getElementById("toast");
    x.innerText = text;
    // x.background = color;
    x.className = `show ${color}`;
    setTimeout(function(){ x.className = x.className.replace(`show ${color}`, ""); }, 5000);
}