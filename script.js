const chatbox = document.getElementById('chatbox');
const buttonContainer = document.getElementById('buttonContainer');

let step = 0;
let selections = {};

const messages = [
    "Welcome to our Clothing Chatbot! Please choose who you're shopping for:",
    "Are you looking for tops or bottoms?",
    {
        tops: "Select your preference:",
        bottoms: "Select your preference:"
    },
    "Here are some recommended websites for your selection:",
];

const options = {
    step0: ["Man", "Woman"],
    step1: ["Tops", "Bottoms"],
    tops: ["T-shirt", "Shirt", "Jacket"],
    bottoms: ["Jeans", "Trousers", "Shorts"]
};

const websites = {
    tShirt: ["ASOS", "Zara", "Uniqlo"],
    shirt: ["H&M", "Myntra", "Gap"],
    jacket: ["North Face", "Patagonia", "Columbia"],
    jeans: ["Levi's", "Diesel", "Wrangler"],
    trousers: ["Marks & Spencer", "Hugo Boss", "Banana Republic"],
    shorts: ["Puma", "Adidas", "Nike"]
};

function addMessage(text, className) {
    const message = document.createElement('div');
    message.className = `message ${className}`;
    message.textContent = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function createButtons(optionsArray, stepKey) {
    buttonContainer.innerHTML = '';
    optionsArray.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => handleResponse(option, stepKey);
        buttonContainer.appendChild(button);
    });
}

function handleResponse(selectedOption, stepKey) {
    addMessage(selectedOption, "user-message");

    if (stepKey === "step0") {
        selections.gender = selectedOption.toLowerCase();
        addMessage(messages[++step], "bot-message");
        createButtons(options.step1, "step1");
    } else if (stepKey === "step1") {
        selections.type = selectedOption.toLowerCase();
        const nextQuestion = messages[2][selections.type];
        addMessage(nextQuestion, "bot-message");
        createButtons(options[selections.type], selections.type);
    } else if (stepKey === "tops" || stepKey === "bottoms") {
        selections.item = selectedOption.replace(/-/g, '').toLowerCase();
        showRecommendations(selections.item);
    }
}

function showRecommendations(item) {
    const sites = websites[item] || [];
    const recommendations = sites.map(site => `• ${site}`).join("\n");
    addMessage("Here are some great sites to shop for your selection:\n" + recommendations, "bot-message");
    addMessage("Thank you for using our chatbot!", "bot-message");
    buttonContainer.innerHTML = '';
}

function startChat() {
    addMessage(messages[step], "bot-message");
    createButtons(options.step0, "step0");
}

startChat();
