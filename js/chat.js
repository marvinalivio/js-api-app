document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addMessageToChat('user', userInput);
    document.getElementById('user-input').value = '';

    const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    addMessageToChat('bot', data.reply);
}

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElem = document.createElement('div');
    messageElem.classList.add('message', sender);
    messageElem.innerText = message;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
};

const chatBubble = document.querySelector('#usap');
chatBubble.addEventListener('click', function(){
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.classList.toggle('showChatBox')
})
