export default class Filters {
    constructor() {
        this.form = document.getElementById('filters');
        this.btn = document.getElementById('search'); // Asegúrate de que el botón tenga el ID 'search'
    }
    onClick(callback) {
        this.btn.onclick = (e) => {
            e.preventDefault(); // Asigna el evento al botón real
           const data = new FormData(this.form);
            callback({
            type: data.get('type'),
            words: data.get('words'),
           })
        };
    }
}
