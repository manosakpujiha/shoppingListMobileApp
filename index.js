import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
    databaseURL : 'https://playground-f1eed-default-rtdb.firebaseio.com/'
}

let todos = document.querySelector('#list');
let addBtn = document.querySelector('#add-button');
let input = document.querySelector('#input-field');
addBtn.addEventListener('click' , submitToDb);
const notification = document.querySelector('#notification')
input.addEventListener('keydown', handleSubmit);
notification.addEventListener('click' , launch_toast);

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

onValue(shoppingListInDB, function(snapshot){
    todos.innerHTML = '';

    if (snapshot.exists()) {
        let items = Object.entries(snapshot.val())
        items.map((item) => { 
            let button = document.createElement('li')
            button.innerText=item[1];
            let deleteItem = del.bind(item);
            button.addEventListener('click', deleteItem);
            todos.append(button);
            launch_toast()
        })
    } else {
        todos.innerHTML= 'Your shopping list is empty!';
    }
})

function del() {
    remove(ref(database, `shoppingList/${this[0]}`));
}

function submitToDb() {
    if (input.value) {
        push(shoppingListInDB, input.value);
        runToast();
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

  function launch_toast() {
    let x = document.getElementById("toast");

    console.log(x.className )

    x.className = "show";
    console.log(x.className )

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}