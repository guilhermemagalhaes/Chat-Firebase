var config = {
    apiKey: "AIzaSyA0-BK5NFYPl0tS8WDGaxdyJ1LCA7Wz76M",
    authDomain: "wechat-45532.firebaseapp.com",
    databaseURL: "https://wechat-45532.firebaseio.com",
    storageBucket: "wechat-45532.appspot.com",
};

var app = firebase.initializeApp(config);
var database = app.database();

var chatRef = database.ref().child('chat');


var transitionContent = document.querySelector('#transition-content'),
    fab = document.querySelector('#sendChat'),
    loading = document.querySelector('.loading'),
    content = document.getElementById('content'),
    chatMessagesElement = content.querySelector('.chat-messages');

var isNewChild = false;


/**
 * Create a new chat
 */
fab.addEventListener('click', function (e) {
  e.preventDefault();

    var mensagemField = document.querySelector('#mensagem');

    if(localStorage.usuario) {
      var usuario = JSON.parse(localStorage.usuario);
    }

    var chat = {
      usuario: usuario ? usuario.email : null,
      mensagem: mensagemField.value,
      createdAt: new Date().toISOString(),
    };

    this.classList.toggle('animate-out');
    setTimeout(function () {
      fab.classList.remove('animate-out');
      fab.classList.add('animate-in');
    }, 10)
    

    mensagemField.value = '';

    isNewChild = true;
    return chatRef.push().set(chat);
  
  
  document.querySelector('.overlay').onclick = function () {
    modal.hide();
  }
});





/**
 * Show search bar
 */
document.querySelector('.search-btn').addEventListener('click', function (e) {
  var element = this;
  element.parentNode.querySelector('.search-bar').classList.add('-active');

  var input = element.parentNode.querySelector('.search-bar input');

  input.value = '';
  input.focus();

  e.preventDefault();
});

/**
 * Hide search bar
 */
document.querySelector('.toolbar .back-btn').addEventListener('click', function (e) {
  var element = this;
  element.parentNode.parentNode.classList.remove('-active');
  e.preventDefault();
});



/**************************************
 * * * * * * *  Login * * * * * * * * 
 **************************************/

document.querySelector(".login-form").addEventListener('submit', function (e) {
  e.preventDefault();

 


  var email = document.querySelector('#email');


  if (email.value.indexOf('@') > 1) {
    var nome = email.value.split('@')[0];
  } else {
    email.classList.remove('animate-shake');
    setTimeout(function () {
      email.classList.add('animate-shake');
      email.classList.add('error');
    }, 10)
    
    return false;
  }


  document.querySelector('#login').classList.add('animate-out');

  var usuario = {
    nome: nome,
    email: email.value,
  };

adicionaChats()
  localStorage.usuario = JSON.stringify(usuario);

});


if (localStorage.usuario) {
  adicionaChats()
  document.querySelector('#login').classList.add('animate-out');
}








/**************************************
 * * * * *  Firebase Events * * * * * *
 **************************************/


/**
 * Called only once, check if there's chats on database
 */
function adicionaChats () {

  chatRef.once('value').then(function (snapshot) {
    let chats = snapshot.val(),
        count = 0;
    
    for (let id in chats) count++;

    if(count == 0)
      chatMessagesElement.innerHTML = '<h3 class="empty-placeholder">Nenhum post criado</h3>'
  });

  chatRef.on('child_added', function (snapshot) {
    var chat = snapshot.val();
    loading.classList.add('hide');
    var usuario = localStorage.usuario ? JSON.parse(localStorage.usuario) : null;

    addCard(chat, usuario);
  });
}






/**
 * create a new card with the chat information
 *
 * @param {object} chat chat information
 */
function addCard(chat, usuario) {
  var emptyPlaceholder = document.querySelector('.empty-placeholder');

  if(emptyPlaceholder) emptyPlaceholder.remove();

  var classes = 'card chat-message '
  if(chat.usuario == usuario.email) classes += ' chat-me';

  let cardWrapper = document.createElement('div');
  cardWrapper.setAttribute('class', classes);
  if(isNewChild) cardWrapper.classList.add('-highlight');
  cardWrapper.innerHTML = '' +
    '<b class="card-options message">'+chat.usuario+'</b>'+
    '<p class="message">'+chat.mensagem+'</p>'+
    '<div class="card-options">' +
    '<span class="time">'+moment(chat.createdAt).fromNow()+'</span>' +
    '<span class="comments"></span>' +
    '</div>';

  chatMessagesElement.appendChild(cardWrapper);
  // chatMessagesElement.insertBefore(cardWrapper, chatMessagesElement.firstChild);
}
