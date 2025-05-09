// Replace these URLs with your actual cat photos
const catImages = [
    'Screenshot_1.jpg',
    'Screenshot_2.jpg',
    'Screenshot_3.jpg'
];

const messages = {
    normal: [
        "Мяу!",
        "Привіт!",
        "Муррр...",
        "Пшшш!",
        "Гав?",
        "На варті!",
        "Служу!",
        "Готовий!",
        "Дисципліна!",
        "Відданий!"
    ],
    special: [
        "Кіт спить - служба йде!",
        "Краще нагодуй!",
        "Котів лапами не чіпати :3",
        "Геройський кіт!",
        "Легендарний мурчик!"
    ]
};

let currentIndex = 0;
let clickCount = 0;
let lastClickTime = 0;

// Function to create and add images to the carousel
function createGallery() {
    const carousel = document.querySelector('.carousel');
    
    // Add images to carousel
    catImages.forEach((src, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'cat-image';
        imgContainer.style.transform = `translateX(${index * 100}%)`;
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Білий Котик';
        
        imgContainer.appendChild(img);
        carousel.appendChild(imgContainer);
        
        // Add click event for messages
        imgContainer.addEventListener('click', () => {
            const currentTime = new Date().getTime();
            if (currentTime - lastClickTime > 1000) {
                clickCount = 0;
            }
            clickCount++;
            lastClickTime = currentTime;
            
            showMessage(imgContainer);
        });
    });
    
    // Add carousel navigation
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < catImages.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextButton.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevButton.click();
        }
    }
}

function updateCarousel() {
    const images = document.querySelectorAll('.cat-image');
    images.forEach((img, index) => {
        img.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });
}

function showMessage(element) {
    // Remove any existing message
    const existingMessage = document.querySelector('.cat-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = 'cat-message';
    
    // Choose message based on click count
    let messageText;
    if (clickCount >= 5) {
        messageText = messages.special[Math.floor(Math.random() * messages.special.length)];
    } else {
        messageText = messages.normal[Math.floor(Math.random() * messages.normal.length)];
    }
    
    message.textContent = messageText;
    element.appendChild(message);
    
    // Remove message after animation
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', createGallery);

// Add mouse movement effect
document.addEventListener('mousemove', (e) => {
    const images = document.querySelectorAll('.cat-image');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    images.forEach(image => {
        const rect = image.getBoundingClientRect();
        const imageX = rect.left + rect.width / 2;
        const imageY = rect.top + rect.height / 2;
        
        const angleX = (mouseY - imageY) * 0.01;
        const angleY = (mouseX - imageX) * -0.01;
        
        image.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});

// Add background color change on mouse movement
document.addEventListener('mousemove', (e) => {
    const hue = (e.clientX / window.innerWidth) * 360;
    document.body.style.backgroundColor = `hsl(${hue}, 70%, 95%)`;
}); 