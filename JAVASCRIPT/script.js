AOS.init({
    offset: 100,
    delay: 0,
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
    disable: 'mobile'
});

let chatContainer = null;
let isInitialized = false;

function createChatUI() {
    const chatHTML = `
        <div class="chat-container" id="chatContainer">
            <div class="chat-header">
                <h3>Live Chat Support</h3>
                <button class="close-chat" onclick="closeChat()">&times;</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message agent-message">
                    Hello! How can I help you today?
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="messageInput" placeholder="Type your message...">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>
    `;

    document.querySelector('.live-chat').insertAdjacentHTML('beforeend', chatHTML);
    chatContainer = document.getElementById('chatContainer');

    document.getElementById('messageInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function openChat() {
    if (!isInitialized) {
        createChatUI();
        isInitialized = true;
    }
    chatContainer.style.display = 'flex';
}

function closeChat() {
    chatContainer.style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        // Add user message
        chatMessages.innerHTML += `
            <div class="message user-message">
                ${message}
            </div>
        `;
        setTimeout(() => {
            chatMessages.innerHTML += `
                <div class="message agent-message">
                    Thanks for your message! Our team will get back to you soon.
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        // Clear input
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
};

/* Search icon */
let searchContainer = null;
let isSearchInitialized = false;

function createSearchUI() {
    const searchHTML = `
        <div class="search-container" id="searchContainer">
            <div class="search-box">
                <div class="search-header">
                    <h3>Search Products</h3>
                    <button class="close-search" onclick="closeSearch()">&times;</button>
                </div>
                <div class="search-input-container">
                    <input type="text" 
                           class="search-input" 
                           id="searchInput" 
                           required=""
                             placeholder="Search for products...">
                    <button class="search-button" onclick="performSearch()">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="search-results" id="searchResults"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', searchHTML);
    searchContainer = document.getElementById('searchContainer');
    document.getElementById('searchInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Close search when clicking outside
    searchContainer.addEventListener('click', function (e) {
        if (e.target === searchContainer) {
            closeSearch();
        }
    });
}

function openSearch() {
    if (!isSearchInitialized) {
        createSearchUI();
        isSearchInitialized = true;
    }
    searchContainer.style.display = 'flex';
    document.getElementById('searchInput').focus();
}

function closeSearch() {
    searchContainer.style.display = 'none';
}

function performSearch() {
    const input = document.getElementById('searchInput');
    const searchTerm = input.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    if (searchTerm) {
        const results = [
            { name: 'Nordic Chair', price: '$50.00' },
            { name: 'Kruzo Aero Chair', price: '$78.00' },
            { name: 'Ergonomic Chair', price: '$43.00' }
        ].filter(item => item.name.toLowerCase().includes(searchTerm));

        resultsContainer.innerHTML = results.length > 0
            ? results.map(item => `
                <div class="search-result-item">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
            `).join('')
            : '<p style="text-align: center; padding: 20px;">No results found</p>';
    }
}


// BedRoom Carousel
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}