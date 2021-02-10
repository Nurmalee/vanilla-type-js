const checklisterForm = document.querySelector(".checklister-form");
const formInputField = document.querySelector("input");
const list = document.querySelector("ul");
const listContainer = document.querySelector(".list-container");
const clearListBtn = document.querySelectorAll(".clear-btn");
const todoItemCompleteBtn = document.querySelectorAll(".complete");
const todoItemDeleteBtn = document.querySelectorAll(".delete");
const todoItemEditBtn = document.querySelectorAll(".edit");
const listItemCount = document.querySelector("#list-item-count");
const addBtn = document.querySelector(".add-btn");


window.addEventListener('load', () => {
    countListItem()
    // setInterval(() => {
    //     addBtn.classList.toggle('brown-bg')
    // }, 1000)
    listContainer.classList.remove('remove-container')
})


const defaultList = [
    {
        id: 1,
        taskName: 'build a shopping cart with redux state manager'
    },
    {
        id: 2,
        taskName: 'build a todo list with react and useReducer'
    },
    {
        id: 3,
        taskName: 'rebuild my portfolio site with react'
    },
    {
        id: 4,
        taskName: 'create a website landing page with context API'
    },
    {
        id: 5,
        taskName: 'create a website landing page with context API'
    },
    {
        id: 6,
        taskName: 'create a website landing page with context API'
    }
]

const defaultChecklist = defaultList.map(listItem => {
    const {id, taskName} = listItem 
    return (
        listItemHTMLMarkUp(taskName, id)
    )
})

list.innerHTML = defaultChecklist.join('')

checklisterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const id = new Date().getTime().toString()
    if(formInputField.value){
        const newListItem = listItemHTMLMarkUp(formInputField.value, id)
        list.insertAdjacentHTML("afterbegin", newListItem)
        listContainer.classList.remove('remove-container')
    }
  
    formInputField.value = ''
    formInputField.focus()
    countListItem()
})

const countListItem = () => {
    listItemCount.innerHTML = list.children.length
}

function listItemHTMLMarkUp (dynamicItem, id) {
    return (
        `<li class="todo-item" data-id="${id}">
            <div>
                <button class="edit" onClick={editTodoItem(this)}> <i class="fas fa-pencil-alt"></i> </button>
                <p> ${dynamicItem} </p>
            </div> 
            <div class="actionBtns"> 
                <button class="complete" onClick={completeTodoItem(this)}> <i class="fas fa-check"></i> </button>
                <button class="delete" onClick={deleteTodoItem(this)}> <i class="fas fa-eraser"></i> </button>
            </div>
        </li>`
    )
}