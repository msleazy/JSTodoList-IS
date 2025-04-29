export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));

        if (!this.todos || this.todos.length === 0) {
            // Si no hay todos en localStorage, inicializamos con algunos valores por defecto
            this.todos = [{
                id: 1,
                title: 'Todo 1',
                description: 'Description 1',
                completed: false
                }
            ];
            this.currentId = 1;
        }else
        {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }

        this.currentId = 1;
    }	
    setView(view) {
        this.view = view;
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {
        return this.todos;
    }
    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id){
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }
    addTodo(title, description) {
        const todo = {
            id: this.currentId++,
            title,
            description,
            completed: false
        };
        this.todos.push(todo);
        console.log(this.todos);
        this.save();

        return {...todo}; // Return a copy of the todo object
    }
    removeTodo(id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }
}