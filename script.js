

// Selecting the input field with the class "task-input" and tag name "input"
const taskInput = document.querySelector(".task-input input"),

// Selecting all elements with the tag name "span" under elements with the class "filters"
filters = document.querySelectorAll(".filters span"),

// Selecting an element with the class "clear-btn"
clearAll = document.querySelector(".clear-btn"),

// Selecting an element with the class "task-box"
taskBox = document.querySelector(".task-box");

let editId,           // Declaration of a variable named 'editId' (possibly used for tracking the ID of the task being edited)
    isEditTask = false,  // Declaration and initialization of a variable named 'isEditTask' with a value of false
    todos = JSON.parse(localStorage.getItem("todo-list"));  // Declaration and initialization of a variable named 'todos' by retrieving and parsing data from local storage


    function showTodo(filter) {
        // Declare a variable to store HTML string
        let liTag = "";
    
        // Check if 'todos' array is defined and not empty
        if (todos) {
            // Iterate over each 'todo' in 'todos' array along with its index 'id'
            todos.forEach((todo, id) => {
                // Determine if the task is completed and set the 'completed' variable accordingly
                let completed = todo.status == "completed" ? "checked" : "";
    
                // Check if the task matches the specified filter or the filter is set to "all"
                if (filter == todo.status || filter == "all") {
                    // Construct the HTML string for the task and append it to 'liTag'
                    liTag += `<li class="task">
                                <label for="${id}">
                                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                    <p class="${completed}">${todo.name}</p>
                                </label>
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                    <ul class="task-menu">
                                        <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                        <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </li>`;
                }
            });
        }
    
        // Set the innerHTML of 'taskBox' with the constructed HTML string or a message if no tasks
        taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    
        // Select all elements with class "task" inside 'taskBox'
        let checkTask = taskBox.querySelectorAll(".task");
    
        // If there are no tasks, remove the "active" class from 'clearAll'; otherwise, add the "active" class
        !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    
        // If the height of 'taskBox' is greater than or equal to 300, add the "overflow" class; otherwise, remove it
        taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
    }
    