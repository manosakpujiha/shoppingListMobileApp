import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
const appSettings = {
    databaseURL : 'https://playground-f1eed-default-rtdb.firebaseio.com/'
}

const outline = document.querySelector('.outline');
// outline.innerHTML = `
        
//     `

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

 
  function launch_toast(text, color='green') {
    let x = document.getElementById("toast");
    x.innerText = text;
    // x.background = color;
    x.className = `show ${color}`;
    setTimeout(function(){ x.className = x.className.replace(`show ${color}`, ""); }, 5000);
}