const listContainer = document.getElementById('List');
const inputBox = document.getElementById('input');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');

// Initialize tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    inputBox.value = '';
    saveAndRender();
}

// Add task on Enter key
inputBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveAndRender();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function clearAll() {
    if (tasks.length === 0) return;
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        saveAndRender();
    }
}

function updateCounter() {
    totalCount.textContent = tasks.length;
    completedCount.textContent = tasks.filter(t => t.completed).length;
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateCounter();
}

function renderTasks() {
    listContainer.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('check');
        li.onclick = () => toggleTask(task.id);

        const span = document.createElement('span');
        span.textContent = '\u00d7';
        span.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        };

        li.appendChild(span);
        listContainer.appendChild(li);
    });
}


renderTasks();
updateCounter();
