
document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to display tasks
    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Add a new task
    addTaskBtn.addEventListener("click", function() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            displayTasks();
        }
    });

    // Edit or delete a task
    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            const index = e.target.getAttribute("data-index");
            const updatedTask = prompt("Edit Task:", tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
            }
        } else if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this task?")) {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
            }
        }
    });

    // Initial display of tasks
    displayTasks();
});