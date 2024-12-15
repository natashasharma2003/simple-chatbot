document.addEventListener("DOMContentLoaded", function() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");

    const botResponses = {
        greetings: ["Hello!", "Hi there!", "Howdy!"],
        howAreYou: ["I'm a bot, so I'm always good.", "Doing well, thanks for asking!", "I'm just a bunch of code, but thanks for asking!"],
        name: ["I'm an ADHD dev's simple chatbot.", "You can call me ADHD Dev.", "Just a friendly chatbot here!"],
        bye: ["Goodbye!", "See you later!", "Take care!"],
        ecommerce: [
            "An ecommerce website is an online platform where you can buy and sell goods and services.",
            "Ecommerce websites allow customers to shop for products from anywhere, anytime.",
            "Ecommerce sites provide a variety of products, including electronics, clothing, books, groceries, and much more."
        ],
        offers: [
            "Currently, many ecommerce websites offer discounts like '50% off on your first order' and 'Buy 1 Get 1 Free' on select items.",
            "You can find great offers on top ecommerce websites like Amazon, eBay, and Flipkart, with seasonal sales and flash deals.",
            "Many ecommerce sites also offer free shipping for orders above a certain amount. Keep an eye on their discount sections!"
        ],
        shopping: [
            "On an ecommerce website, you can shop for a wide range of products like electronics, books, clothing, and groceries.",
            "Most ecommerce websites offer categories like fashion, tech, home essentials, and even groceries and beauty products.",
            "You can shop for almost anything online — from furniture to gadgets to groceries!"
        ],
        help: ["If you need assistance, please call us at 1234567897. We're here to help!"],
        default: ["I'm not sure how to respond to that.", "Could you please rephrase?", "I didn't quite get that."]
    };

    const responseMap = [
        { triggers: ["hello", "hi", "howdy", "hey"], responses: botResponses.greetings },
        { triggers: ["how are you?", "how are you"], responses: botResponses.howAreYou },
        { triggers: ["what is your name?", "what's your name?", "who are you?"], responses: botResponses.name },
        { triggers: ["bye", "goodbye", "see you"], responses: botResponses.bye },
        { triggers: ["what is an ecommerce website?", "what is ecommerce?", "tell me about ecommerce"], responses: botResponses.ecommerce },
        { triggers: ["what offers are available?", "tell me about the offers", "any discounts on ecommerce websites?", "latest discounts on ecommerce websites"], responses: botResponses.offers },
        { triggers: ["what can i shop on ecommerce website?", "what products can I shop?", "what can I buy on an ecommerce website?"], responses: botResponses.shopping },
        { triggers: ["help", "assistance", "I need help"], responses: botResponses.help }
    ];

    chatSend.addEventListener("click", function() {
        const userInput = chatInput.value.toLowerCase().trim();
        if (userInput) {
            addMessage(userInput, "user");
            const botResponse = getBotResponse(userInput);
            setTimeout(() => addMessage(botResponse, "bot"), 500);
            chatInput.value = "";
        }
    });

    chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            chatSend.click();
        }
    });

    function addMessage(message, sender) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");
        if (sender === "bot") {
            messageContainer.classList.add("bot");
        }

        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.textContent = message;

        messageContainer.appendChild(messageDiv);
        chatBody.appendChild(messageContainer);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(userInput) {
        for (let mapping of responseMap) {
            if (mapping.triggers.some(trigger => userInput.includes(trigger))) {
                const responses = mapping.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        const defaultResponses = botResponses.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});
