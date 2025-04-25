


// Este código se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM cargado');

    // Obtenemos los elementos del DOM
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');

    const btn = document.getElementById('add');
    let id = 1;
    // Obtenemos el botón de agregar y la tabla

    function addTodo() {
        console.log('agregar todo');
        console.log(title.value);
        console.log(description.value);

        if (title.value === '' || description.value === '') {
            alert.classList.remove('d-none');
            alert.innerText = 'Por favor, completa todos los campos';
            return;
        }

        alert.classList.add('d-none');
        const row = table.insertRow();
        row.setAttribute('id', id++);
        row.innerHTML = `
        <td>${title.value}</td>
        <td>${description.value}</td>
        <td class="text-center">
          <input type="checkbox">
        </td>
        <td class="text-right">
            <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-danger mb-1">
                <i class="fa fa-trash"></i>
            </button>
        </td>`;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = function (e) {
            removeTodo(row.getAttributes('id'));
        }
        row.children[3].appendChild(removeBtn);
    }
    btn.onclick = addTodo;
});




// btn.addEventListener('click', () => {
//     console.log('boton agregar');
// })