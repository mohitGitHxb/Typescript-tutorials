import "./style.css";

interface Todo {
  readonly id: string;
  title: string;
  isCompleted: boolean;
}
const todos: Array<Todo> = [];

const todoContainer = document.querySelector(".todoContainer")!;

const todoInput = document.getElementsByName("todo")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: Math.random().toString(16).slice(2),
  };

  todos.push(todo);
  todoInput.value = "";
  console.log(todos);
  // render all todos
  renderTodo(todos);
};



function deleteTodo(id:string){
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  renderTodo(todos);
}



const renderTodo = (todos: Todo[]) => {
  todoContainer.textContent = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div") as HTMLDivElement;
    const title = document.createElement("h2") as HTMLHeadingElement;
    const id = document.createElement("p") as HTMLParagraphElement;
    const status = document.createElement("p") as HTMLParagraphElement;
    const checkBox = document.createElement("input") as HTMLInputElement;
    const deleteButton = document.createElement("button") as HTMLButtonElement;
    const bottomRow = document.createElement("div") as HTMLDivElement;
    
    todoItem.className = "todoItem";
    title.className = "title";
    id.className = "id";
    status.className = "status";
    checkBox.className = "checkBox";
    bottomRow.className = "bottomRow";
    
    title.textContent = todo.title;
    id.textContent = `ID: ${todo.id}`;
    status.textContent = todo.isCompleted ? "Completed" : "Pending";
    deleteButton.textContent = "Delete";
    
    checkBox.checked = todo.isCompleted;
    checkBox.setAttribute("type", "checkbox");

    //event handlers
    deleteButton.onclick = ():void=>{
      deleteTodo(todo?.id);
    }
    checkBox.onchange = ():void=>{
      todo.isCompleted = checkBox.checked;
      status.textContent = checkBox.checked ? "Completed" : "Pending";
    }
    
    todoItem.appendChild(title);
    todoItem.appendChild(bottomRow);
    bottomRow.appendChild(id);
    bottomRow.appendChild(status);
    bottomRow.appendChild(checkBox);
    bottomRow.appendChild(deleteButton);
    todoContainer.appendChild(todoItem);
  });
};

