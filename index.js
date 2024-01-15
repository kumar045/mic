// Function to add styles to the page
function addStyles() {
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.textContent = `
    body, html { height: 100%; margin: 0; font-family: Arial, sans-serif; }
    .chat-container { position: fixed; bottom: 10px; right: 10px; width: 300px; border: 1px solid #ccc; background: #FFF; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: none; flex-direction: column; }
    .chat-header { background: #4e8cff; color: white; padding: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.9em; }
    .chat-messages { flex-grow: 1; padding: 10px; background: #f4f7f6; overflow-y: auto; }
    .message { border-radius: 20px; padding: 10px; margin: 10px; color: white; max-width: 80%; }
    .human { background: #007bff; align-self: flex-end; }
    .bot { background: #0f4d92; align-self: flex-start; }
    .input-container { padding: 10px; background: white; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; display: flex; }
    .chat-input { flex-grow: 1; border-radius: 15px; border: 1px solid #ccc; padding: 10px; margin-right: 10px; }
    .send-button { background: #4e8cff; color: white; border: none; border-radius: 15px; padding: 10px 15px; cursor: pointer; }
    .minimize { background: transparent; border: none; color: white; font-size: 1.2em; cursor: pointer; }
    .chat-icon {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 50px;
      height: 50px;
      background-image: url('chat-icon.png'); /* Replace with the path to your ChatGPT icon */
      background-size: cover;
      cursor: pointer;
    }
  `;
}

// Function to create a message element
function createMessageElement(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = text;
  return messageDiv;
}

// Function to add a message to the chat
function addMessage(text, sender) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = createMessageElement(text, sender);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}

// Function to handle sending a message
function sendMessage() {
  const input = document.querySelector('.chat-input');
  const text = input.value.trim();
  if (text) {
    addMessage(text, 'human');
    input.value = '';
    // Placeholder for bot response
    setTimeout(() => addMessage('This is a bot reply.', 'bot'), 500);
  }
}

// Function to toggle the chat interface
function toggleChat() {
  const chatContainer = document.querySelector('.chat-container');
  chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
}

// Function to build the chat interface
function buildChatInterface() {
  addStyles();

  // Create chat icon
  const chatIcon = document.createElement('div');
  chatIcon.classList.add('chat-icon');
  chatIcon.addEventListener('click', toggleChat);
  document.body.appendChild(chatIcon);

  // Create chat container
  const chatContainer = document.createElement('div');
  chatContainer.classList.add('chat-container');
  document.body.appendChild(chatContainer);

  // Create chat header
  const chatHeader = document.createElement('div');
  chatHeader.classList.add('chat-header');
  chatHeader.innerHTML = `
    <span>Chat with Jessica Cowles</span>
    <button class="minimize">_</button>
  `;
  chatHeader.querySelector('.minimize').addEventListener('click', toggleChat);
  chatContainer.appendChild(chatHeader);

  // Create chat messages container
  const chatMessages = document.createElement('div');
  chatMessages.classList.add('chat-messages');
  chatContainer.appendChild(chatMessages);

  // Create input container
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  chatContainer.appendChild(inputContainer);

  // Create text input
  const chatInput = document.createElement('input');
  chatInput.classList.add('chat-input');
  chatInput.type = 'text';
  chatInput.placeholder = 'Type a message...';
  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  inputContainer.appendChild(chatInput);

  // Create send button
  const sendButton = document.createElement('button');
  sendButton.classList.add('send-button');
  sendButton.textContent = 'Send';
  sendButton.addEventListener('click', sendMessage);
  inputContainer.appendChild(sendButton);
}

// Initialize the chat interface
buildChatInterface();
