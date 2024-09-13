
document.querySelector("#button").onclick = function gt(){
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

document.querySelector(".new_chat").onclick = function gt(){
    var card = document.querySelector('.list_chat');
    var post = document.createElement('button');
    post.style.border = '1px solid';
    post.style.borderRadius = '4px';
    post.style.background = '#696969';
    post.style.padding = '4px';
    post.style.margin = '4px';
    post.style.color = '#fff';
    post.style.wordBreak = 'break-all';
    post.innerHTML = '<h3>Новый чат</h3>';
    post.style.whiteSpace = "pre-wrap";
    post.style.width = '100%'


    card.append(post);
    post.append(postText);
}