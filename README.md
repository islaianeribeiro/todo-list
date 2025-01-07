# Lista de Tarefas - Descrição do script

Esse script implementa uma aplicação simples de **lista de tarefas (To-Do list)** usando **JavaScript** e **localStorage** para armazenar os dados de tarefas de forma persistente:

### 1. **Selecionando elementos da página:**

```javascript
const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");
const noTasksMessage = document.querySelector("#no-tasks-message");
```

-   **`form`**: Seleciona o formulário para adicionar uma nova tarefa.
-   **`taskTitleInput`**: Seleciona o campo de entrada de texto onde o usuário insere o título da tarefa.
-   **`todoListUl`**: Seleciona o `<ul>` onde as tarefas serão listadas.
-   **`noTasksMessage`**: Seleciona a `div` que contém uma mensagem informando ao usuário que não há tarefas, que será exibida quando a lista estiver vazia.

### 2. **Inicializando o array de tarefas:**

```javascript
let tasks = []; // [{title: 'Tarefa 1', done: false}, ...]
```

-   **`tasks`**: Um array que vai armazenar as tarefas. Cada tarefa é representada como um objeto com um título (`title`) e um status de conclusão (`done`).

### 3. **Função `renderTaskOnHtml`:**

```javascript
function renderTaskOnHtml(taskTitle, done = false) {
    const li = document.createElement("li");
    ...
}
```

Essa função é responsável por criar e exibir uma nova tarefa na página HTML. Ela recebe o **título da tarefa** e o **status de conclusão** (com valor padrão `false`).

#### Passos dentro de `renderTaskOnHtml`:

-   **Criação de elementos HTML**:

    -   **`li`**: Cria um item de lista (`<li>`), onde a tarefa será colocada.
    -   **`input`**: Cria um campo de **checkbox** que permite marcar a tarefa como concluída ou não.
    -   **`span`**: Cria um **span** para exibir o título da tarefa.
    -   **`button`**: Cria um botão para excluir a tarefa, com um ícone SVG de "lixeira".

-   **Marcação da tarefa como concluída**:

    -   Se a tarefa for concluída (`done = true`), a linha do texto (`span`) recebe um estilo de **riscado** (`text-decoration: line-through`).
    -   Se o **checkbox** for marcado ou desmarcado, o evento **`change`** altera o estilo do texto e o status da tarefa no array `tasks`, e o status é salvo novamente no `localStorage`.

-   **Excluir tarefa**:

    -   Quando o botão de excluir é clicado, a tarefa é removida da lista (`tasks`) e do HTML. O **localStorage** também é atualizado.

-   **Atualizando a visibilidade da mensagem "sem tarefas"**:
    -   A função `toggleNoTasksMessage` verifica se o array `tasks` está vazio e, se for, exibe a mensagem "não há tarefas". Caso contrário, oculta a mensagem.

### 4. **Função `toggleNoTasksMessage`:**

```javascript
function toggleNoTasksMessage() {
    if (tasks.length === 0) {
        noTasksMessage.style.display = "flex"; // Exibe a mensagem
    } else {
        noTasksMessage.style.display = "none"; // Oculta a mensagem
    }
}
```

Essa função alterna a visibilidade da mensagem de "sem tarefas", com base no número de tarefas armazenadas.

### 5. **Carregando tarefas do `localStorage`:**

```javascript
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
```

-   Ao carregar a página, o script verifica se existem tarefas salvas no `localStorage`.
-   Se houver tarefas, elas são recuperadas, transformadas de volta em objetos JavaScript com `JSON.parse()`, e renderizadas na tela através da função `renderTaskOnHtml`.
-   A visibilidade da mensagem "sem tarefas" também é verificada.

### 6. **Adicionando nova tarefa:**

```javascript
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
```

-   Ao submeter o formulário, a função **`submit`** é acionada.
-   O comportamento padrão do formulário (que recarregaria a página) é impedido com `event.preventDefault()`.
-   Se o título da tarefa for válido (com pelo menos 3 caracteres), ele é adicionado ao array `tasks` e salvo no `localStorage`.
-   A nova tarefa é renderizada na tela com a função `renderTaskOnHtml`.
-   O campo de entrada é limpo após adicionar a tarefa.

### **Fluxo geral do script:**

1. O usuário adiciona uma tarefa pelo formulário.
2. A tarefa é armazenada no **array `tasks`** e no **localStorage**.
3. A tarefa é renderizada na página.
4. O usuário pode marcar a tarefa como concluída, o que altera seu estilo e atualiza o **status** no array e no **localStorage**.
5. O usuário pode excluir a tarefa, removendo-a do HTML e do array, e também atualizando o **localStorage**.

Esse script oferece uma funcionalidade básica para criar, listar, marcar como concluída e excluir tarefas, além de garantir que as tarefas persistam mesmo após o fechamento do navegador.
