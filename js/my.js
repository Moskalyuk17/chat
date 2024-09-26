//Вывод сообщений в окне
document.querySelector(".button").onclick = function gt(){
    var card = document.querySelector('.out');
    var post = document.createElement('p');
    post.style.border = '1px solid black';
    post.style.borderRadius = '4px';
    post.style.padding = '4px';
    post.style.margin = '4px';
    post.style.color = '#fff';
    post.style.wordBreak = 'break-all';

    var postText = document.getElementById('post-text').value;
    post.style.whiteSpace = "pre-wrap";
    card.append(post);
    post.append(postText);
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

function storeInput() {
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
    assistantElement.classList.add('col-sm');
    
    assistantElement.setAttribute('id', `assistant-${lastAssistant.id}`);
    
    assistantElement.innerHTML = `
        <div class="text_item">${lastAssistant.name}</div>
        <button class="openEditAssistante"><img src="/img/more_horiz_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt=""></button>
    `;
    
    listChat.appendChild(assistantElement);

    assistantElement.querySelector('.openEditAssistante').addEventListener('click', function(event) {
        openEditModal(lastAssistant.id, event.target);
    });
});

document.querySelector('.modalWindow').addEventListener('submit', function(e) {
    e.preventDefault();
});

function openEditModal(assistantId, buttonElement) {
    const modalEdit = document.createElement('div');
    modalEdit.classList.add('modalEdit');
    modalEdit.innerHTML = `
        <div class="modalContent">
            <button class="deleteAssistant">Удалить</button>
            <button class="editAssistant">Изменить</button>
            <button class="closeModal">Закрыть</button>
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
let sidebar = document.querySelector('.aside');
let openAside = document.querySelector('.open_sidebar');
sidebar.style.display = 'block';
openAside.style.display = 'none';

function closeAside(el) {
    if (sidebar.style.display === 'none') {
        sidebar.style.display = 'block';
        openAside.style.display = 'none';
    } else if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
        openAside.style.display = 'block';
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


var btn = document.querySelector('.selected');
var blockHidden = document.querySelector('#version');

function showBlock() {
  blockHidden.classList.add('m-show');
}
btn.addEventListener('click', showBlock);

