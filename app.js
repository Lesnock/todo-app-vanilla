const typer = document.querySelector('.typer')
const taskList = document.querySelector('.tasks')

getTasksFromSave()

typer.addEventListener('keyup', event => {
  if (event.code == 'Enter' || event.code == 'NumpadEnter') {
    add(event.target.value)
    cleanTyper()
  }
})

function getTasksFromSave() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  tasks.forEach(task => add(task))
}

function cleanTyper() {
  typer.value = ''
}

function add(task) {
  const li = document.createElement('li')
  li.classList.add('task')
  li.innerHTML = `
    ${task}
    <img class="delete-icon" src="./trash-can-solid.svg" alt="Delete icon" onclick="deleteTask(this.parentElement)">
  `
  taskList.appendChild(li)
  save()
}

function deleteTask(task) {
  task.classList.add('removing')
  setTimeout(() => {
    task.remove()
    save()
  }, 500)
}

function save() {
  let tasks = []
  taskList.querySelectorAll('.task').forEach(task => {
    tasks.push(task.innerText)
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
