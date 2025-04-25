export default class AddTodo {
    constructor() {
        this.btn = document.getElementById('add'); // Asegúrate de que el botón tenga el ID 'add'
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
    }

    onClick(callback) {
        this.btn.onclick = () => { // Asigna el evento al botón real
            if (this.title.value === '' || this.description.value === '') {
                console.error('Por favor, completa todos los campos');
            } else {
                callback(this.title.value, this.description.value);
            }
        };
    }
}