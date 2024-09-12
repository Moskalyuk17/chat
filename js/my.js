
document.querySelector("#button").onclick = function gt(){
    var card = document.querySelector('.out');
    var post = document.createElement('p');
    var postText = document.getElementById('post-text').value;
    post.style.whiteSpace = "pre-wrap";
    card.append(post);
    post.append(postText);
    document.body.append(card);
    document.getElementById("post-text").value = "";
}