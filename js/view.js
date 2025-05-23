import AddTodo from "./components/add-todo.js";    
import Filters from "./components/filters.js";
import Modal from "./components/modal.js";
export default class View{
    constructor(){  
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.filters = new Filters();
        this.modal = new Modal();

        this.addTodoForm.onClick ((title, description ) => this.addTodo(title, description));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
        document.getElementById('clear-filters').onclick = () => this.clearFilters();
    }
    setModel(model){
        this.model = model;
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach(todo => {
            this.createRow(todo);
        });
    }

    filter(filters){
        const {type, words} = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            const [title, description,completed] = row.children;
            let shouldHide = false;

            if (words){
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }
            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;
            if (type !== 'all' && shouldBeCompleted !== isCompleted){
                shouldHide = true;
            }
            if (shouldHide){
            row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
        }
    }
    
    addTodo(title, description){
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);

    }
    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    editTodo(id, values){
        this.model.editTodo(id, values);
        const row = document.getElementById(id);

        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }
    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">
          
        </td>
        <td class="text-right">
            <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-danger mb-1">
                <i class="fa fa-trash"></i>
            </button>
        </td>`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues(todo);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }

    clearFilters() {
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            row.classList.remove('d-none'); // Muestra todas las filas
        }
        document.getElementById('filters').reset(); // Resetea el formulario de filtros
    }
}