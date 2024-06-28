const taskInput = document.getElementById('input-text');
const dateInput = document.getElementById('input-date');
const addTaskButton = document.getElementById('add-task');
const clearInputButton = document.getElementById('clear-input');
const taskList = document.getElementById('task-list');
const completedTaskList = document.getElementById('Completed-task');
const oldTaskList = document.getElementById('old-task');
let focusBtn = document.getElementById('focus-btn')
let refreshBtn = document.getElementById('refresh-btn')
let errorMsg = document.getElementById("error-msg")
let searchBtn = document.getElementById("search-btn")
let searchInpBtn = document.getElementById("searchInpBtn")
let progressBar = document.getElementById("progressBar")
let tasks = [];

focusBtn.addEventListener("click", () => {
    taskInput.style.display = "none"
    dateInput.style.display = "none"
    addTaskButton.style.display = "none"
    clearInputButton.style.display = "none"
})
refreshBtn.addEventListener('click', () => {
    window.location.reload()

})
searchBtn.addEventListener('click', () => {
    taskInput.style.display = "none";
    dateInput.style.display = "none";
    addTaskButton.style.display = "none";
    searchInpBtn.style.display = "block";
    clearInputButton.style.color = "black";
    searchInpBtn.focus();
});

// console.log(tasks);
addTaskButton.addEventListener('click', () => {

    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText.length === 0 && taskDate === "") {
        taskInput.style.borderColor = "red";
        dateInput.style.borderColor = "red";
        errorMsg.style.display = "block"
        return;
    } else if (taskText.length === 0 && taskDate !== "") {
        taskInput.style.borderColor = "red";
        errorMsg.style.display = "block"
        return;
    } else if (taskText.length !== 0 && taskDate === "") {
        dateInput.style.borderColor = "red";
        errorMsg.style.display = "block"
        return;
    }
    else {
        taskInput.style.borderColor = ""
        dateInput.style.borderColor = ""
        errorMsg.style.display = "none"

    }

    const task = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        completed: false
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = '';
    dateInput.value = '';

});

clearInputButton.addEventListener('click', () => {
    taskInput.value = '';
    dateInput.value = '';
    searchInpBtn.value = '';
});

function renderTasks() {
    taskList.innerHTML = '';
    oldTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    const now = new Date();
    let completedCount = 0;

    tasks.forEach(task => {
        console.log("task", task);
        let button
        if (task.completed) {
            button = "fa-solid fa-check mt-2"
        } else {
            button = "fa-solid fa-pen-to-square badge bg-light text-black p-2"
        }
        taskElement = document.createElement('div');
        taskElement.className = 'd-flex justify-content-around  border-bottom p-2 border-secondary';
        taskElement.innerHTML = `<p onClick="handleClick(${task.id})">${task.text} </p> <span> ${task.date}</span>
                <div>
                    <i class="${button}" style="cursor: pointer;"></i>
                    <i class="fa-solid fa-trash badge bg-light text-black p-2 ms-5" onclick="deleteTask(${task.id})" style="cursor: pointer;"></i>
                </div>
            `;

        console.log(task.completed);
        if (task.completed) {
            // console.log(task.text);
            taskList.appendChild(taskElement);
            completedCount++;
            // console.log(completedCount);
        } else {
            taskList.appendChild(taskElement);
        }

        const progressValue = document.getElementById('progressValue');
        const totalTasks = tasks.length;
        const progressPercentage = totalTasks > 0 ? Math.floor((completedCount / totalTasks) * 100) : 0;
        progressValue.textContent = `${progressPercentage}% tasks`;

        const progress = document.getElementById('progress')
        if (progressPercentage > 75) {
            progress.className = 'fa-solid fa-battery-full ms-2';
        } else if (progressPercentage <= 75 && progressPercentage >= 50) {
            progress.className = 'fa-solid fa-battery-half ms-2';
        } else if (progressPercentage < 50 && progressPercentage >= 0) {
            progress.className = 'fa-solid fa-battery-quarter ms-2';
        } else {
            progress.className = 'fa-solid fa-battery-empty ms-2';
        }
    });

    tasks.forEach(el => {
        const taskElements = document.createElement('div');
        taskElements.className = 'd-flex justify-content-between align-items-center border-secondary p-2';
        taskElements.innerHTML = `<span>${el.text} </span>  <span> ${el.date}</span> `;
        if (el.completed) {
            completedTaskList.appendChild(taskElements)
        }
        // console.log("completedList" + taskElements);
    })

    tasks.forEach(el => {
        let date = new Date(el.date)
        let oldTask = date < now.setHours(0, 0, 0, 0)
        const taskElements = document.createElement('div');
        taskElements.className = 'd-flex justify-content-between align-items-center border-secondary p-2';
        taskElements.innerHTML = `<span>${el.text} </span>  
        <span> ${el.date}</span> `;
        if (oldTask) {
            oldTaskList.appendChild(taskElements)
        }

    })
}

function renderFilteredTasks(e) {
    taskList.innerHTML = '';
    oldTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    const now = new Date();
    let completedCount = 0;

    e.forEach(task => {
        let button = task.completed ? "fa-solid fa-check mt-2" : "fa-solid fa-pen-to-square badge bg-light text-black p-2";
        const taskElement = document.createElement('div');
        taskElement.className = 'd-flex justify-content-around  p-2 border-secondary';
        taskElement.innerHTML = `<p onClick="handleClick(${task.id})">${task.text} </p> <span> ${task.date}</span>
                <div>
                    <i class="${button}" onclick="editTask(${task.id})" style="cursor: pointer;"></i>
                    <i class="fa-solid fa-trash badge bg-light text-black p-2 ms-5" onclick="deleteTask(${task.id})" style="cursor: pointer;"></i>
                </div>
            `;
        if (task.completed) {
            taskList.appendChild(taskElement);
            completedCount++;
        } else {
            taskList.appendChild(taskElement);
        }
    });

    e.forEach(el => {
        const taskElements = document.createElement('div');
        taskElements.className = 'd-flex justify-content-between align-items-center border-secondary p-2';
        taskElements.innerHTML = `<span>${el.text} </span>  <span> ${el.date}</span> `;
        if (el.completed) {
            completedTaskList.appendChild(taskElements)
        }
    })

    e.forEach(el => {
        let date = new Date(el.date)
        let oldTask = date < now.setHours(0, 0, 0, 0)
        const taskElements = document.createElement('div');
        taskElements.className = 'd-flex justify-content-between align-items-center border-secondary p-2';
        taskElements.innerHTML = `<span>${el.text} </span>  
        <span> ${el.date}</span> `;
        if (oldTask) {
            oldTaskList.appendChild(taskElements)
        }
    })
}

function toggleCompletion(id) {
    const task = tasks.find(t => t.id === id);
    const comp_Task = task.completed
    if (task) {
        task.completed = true;
        renderTasks();

    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        taskInput.value = task.text;
        dateInput.value = task.date;
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

renderTasks();

handleClick = function (id) {
    // console.log("clicked");
    const task = tasks.find(t => t.id === id);
    task.completed = true
    renderTasks();
}

editTask = function (id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        taskInput.value = task.text;
        dateInput.value = task.date;
        tasks = tasks.filter(t => t.id === id);
        renderTasks();
    }
}

deleteTask = function (id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function searchTask(text) {
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(text.toLowerCase()));
    renderFilteredTasks(filteredTasks);
}