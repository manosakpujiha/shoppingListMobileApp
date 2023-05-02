
let addBtn = document.querySelector('.add-btn');
let input = document.querySelector('#input')
console.log(input)

addBtn.addEventListener('click' , handleClick);
input.addEventListener('input' , handleInput);


function handleClick () {
    console.log(input.value)

}

function handleInput () {
    console.log(input.value)

}