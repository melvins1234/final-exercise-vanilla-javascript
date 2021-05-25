`use strict`;

const createBtn = document.getElementById("create-btn"),
    createTxt = document.getElementById('create-txt');

let todoList = document.querySelector('.todo__list ol'),
    todoLists = [];

if(JSON.parse(localStorage.getItem('todolist'))){
    todoLists = JSON.parse(localStorage.getItem('todolist'));

    todoLists.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = `<input type="text" value="${element}" disabled>
        <button id="edit" class="todo__list__edit">Edit</button>
        <button id="delete" onclick="e.preventDefault();" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
        todoList.appendChild(li);
    });
}

createBtn.addEventListener("mouseover", function(){
    this.textContent = "+"
});

createBtn.addEventListener("mouseout", function(){
    this.textContent = ""
});

createBtn.addEventListener('click', function(e){
    e.preventDefault();

    let li = document.createElement('li');
    li.innerHTML = `<input type="text" value="${createTxt.value}">
    <button id="edit" class="todo__list__edit">Edit</button>
    <button id="delete" onclick="e.preventDefault();" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
    
    if(createTxt.value === '')
        createTxt.classList.add('create-txt--invalid');
    else{
        todoList.appendChild(li);
        todoLists.push(createTxt.value);
        localStorage.setItem('todolist', JSON.stringify(todoLists));
        createTxt.value = '';
    }
})

createTxt.addEventListener('keyup', function(e){
    if(this.value !== '')
        createTxt.classList.remove('create-txt--invalid');

    if (e.keyCode === 13 || e.key === 'Enter') 
        createTxt.value = '';
})

function hasClass(elem, className){
    return elem.className.split(' ').indexOf(className) > -1;
}

window.onload = function(){
    createTxt.value = '';
}