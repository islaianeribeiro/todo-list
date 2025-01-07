const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");
const noTasksMessage = document.querySelector("#no-tasks-message"); // A div com a mensagem

let tasks = []; // [{title: 'Tarefa 1', done: false}, ...]

function renderTaskOnHtml(taskTitle, done = false) {
    const li = document.createElement("li");

    const input = document.createElement("input"); // <input />
    input.setAttribute("type", "checkbox"); // <input type='checkbox' />
    input.addEventListener("change", (event) => {
        const liToToggle = event.target.parentElement;

        const spanToToggle = liToToggle.querySelector("span");

        const done = event.target.checked;
        if (done) {
            spanToToggle.style.textDecoration = "line-through";
        } else {
            spanToToggle.style.textDecoration = "none";
        }

        tasks = tasks.map((t) => {
            if (t.title === spanToToggle.textContent) {
                return {
                    title: t.title,
                    done: !t.done,
                };
            }

            return t;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    input.checked = done;

    const span = document.createElement("span"); // <span></span>
    span.textContent = taskTitle; // Adicionando a tarefa no span
    if (done) {
        span.style.textDecoration = "line-through";
    }

    const button = document.createElement("button"); // <button></button>
    button.innerHTML = `
         <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                >
                    <rect width="256" height="256" fill="none"></rect>
                    <line
                        x1="216"
                        y1="56"
                        x2="40"
                        y2="56"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                    ></line>
                    <line
                        x1="104"
                        y1="104"
                        x2="104"
                        y2="168"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                    ></line>
                    <line
                        x1="152"
                        y1="104"
                        x2="152"
                        y2="168"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                    ></line>
                    <path
                        d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                    ></path>
                    <path
                        d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                    ></path>
                </svg>
    `; // Adicionou o conteúdo do botão.

    button.addEventListener("click", (event) => {
        // const liToRemove = event.target.parentElement;
        const liToRemove = event.target.closest("li");

        const titleToRemove = liToRemove.querySelector("span").textContent; // Tarefa 1

        tasks = tasks.filter((t) => t.title !== titleToRemove);

        todoListUl.removeChild(liToRemove);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Atualizando a visibilidade da mensagem
        toggleNoTasksMessage();
    });

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    todoListUl.appendChild(li);

    // Atualizando a visibilidade da mensagem
    toggleNoTasksMessage();
}

function toggleNoTasksMessage() {
    if (tasks.length === 0) {
        noTasksMessage.style.display = "flex"; // Exibe a mensagem
    } else {
        noTasksMessage.style.display = "none"; // Oculta a mensagem
    }
}

window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem("tasks");

    if (!tasksOnLocalStorage) return;

    tasks = JSON.parse(tasksOnLocalStorage);

    tasks.forEach((t) => {
        renderTaskOnHtml(t.title, t.done);
    });

    // Verificar se há tarefas ao carregar
    toggleNoTasksMessage();
};

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarrecar a página ao submeter o formulário

    const taskTitle = taskTitleInput.value;

    if (taskTitle.length < 3) {
        alert("Sua tarefa precisa de pelo menos 3 caracteres.");
        return;
    }

    // Adicionando a nova tarefa no array
    tasks.push({
        title: taskTitle,
        done: false,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Adicionando a nova tarefa no HTML
    renderTaskOnHtml(taskTitle);

    taskTitleInput.value = "";
});
