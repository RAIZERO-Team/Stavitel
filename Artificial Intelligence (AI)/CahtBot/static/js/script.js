const chatInput = document.querySelector(".chat-input input");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

// ================ create chat list in html ================
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);

  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

/*
================================================
    handle chat list to now what is 
    outgoing from user and incoming from bot
================================================
*/
const handleChat = () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Remove the initial bot message if it exists
  if (welcomeMessageElement && welcomeMessageElement.parentNode === chatContainer) {
    chatContainer.removeChild(welcomeMessageElement);
    welcomeMessageElement = null; // Reset the reference
  }

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));

  // Make API request to get response from chatbot model
  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);

  fetch(`http://127.0.0.1:5000/get_response?msg=${encodeURIComponent(userMessage)}`)
    .then(response => response.json())
    .then(data => {
      const response = data.response;
      chatbox.appendChild(createChatLi(response, "incoming"));
    })
    .catch(error => console.error(error)); // Add error handling
};

sendChatBtn.addEventListener("click", handleChat);

const toggleChatbotBtn = document.getElementById("toggleChatbotBtn");
const body = document.body;

toggleChatbotBtn.addEventListener("click", function () {
  body.classList.toggle("show-chatbot");
});

// ============ Swicth Between faq & new chat ============
// Function to show the selected section
function showSection(index) {
  var sections = document.querySelectorAll(".section");

  sections.forEach(function (section) {
    section.classList.remove("active");
  });
  sections[index].classList.add("active");
}

// ============ FAQ Part ============

let welcomeMessageElement = null;
let faqDisplayed = false;

// ============ New chat function ============

// Function to start a new chat session
function startNewChat() {
  clearChat(); // Clear the chat messages

  const welcomeMessage = `
<li class="chat incoming">
<span class="material-symbols-outlined">smart_toy</span>
<p>
Hi there 👋
I'm the AI Assistant. 
How can I help you today?
</p>
</li>
`;
  chatbox.innerHTML += welcomeMessage;

  // document.getElementById("btnNewChat").style.display = "inline";
  // document.getElementById("btnSeeFAQ").style.display = "inline";
  // document.getElementById("chat-input").style.display = "inline";
  // document.getElementById("btnBack").style.display = "none";
  faqDisplayed = false;
}

// Store reference to the welcome message element
welcomeMessageElement = chatContainer.querySelector(".chatbox");

// Function to clear the chat messages
function clearChat() {
  document.querySelector(".chatbox").innerHTML = "";
}

// Function to show FAQ (replace this with actual FAQ logic)
function showFAQ() {
  clearChat(); // Clear the chat messages

  // Append FAQ message to the chat container
  const faqMessage = `
  
  <div class="faq_part">
          <div class="wrapper">
            <p>This is a question and answer section</p>

            <div class="faq">
              <button class="accordion">
                How can I create a website?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                  porro saepe quo, quibusdam nisi minus modi vero, dolorem ullam
                  ea perferendis corrupti explicabo temporibus nesciunt amet,
                  fugit sint quisquam harum.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                  porro saepe quo, quibusdam nisi minus modi vero, dolorem ullam
                  ea perferendis corrupti explicabo temporibus nesciunt amet,
                  fugit sint quisquam harum.
                </p>
              </div>
            </div>

            <div class="faq">
              <button class="accordion">
                How can I create a website by AI?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>

            <div class="faq">
              <button class="accordion">
                Where can I view my profile?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>

            <div class="faq">
              <button class="accordion">
                How can I change my password?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>
            



            <div class="faq">
              <button class="accordion">
                How do I change my profile picture?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>


            <div class="faq">
              <button class="accordion">
                How do I enable dark mode on the website?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>


            <div class="faq">
              <button class="accordion">
                How can i finde my old projects?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>


            <div class="faq">
              <button class="accordion">
                What services does your website offer?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>


            <div class="faq">
              <button class="accordion">
                What the languge availabpl in website?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>




            <div class="faq">
              <button class="accordion">
                How can i save my websites?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>


            <div class="faq">
              <button class="accordion">
                where can i see the (HTML OR CSS) code?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>


            <div class="faq">
              <button class="accordion">
                How do I change the name of the project?
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="pannel">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facilis saepe molestiae distinctio asperiores cupiditate
                  consequuntur dolor ullam, iure eligendi harum eaque hic
                  corporis debitis porro consectetur voluptate rem officiis
                  architecto.
                </p>
              </div>
            </div>
          </div>
        </div> 
        `;

  chatbox.innerHTML += faqMessage;

  var acc = document.querySelectorAll(".accordion");
  var i;


  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      this.parentElement.classList.toggle("active");

      var pannel = this.nextElementSibling;

      if (pannel.style.display === "block") {
        pannel.style.display = "none";
      } else {
        pannel.style.display = "block";
      }
    });
  }

  // Hide the back button and show the FAQ button
  document.getElementById("btnNewChat").style.display = "none";
  document.getElementById("btnSeeFAQ").style.display = "none";
  document.getElementById("chat-input").style.display = "none";
  document.getElementById("btnBack").style.display = "inline";
  faqDisplayed = true;
}

// Function to go back to the chatbot from the FAQ
function backToChat() {
  if (faqDisplayed) {
    startNewChat();
  }


  
  // Show the FAQ button and hide the back button
  document.getElementById("btnNewChat").style.display = "inline";
  document.getElementById("btnSeeFAQ").style.display = "inline";
  document.getElementById("chat-input").style.display = "inline";
  document.getElementById("btnBack").style.display = "none";
  faqDisplayed = false;
}

// Start a new chat session when the page loads
// window.onload = startNewChat;