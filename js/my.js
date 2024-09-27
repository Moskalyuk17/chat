//Вывод сообщений в окне
document.querySelector(".message_input").onclick = function inputMessage(){
    const card = document.querySelector('.out');
    const text_block = document.createElement('p');
    text_block.style.padding = '16px';
    text_block.style.borderRadius = '16px';
    text_block.style.margin = '4px';
    text_block.style.background = '#2F2F2F';
    text_block.style.color = '#fff';

    const tbText = document.getElementById('post-text').value;
    text_block.style.whiteSpace = "pre-wrap";
    card.append(text_block);
    text_block.append(tbText);
    document.getElementById("post-text").value = "";
}

//Создание модального окна
const modalTrigger = document.getElementsByClassName("new_chat")[0];

const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalClose = document.getElementsByClassName("modalClose")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];
const buttonCreateEl = document.querySelector(".create");

modalTrigger.addEventListener("click", function () {
    modalBackground.style.display = "block";
    modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";
});

modalClose.addEventListener("click", function () {
    modalBackground.style.display = "none";
});

modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
        modalBackground.style.display = "none";
    }
});


//Добавление ассистентов в боковую панель
let inputArray = [];
let assistantId = 1;

document.querySelector('.create').onclick = function storeInput() {
    const nameAssistante = document.querySelector("#name_assistant");
    const linkAssistante = document.querySelector("#Link");
    const versionAssistante = document.querySelector("#version");
  
    const assistant = {
        id: assistantId++,
        name: nameAssistante.value,
        link: linkAssistante.value,
        version: versionAssistante.value
    };
    
    inputArray.push(assistant);
    console.log(inputArray);
}


buttonCreateEl.addEventListener("click", function() {
    modalBackground.style.display = "none";
    const lastAssistant = inputArray[inputArray.length - 1];
    
    const listChat = document.querySelector('.list_chat');
    const assistantElement = document.createElement('li');
    assistantElement.classList.add('info_assistante');
    
    assistantElement.setAttribute('id', `assistant-${lastAssistant.id}`);
    
    assistantElement.innerHTML = `
        <div class="text_item">${lastAssistant.name}</div>
        <button class="openEditAssistante"><img src="/img/more_infoForAssistante.svg" alt="Опции"></button>
    `;
    
    listChat.appendChild(assistantElement);

    assistantElement.querySelector('.openEditAssistante').addEventListener('click', function(event) {
        openEditModal(lastAssistant.id, event.target);
    });
});

document.querySelector('.modalWindow').addEventListener('submit', function(e) {
    e.preventDefault();
});

// Пример массива пользователей
const users = [
    { id: '101', name: 'User 101' },
    { id: '102', name: 'User 102' },
    { id: '103', name: 'User 103' },
    { id: '104', name: 'User 104' },
];

// Открыть модальное окно "Поделиться ассистентом"
function shareAssistant(assistantId) {
    const modalShare = document.querySelector('.modalShareAssistant');
    const userListElement = document.getElementById('userList');
    const searchUserInput = document.getElementById('searchUser');
    let selectedUserId = null;

    userListElement.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.id}: ${user.name}`;
        li.addEventListener('click', () => {
            selectedUserId = user.id;
            alert(`Вы выбрали пользователя: ${user.name}`);
        });
        userListElement.appendChild(li);
    });

    searchUserInput.addEventListener('input', function () {
        const searchValue = searchUserInput.value.toLowerCase();
        userListElement.innerHTML = '';

        const filteredUsers = users.filter(user => user.id.includes(searchValue));

        if (filteredUsers.length > 0) {
            filteredUsers.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.id}: ${user.name}`;
                li.addEventListener('click', () => {
                    selectedUserId = user.id;
                    alert(`Вы выбрали пользователя: ${user.name}`);
                });
                userListElement.appendChild(li);
            });
        } else {
            userListElement.innerHTML = '<li>Пользователь не найден</li>';
        }
    });

    modalShare.style.display = 'flex';

    const modalClose = modalShare.querySelector('.modalClose1');
    modalClose.addEventListener('click', function () {
        modalShare.style.display = 'none';
    });

    document.querySelector('.modalClose1').onclick = function () {
        modalShare.style.display = 'none';
    };

    document.getElementById('confirmShare').onclick = function () {
        if (selectedUserId) {
            alert(`Ассистент ${assistantId} отправлен пользователю с ID ${selectedUserId}`);
            modalShare.style.display = 'none';
        } else {
            alert('Выберите пользователя для отправки!');
        }
    };
}

// Обработчик для кнопки "Поделиться" в модальном окне редактирования
function openEditModal(assistantId, buttonElement) {
    const modalEdit = document.createElement('div');
    modalEdit.classList.add('modalEdit');
    modalEdit.innerHTML = `
        <div class="modalContent">
            <button class="deleteAssistant">Удалить</button>
            <button class="editAssistant">Изменить</button>
            <button class="closeModal">Закрыть</button>
            <button class="shareAssistante">Поделиться</button>
        </div>
    `;

    const buttonRect = buttonElement.getBoundingClientRect();
    
    modalEdit.style.position = 'absolute';
    modalEdit.style.left = `${buttonRect.right + 16}px`;
    modalEdit.style.top = `${buttonRect.top}px`;

    document.body.appendChild(modalEdit);

    modalEdit.querySelector('.deleteAssistant').addEventListener('click', function() {
        deleteAssistant(assistantId);
        document.body.removeChild(modalEdit);
    });

    modalEdit.querySelector('.editAssistant').addEventListener('click', function() {
        editAssistant(assistantId);
        document.body.removeChild(modalEdit);
    });

    modalEdit.querySelector('.closeModal').addEventListener('click', function() {
        document.body.removeChild(modalEdit);
    });

    modalEdit.querySelector('.shareAssistante').addEventListener('click', function() {
        shareAssistant(assistantId);
        document.body.removeChild(modalEdit);
    });
}

// Функция для удаления ассистента
function deleteAssistant(assistantId) {
    const assistantElement = document.querySelector(`#assistant-${assistantId}`);
    assistantElement.remove();
    
    inputArray = inputArray.filter(assistant => assistant.id !== assistantId);
    console.log('Assistent deleted:', assistantId);
}

// Функция для изменения ассистента
function editAssistant(assistantId) {
    const assistant = inputArray.find(assistant => assistant.id === assistantId);
    if (assistant) {
        const newName = prompt("Введите новое название ассистента:", assistant.name);
        if (newName) {
            assistant.name = newName;
            document.querySelector(`#assistant-${assistantId} div`).textContent = `${newName}`;
        }
    }
}



//открытие боковой панели
const sidebar = document.querySelector('.aside');
const openAside = document.querySelector('.open_sidebar');
sidebar.style.display = 'block';
openAside.style.display = 'none';

document.querySelector(".close_sidebar").onclick = function mode(){
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
        openAside.style.display = 'block';
    }
}

document.querySelector(".open_sidebar").onclick = function mode(){
 if (sidebar.style.display === 'none'){
       sidebar.style.display = 'block';
       openAside.style.display = 'none';
   }
}


const selected = document.querySelector('.selected');
const versionList = document.querySelector('#version');
const versionOptions = versionList.querySelectorAll('li');

// Открытие/закрытие списка при клике на "selected"
selected.addEventListener('click', function () {
    if (versionList.style.display === 'block') {
        versionList.style.display = 'none';
    } else {
        versionList.style.display = 'block';
    }
});

versionOptions.forEach(function(option) {
    option.addEventListener('click', function () {
        const selectedValue = option.textContent;
        selected.textContent = selectedValue;
        versionList.style.display = 'none';
    });
});


const btn = document.querySelector('.selected');
const blockHidden = document.querySelector('#version');

function showBlock() {
  blockHidden.classList.add('select-show');
}
btn.addEventListener('click', showBlock);
