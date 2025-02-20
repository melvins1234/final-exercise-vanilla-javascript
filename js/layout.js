`use strict`;

window.onload = function(){
    createTxt.value = '';
}

const createBtn = document.getElementById("create-btn"),
    createTxt = document.getElementById('create-txt');

let todoList = document.querySelector('.todo__list ol'),
    todoLists = [];

if(JSON.parse(localStorage.getItem('todolist'))){
    todoLists = JSON.parse(localStorage.getItem('todolist'));

    let index = 0;
    todoLists.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = `
        <div class="round-checkbox">
            <input type="checkbox" id="checkbox${index}" />
            <label for="checkbox${index}"></label>
        </div>
        <input type="text" value="${element}" disabled>
        <button id="edit" class="todo__list__edit">Edit</button>
        <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
        todoList.appendChild(li);

        index++;
    });

    document.querySelector('.todo__list__footer--items-left').textContent = `${todoLists.length} items left`;
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
    li.innerHTML = `
    <div class="round-checkbox">
        <input type="checkbox" id="checkbox${todoLists.length}" />
        <label for="checkbox${todoLists.length}"></label>
    </div>
    <input type="text" value="${createTxt.value}" disabled>
    <button id="edit" class="todo__list__edit">Edit</button>
    <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
    
    if(createTxt.value === '')
        createTxt.classList.add('create-txt--invalid');
    else{
        todoList.appendChild(li);
        todoLists.push(createTxt.value);
        localStorage.setItem('todolist', JSON.stringify(todoLists));
        createTxt.value = '';
        document.querySelector('.todo__list__footer--items-left').textContent = `${todoLists.length} items left`;
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

let bool;
document.addEventListener('click', function(e){
    
    let thatVal, that;
    let nodeIndex = liElem => [...liElem.parentNode.children].indexOf(liElem);

    if(hasClass(e.target, 'todo__list__delete')){
        e.preventDefault();

        todoLists.splice(nodeIndex(e.target.parentNode), 1);
        localStorage.setItem('todolist', JSON.stringify(todoLists));
        e.target.parentNode.remove();
        document.querySelector('.todo__list__footer--items-left').textContent = `${todoLists.length} items left`;
    }else if(hasClass(e.target, 'todo__list__edit')){
        e.preventDefault();
        let that = e.target;
            thatVal = that.previousElementSibling.value;

        ['todo__list__edit', 'todo__list__save'].map(v=> that.classList.toggle(v) )
        that.textContent = `Save`;
        that.previousElementSibling.toggleAttribute('disabled');
        that.previousElementSibling.focus();

        var len = thatVal.length;
              
        if (that.previousElementSibling.setSelectionRange) {
            that.previousElementSibling.focus();
            that.previousElementSibling.setSelectionRange(len, len);
        }

    }else if(hasClass(e.target, 'todo__list__save')){
        e.preventDefault();
        let that = e.target;

        ['todo__list__edit', 'todo__list__save'].map(v=> that.classList.toggle(v) )
        that.textContent = `Edit`;
        that.previousElementSibling.toggleAttribute('disabled');

        if(thatVal !== that.previousElementSibling.value){
            todoLists[nodeIndex(that.parentNode)] = that.previousElementSibling.value;
            localStorage.setItem('todolist', JSON.stringify(todoLists));
        }
    }else if(hasClass(e.target, 'todo__dark-mode')){
        that = e.target;
        bool = !(localStorage.darkMode === 'true' ? true : false);
        localStorage.setItem('darkMode', bool);
        this.body.classList.toggle('dark-mode');
        ['fa-moon', 'fa-sun'].map(v=> that.classList.toggle(v) )

    }
});
bool = localStorage.darkMode === 'true' ? true : false;
if(bool){
    document.body.classList.toggle('dark-mode');
    ['fa-moon', 'fa-sun'].map(v=> document.querySelector('.todo__dark-mode').classList.toggle(v) )
}