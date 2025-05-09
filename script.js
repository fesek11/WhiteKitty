// Replace these URLs with your actual cat photos
const catImages = [
    'Screenshot_1.jpg',
    'Screenshot_2.jpg',
    'Screenshot_3.jpg'
];

const messages = {
    normal: ['Мяу!', 'Шо зош?!', 'Муррр...', 'Пшшш!', 'Привіт!', 'Гав?'],
    special: ['Кіт спить служба йде', 'Краще нагодуй']
};

let currentIndex = 0;

// Function to create and add images to the carousel
function createGallery() {
    const gallery = document.getElementById('gallery');
    
    catImages.forEach((imageUrl, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'cat-image';
        imageContainer.style.transform = `translateX(${index * 100}%)`;
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Фото кота ${index + 1}`;
        
        // Add message element
        const message = document.createElement('div');
        message.className = 'cat-message';
        message.style.display = 'none';
        
        // Add tap counter and message logic
        let tapCount = 0;
        let lastTapTime = 0;
        
        imageContainer.addEventListener('click', () => {
            const currentTime = Date.now();
            
            if (currentTime - lastTapTime > 3000) {
                tapCount = 0;
            }
            
            tapCount++;
            lastTapTime = currentTime;
            
            // Show message
            message.style.display = 'block';
            
            if (tapCount >= 5 && currentTime - lastTapTime < 3000) {
                message.textContent = index === 0 ? messages.special[0] : messages.special[1];
                setTimeout(() => {
                    message.style.display = 'none';
                    tapCount = 0;
                }, 2000);
            } else {
                message.textContent = messages.normal[Math.floor(Math.random() * messages.normal.length)];
                setTimeout(() => {
                    message.style.display = 'none';
                }, 1000);
            }
        });
        
        imageContainer.appendChild(img);
        imageContainer.appendChild(message);
        gallery.appendChild(imageContainer);
    });
    
    // Add carousel navigation
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    function updateCarousel() {
        const images = document.querySelectorAll('.cat-image');
        images.forEach((image, index) => {
            image.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
    }
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + catImages.length) % catImages.length;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % catImages.length;
        updateCarousel();
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
    
    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    gallery.addEventListener('touchend', (e) => {
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