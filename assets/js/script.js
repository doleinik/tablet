const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.open('POST', './back/addUsers.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (this.status == 200) {
            form.reset();
            const message = document.querySelector('#message');
            message.classList.add('succseful');
            setTimeout(() => message.classList.remove('succseful'), 2000);
        }
    }
    const formData = new FormData(form);
    const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

    xhr.send(jsonData);
});

const getAllUsers = document.querySelector('#get-all-users');
getAllUsers.addEventListener('click', (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.status === 200) {
            document.querySelector("#users").innerHTML = this.responseText;

            const deleteItems = document.querySelectorAll('.users-item__delete');
            if (deleteItems.length > 0) {
                deleteItems.forEach(item => {
                    item.addEventListener("click", (event) => {
                        deleteItem(item.dataset.id);
                    })
                })
            }

            const updateItems = document.querySelectorAll('.users-item__update');
            if (updateItems.length > 0) {
                updateItems.forEach(item => {
                    item.addEventListener("click", (event) => {
                        editItem(item.dataset.id);
                    })
                })
            }
        }
    }
    xhr.open('POST', './back/getUsers.php');
    xhr.send();
});

function deleteItem(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.status === 200) {
            getAllUsers.click();
        }
    }
    xhr.open('POST', './back/deleteUser.php');
    xhr.send(
        JSON.stringify({
            id: id
        })
    );
}

function updateItem(id, name, surname, position) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.status === 200) {
            saveItem(id);
        }
    }
    xhr.open('POST', './back/updateUser.php');
    xhr.send(
        JSON.stringify({
            id: id,
            name: name,
            surname: surname,
            position: position
        })
    );
}

function editItem(id) {
    const name = document.querySelector(`#user-${id} .users-item__name`);
    replaceTag(name, 'input', 'users-item__name', name.textContent)
    const newName = document.querySelector(`#user-${id} .users-item__name`);

    const surname = document.querySelector(`#user-${id} .users-item__surname`);
    replaceTag(surname, 'input', 'users-item__surname', surname.textContent)
    const newSurname = document.querySelector(`#user-${id} .users-item__surname`);

    const position = document.querySelector(`#user-${id} .users-item__position`);
    replaceTag(position, 'select', 'users-item__position', position.textContent);
    const newPosition = document.querySelector(`#user-${id} .users-item__position`);

    const itemUpdate = document.querySelector(`#user-${id} .users-item__update`);
    itemUpdate.classList.add('hidden');

    const itemDelete = document.querySelector(`#user-${id} .users-item__delete`);
    itemDelete.classList.add('hidden');

    const save = document.querySelector(`#user-${id} .save`);
    save.classList.remove('hidden');
    save.addEventListener("click", (event) => {
        updateItem(id, newName.value, newSurname.value, newPosition.value);
    })
}

function saveItem(id) {
    const name = document.querySelector(`#user-${id} input.users-item__name`);
    if (name) {
        replaceTag(name, 'span', 'users-item__name', name.value);
    }

    const surname = document.querySelector(`#user-${id} input.users-item__surname`);
    if (surname) {
        replaceTag(surname, 'span', 'users-item__surname', surname.value)
    }

    const position = document.querySelector(`#user-${id} select.users-item__position`);
    if (position) {
        replaceTag(position, 'span', 'users-item__position', position.value);
    }

    const itemUpdate = document.querySelector(`#user-${id} .users-item__update`);
    itemUpdate.classList.remove('hidden');

    const itemDelete = document.querySelector(`#user-${id} .users-item__delete`);
    itemDelete.classList.remove('hidden');

    const save = document.querySelector(`#user-${id} .save`);
    save.classList.add('hidden');
}

function replaceTag(old, tag, classAdd = '', value = '') {
    const oldElement = old;
    const newElement = document.createElement(tag);

    if (tag === 'select') {
        newElement.classList.add(classAdd);
        for (let option of document.querySelector(".form__select").options) {
            const newOption = document.createElement("option");
            if (option.value === value) {
                newOption.setAttribute('selected', 'selected');
            }
            newOption.text = option.value;
            newElement.add(newOption);
        }
    } else if (tag === 'input') {
        newElement.classList.add(classAdd);
        newElement.value = value;
    } else if (tag === 'span') {
        newElement.textContent = value;
        newElement.classList.add(classAdd);
    }
    oldElement.parentNode.replaceChild(newElement, old);
}