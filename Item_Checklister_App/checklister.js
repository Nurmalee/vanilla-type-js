const checklisterForm = document.querySelector(".checklister-form");
const formInputField = document.querySelector("input");
const list = document.querySelector("ul");
const listContainer = document.querySelector(".list-container");
const clearListBtn = document.querySelectorAll(".btn")[1];
const todoItemCompleteBtn = document.querySelectorAll(".complete");
const todoItemDeleteBtn = document.querySelectorAll(".delete");
const todoItemEditBtn = document.querySelectorAll(".edit");
const listItemCount = document.querySelector("#list-item-count");
const addBtn = document.querySelector(".add-btn");

window.addEventListener('load', () => {
    countListItem()
    formInputField.focus()
    // setInterval(() => {
    //     addBtn.classList.toggle('brown-bg')
    // }, 1000)
    // listContainer.classList.remove('remove-container')
})

let editedItem
let isEditing = false

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
        taskName: 'Test The Implementation Of React Router'
    },
    {
        id: 6,
        taskName: 'recreate my original youtube clone with react'
    }
]

const defaultChecklist = defaultList.map(listItem => {
    const {id, taskName} = listItem 
    return (
        listItemHTMLMarkUp(taskName, id)
    )
})

// list.innerHTML = defaultChecklist.join('')

checklisterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    list.classList.remove("faded")
    
    const id = new Date().getTime().toString()
    if(formInputField.value  && !isEditing){
        const newListItem = listItemHTMLMarkUp(formInputField.value, id)
        list.insertAdjacentHTML("afterbegin", newListItem)
        listContainer.classList.remove('remove-container')
        indicatorContext('item added')
    } else if (formInputField.value && isEditing) {
        editedItem.innerText = formInputField.value
        isEditing = false
        indicatorContext('item edited') 
    } else {
        indicatorContext("can't process empty value")
    }
  
    resetDefaultSettings()
    countListItem()
})

todoItemCompleteBtn.forEach(btn => {
    btn.addEventListener('click', () => completeTodoItem(btn))
})

todoItemDeleteBtn.forEach(btn => {
    btn.addEventListener('click', () => deleteTodoItem(btn))
})

clearListBtn.addEventListener('click', () => {
    const alert = prompt('ARE YOU SURE YOU WANT TO DELETE THE LIST? IF YES, TYPE "yes"')
    if(alert.includes('yes') || alert.includes('YES')){
        fadeOut(list)
    }
    indicatorContext('list cleared')
})

const completeTodoItem = (item) => {
    const currentListItem = item.parentElement.parentElement
    currentListItem.classList.toggle('completed')
}

const deleteTodoItem = (item) => {
    const currentListItem = item.parentElement.parentElement
    fadeOut(currentListItem)
    resetDefaultSettings()
    indicatorContext('item deleted')
}

const editTodoItem = (item) => {
    const currentListItem = item.nextElementSibling
    formInputField.value = currentListItem.innerText
    formInputField.focus()
    editedItem = currentListItem
    isEditing = true
    addBtn.innerText = 'edit'
}

const countListItem = () => {
    listItemCount.innerHTML = list.children.length
}

const fadeOut = (target) => {
    const todoItems = document.querySelectorAll(".todo-item");
    target.classList.add("faded")
    setTimeout(() => {
        if(target === list){
            todoItems.forEach(todoItem => {
                target.removeChild(todoItem)
            })
            // target.innerHTML = ""
            listContainer.classList.add('remove-container')
        } else {
            list.removeChild(target)
            // target.remove()
            if(list.children.length === 0){
                listContainer.classList.add('remove-container')
                indicatorContext('list cleared')
            }
        }
        // target === todoList ? (target.innerHTML = "") : target.remove()
        countListItem()
    }, 1000)
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

const resetDefaultSettings = () => {
    addBtn.innerText = 'add'
    formInputField.value = ''
    formInputField.focus()
    isEditing = false
}

const indicatorContext = (displayText) => {
    indicator.classList.remove('hide-indicator')
    indicator.textContent = displayText
    setTimeout(() => {
        indicator.textContent = ''
        indicator.classList.add('hide-indicator')
    }, 1000)
}