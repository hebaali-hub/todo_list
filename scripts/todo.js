class Task {
    constructor(text) {
        this.text = text
        this.isCompleted = false
    }
}

class ToDoList {
    constructor(selectedHtmlElement) {
        this.tasks = JSON.parse(window.localStorage.getItem("tasks")) || []
        this.completed = []
        this.toBeDone = []
        this.searchedTask = ''
        this.foundTasks = []
        this.selectedHtmlElement = selectedHtmlElement || document.body
        this.render(this.tasks)
    }

    render(chosenTaskArray) {
        this.selectedHtmlElement.innerHTML = ''
        this.addPromptFormForAddingTasks()
        this.addFilteringButtons()
        this.addListWithTasks(chosenTaskArray)
    }
    //draw task btn +input
    addPromptFormForAddingTasks() {
        const input = document.createElement('input')
        const button = document.createElement('button')
        input.className = 'add-task-input'
        input.autofocus = true
        input.placeholder = 'Add Task'
        button.innerText = 'Add task'
//when click
        button.addEventListener('click', () => this.addTaskToList(input.value))
//when click
        this.selectedHtmlElement.appendChild(input)
        this.selectedHtmlElement.appendChild(button)
    }
//draw task btn +input
//add item to local storage  and add object task  to array tasks
    addTaskToList(text) {
        if (text == '' || text == null) {
            alert("It would be too easy for you :)")
        } else {
            this.tasks.push(new Task(text))
            this.saveTaskInLocalStorage()
        }
        this.render(this.tasks)
    }
    //add item to local storage  and add object task  to array tasks
    addListWithTasks(chosenTaskArray) {
        const ul = document.createElement('ul')
        ul.className = 'todo-list'
        chosenTaskArray.forEach((task, taskIndex) => {
            const li = document.createElement('li')
            const removeTaskButton = document.createElement('div')
            const removeIcon = document.createTextNode("\u00D7")

            li.classList.add('task')
            removeTaskButton.className = 'delete-task-button'

            li.addEventListener('click', (event) => {
                event.target.classList.add('task-completed')
                task.isCompleted = true
                this.saveTaskInLocalStorage()
            })

            removeTaskButton.addEventListener('click', () => {
                ul.removeChild(li)
                this.tasks = this.tasks.slice(0, taskIndex).concat(this.tasks.slice(taskIndex + 1, this.tasks.length))
                this.saveTaskInLocalStorage()
                this.render(this.tasks)
            })

            removeTaskButton.appendChild(removeIcon)
            li.innerText = task.text
            if (task.isCompleted) {
                li.style.textDecoration = "line-through"
                li.style.textDecorationColor = 'green'
            }
            li.appendChild(removeTaskButton)
            ul.appendChild(li)
        })
        this.selectedHtmlElement.appendChild(ul)
    }

    addFilteringButtons() {
        const buttonAllTasks = document.createElement('button')
        const buttonCompletedTasks = document.createElement('button')
        const buttonTasksToBeDone = document.createElement('button')
        buttonAllTasks.innerText = 'All tasks'
        buttonCompletedTasks.innerText = 'Completed tasks'
        buttonTasksToBeDone.innerText = 'To be done'

        buttonAllTasks.addEventListener('click', () => this.render(this.tasks))

        buttonCompletedTasks.addEventListener('click', () => {
            this.completed = this.tasks.filter((task) => task.isCompleted === true)
            this.render(this.completed)
        })
        buttonTasksToBeDone.addEventListener('click', () => {
            this.toBeDone = this.tasks.filter((task) => task.isCompleted === false)
            this.render(this.toBeDone)
        })

        this.selectedHtmlElement.appendChild(buttonAllTasks)
        this.selectedHtmlElement.appendChild(buttonCompletedTasks)
        this.selectedHtmlElement.appendChild(buttonTasksToBeDone)
    }


    saveTaskInLocalStorage() {
        window.localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

}
const todo = new ToDoList()




