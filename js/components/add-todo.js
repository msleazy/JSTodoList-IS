import Alert from "./alert";


export default class AddTodo {
    constructor() {
        this.btn = document.getElementById('add'); // Asegúrate de que el botón tenga el ID 'add'
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');

        this.alert = new Alert('alert'); // Asegúrate de que el alert tenga el ID 'alert'
    }

    onClick(callback) {
        this.btn.onclick = () => { // Asigna el evento al botón real
            if (this.title.value === '' || this.description.value === '') {
                this.alert.show('Please fill in all fields.');
            } else {
                this.alert.hide();
                callback(this.title.value, this.description.value);
            }
        };
    }
}