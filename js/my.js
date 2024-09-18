
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
const button1 = document.querySelector(".create");
const modal = document.querySelector(".modalAccomplished");


modalTrigger.addEventListener("click", function () {
    modalBackground.style.display = "block";
    modal.style.display = "none";
    modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";
});

modalClose.addEventListener("click", function () {
    modalBackground.style.display = "none";
    modal.style.display = "none";
});

modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
        modalBackground.style.display = "none";
        modal.style.display = "none";
    }
});

function storeInput() {
    const inputArray = [];
    
    const input1 = document.querySelector("#name_assistant");
    const input2 = document.querySelector("#Link");
    const input3 = document.querySelector("#version");
  
    const value1 = input1.value;
    const value2 = input2.value;
    const value3 = input3.value;
    
    inputArray.push(value1, value2, value3);
    
    console.log(inputArray);
}

button1.addEventListener("click", function () {
    modal.style.display = "block";
});

document.querySelector('.modalWindow').addEventListener('submit', function(e) {
    e.preventDefault();
});


let sidebar = document.querySelector('.aside');
let openAside = document.querySelector('.open_sidebar');
sidebar.style.display = 'block';
openAside.style.display = 'none';

function closeAside(el) {
    if(sidebar.style.display == 'none') {
        sidebar.style.display = 'block';
        openAside.style.display = 'none'
    } else if(sidebar.style.display == 'block') {
        sidebar.style.display = 'none';
        openAside.style.display = 'block'
    }
}