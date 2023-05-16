"use starict";

/****************************************
          GLOBALS
****************************************/

const todoAddBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo--list");
const footer = document.querySelector(".footer");
const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];

/****************************************
          Functions
****************************************/

const saveTodo = (allTodos) => {
  const todoInputBar = document.getElementById("todo--input");
  allTodos.push({ item: todoInputBar.value, isComplete: false });
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
  todoInputBar.value = "";
  displayTodos(allTodos);
};

const displayTodos = (todos) => {
  todos.length === 0
    ? (todoList.innerHTML = "No Todos Yet!!!")
    : (todoList.innerHTML = "");
  todos.map((todo, index) => {
    const addATodo = `
         <li id=${index}>
            <div>
              <input type="checkbox" data-action='check'></input>
              <p class=${
                todo.isComplete ? "complete" : "active"
              } data-action='check'>${todo.item}</p>
            </div>

            <button class="delete--btn" data-action='delete'>Delete</button>
          </li>
        `;

    todoList.insertAdjacentHTML("afterbegin", addATodo);
  });

  todoInfo(); // display info in regards to the remaining todos and completed todos
};

// function for displaying completed and remaining Todos
function todoInfo() {
  const numRemaining = document.querySelector(".num--remaining");
  const numCompleted = document.querySelector(".num--completed");

  const remainingTodos = activeTodos(allTodos);
  const completed1 = completedTodos(allTodos);

  numRemaining.innerHTML = remainingTodos.length;
  numCompleted.innerHTML = completed1.length;
}

function markTodoComplete(todoId) {
  allTodos.forEach((todo, index) =>
    index === todoId ? (todo.isComplete = !todo.isComplete) : todo.isComplete
  );
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
  displayTodos(allTodos);
}

function deleteTodo(todoId) {
  allTodos.splice(todoId, 1);
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
  displayTodos(allTodos);
}

function completedTodos(allTodos) {
  const completedTodos = allTodos.filter((todo) => todo.isComplete === true);
  return completedTodos;
}

function activeTodos(allTodos) {
  const activeTodos = allTodos.filter((todo) => todo.isComplete === false);
  return activeTodos;
}

/****************************************
 * Event Listners
 ****************************************/

todoAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveTodo(allTodos);
});

todoList.addEventListener("click", (e) => {
  const target = e.target;
  const id = Number(target.closest("li").id);
  const action = target.dataset.action;

  action === "check" && markTodoComplete(id);
  action === "delete" && deleteTodo(id);
});

footer.addEventListener("click", (e) => {
  const target = e.target;
  const action = target.dataset.action;

  //
  const completed = completedTodos(allTodos);
  const active = activeTodos(allTodos);

  //
  action === "show-complete" && displayTodos(completed);
  action === "show-active" && displayTodos(active);
  action === "show-all" && displayTodos(allTodos);
});

window.addEventListener("DOMContentLoaded", () => {
  displayTodos(allTodos);
});
