if (document.readyState !== "loading") {
    initializeCode();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCode();
    });
  }
  
  function initializeCode() {
    document.onLoad = onLoad();

}

function onLoad() {
    const token = localStorage.getItem('auth_token');
    console.log(token);

    if (!token) return;
    fetch('/', {
        method: 'POST',
        headers: {
            'authorization': 'Bearer ' + token
        }
    })
    .then((response) => response.text())
    .then((value) => {
        document.getElementById('content').innerHTML = value;
        
        fetch ('/api/todos', {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((data) => {
            let todoList = document.getElementById('todo-list');
            let todoItems = data.todos.items;

            if (todoItems.length != 0) {
                todoItems.forEach((item) => {
                    let li = document.createElement('li');
                    li.innerHTML = item;
                    todoList.appendChild(li);
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .then(() => {
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('auth_token');
            window.location.href = '/';
        });
        document.getElementById('add-item').addEventListener('keypress', addTodo);
    })
    .catch((error) => {
        console.log(error);
    });

    fetch('/api/todos', {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + token
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.todos.items);
    })
    .catch((error) => {
        console.log(error);
    });

}


function addTodo(event) {
    const token = localStorage.getItem('auth_token');
    const todo = document.getElementById('add-item').value;


    if (event.keyCode === 13) {
        event.preventDefault();

        console.log(todo)
        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: [todo]})
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.todos.items);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}