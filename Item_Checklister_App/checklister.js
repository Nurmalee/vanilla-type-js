const checklisterForm = document.querySelector(".checklister-form");
const formInputField = document.querySelector("input");
const list = document.querySelector("ul");
const listContainer = document.querySelector(".list-container");
const clearListBtn = document.querySelectorAll(".clear-btn");
const todoItemCompleteBtn = document.querySelectorAll(".complete");
const todoItemDeleteBtn = document.querySelectorAll(".delete");
const todoItemEditBtn = document.querySelectorAll(".edit");
const addBtn = document.querySelector(".add-btn");

setInterval(() => {
    addBtn.classList.toggle('brown-bg')
}, 1000)

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
        `<li class="todo-item" data-id='${id}'>
            <div>
                <button class="edit"> <i class="fas fa-pencil-alt"></i> </button>
                <p> ${taskName} </p>
            </div> 
            <div> 
                <button class="complete"> <i class="fas fa-check"></i> </button>
                <button class="delete"> <i class="fas fa-eraser"></i> </button>
            </div>
        </li>`
    )
})

list.innerHTML = defaultChecklist.join('')