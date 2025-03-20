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

// /* Search icon */
let searchContainer = null;
let isSearchInitialized = false;
let allProducts = [];

function initializeProducts() {
    allProducts = [
        // index.html سے
        { name: 'Nordic Chair', price: '$50.00', category: 'Chairs', page: 'index.html' },
        { name: 'Kruzo Aero Chair', price: '$78.00', category: 'Chairs', page: 'index.html' },
        { name: 'Ergonomic Chair', price: '$43.00', category: 'Chairs', page: 'index.html' },

        // livingRoom.html سے
        { name: 'Ach Sofa Design', price: '$48,000.00', category: 'Living Room', page: 'livingRoom.html' },
        { name: 'Aga Corner Sofa', price: '$225,000.00', category: 'Living Room', page: 'livingRoom.html' },

        // Dining.html سے
        { name: 'Dining Room with Stylish Glamour', price: '$3,999.00', category: 'Dining', page: 'Dining.html' },
        { name: 'Dining Room with Classic Sophistication', price: '$3,999.00', category: 'Dining', page: 'Dining.html' },

        // bedRoom.html سے
        { name: 'Royal Comfort King', price: '$1,599.00', category: 'Bedroom', page: 'bedRoom.html' },
        { name: 'Contemporary Platform', price: '$2,199.00', category: 'Bedroom', page: 'bedRoom.html' }
        
    ];
}// 

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
                           required
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
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    searchContainer.addEventListener('click', (e) => {
        if (e.target === searchContainer) closeSearch();
    });
}
function openSearch() {
    if (!isSearchInitialized) {
        initializeProducts();
        createSearchUI();
        isSearchInitialized = true;
    }
    searchContainer.style.display = 'flex';
    document.getElementById('searchInput').focus();
}
function closeSearch() {
    searchContainer.style.display = 'none';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    if (!searchTerm) {
        resultsContainer.innerHTML = '';
        return;
    }
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayResults(filteredProducts);
}

function displayResults(products) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = products.length === 0 
        ? '<p class="no-results">No products found</p>'
        : products.map(product => `
            <div class="search-result-item" onclick="navigateToPage('${product.page}')">
                <h4>${product.name}</h4>
                <p>${product.price} • ${product.category}</p>
            </div>
        `).join('');
}

function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
    closeSearch();
}

// add-to-cart
document.addEventListener('DOMContentLoaded', function() {
    // Quantity controls functionality
    document.querySelectorAll('.cart-card').forEach(card => {
        const minusBtn = card.querySelector('.minus');
        const plusBtn = card.querySelector('.plus');
        const qtyInput = card.querySelector('.qty-input');
        
        minusBtn.addEventListener('click', () => {
            let currentVal = parseInt(qtyInput.value);
            if(currentVal > 1) {
                qtyInput.value = currentVal - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentVal = parseInt(qtyInput.value);
            qtyInput.value = currentVal + 1;
        });

        // Input validation
        qtyInput.addEventListener('change', () => {
            if(qtyInput.value < 1 || isNaN(qtyInput.value)) {
                qtyInput.value = 1;
            }
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.cart-card');
            const product = {
                name: card.querySelector('h3').innerText,
                price: card.querySelector('.price').innerText,
                quantity: parseInt(card.querySelector('.qty-input').value)
            };
            
            // Add your cart logic here
            console.log('Added to cart:', product);
            alert(`Added ${product.quantity} ${product.name}(s) to cart!`);
        });
    });
});

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

    // // Loader Hide Script
    // window.addEventListener('load', function() {
    //     const loading = document.getElementById('loading');
    //     loading.style.opacity = '0';
    //     setTimeout(() => {
    //         loading.style.display = 'none';
    //     }, 500);
    // });
