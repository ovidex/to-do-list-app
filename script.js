document.addEventListener('DOMContentLoaded', () => {
    // Load items from cookies when the page loads
    loadTodos();

    // Add event listener for form submission
    document.getElementById('todo-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const todoInput = document.getElementById('todo-input');
        const todoText = todoInput.value.trim();

        if (todoText !== '') {
            addTodoItem(todoText);
            todoInput.value = '';
            saveTodos(); // Save the list to cookies
        }
    });

    // Add a new item to the list
    function addTodoItem(text) {
        const todoList = document.getElementById('todo-list');
        const todoItem = document.createElement('li');

        const todoSpan = document.createElement('span');
        todoSpan.textContent = text;
        todoSpan.classList.add('todo-text');
        todoItem.appendChild(todoSpan);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update');
        updateButton.addEventListener('click', function() {
            const newText = prompt('Update your task:', todoSpan.textContent);
            if (newText !== null && newText.trim() !== '') {
                todoSpan.textContent = newText.trim();
                saveTodos(); // Save the list to cookies
            }
        });
        buttonsDiv.appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', function() {
            todoList.removeChild(todoItem);
            saveTodos(); // Save the list to cookies
        });
        buttonsDiv.appendChild(deleteButton);

        todoItem.appendChild(buttonsDiv);
        todoList.appendChild(todoItem);
    }

    // Save the current list of to-dos to cookies
    function saveTodos() {
        const todoList = document.getElementById('todo-list');
        const todos = Array.from(todoList.children).map(li => li.querySelector('.todo-text').textContent);
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))};path=/`;
    }

    // Load the list of to-dos from cookies
    function loadTodos() {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const todoCookie = cookies.find(cookie => cookie.startsWith('todos='));
        if (todoCookie) {
            const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
            todos.forEach(todo => addTodoItem(todo));
        }
    }
});
