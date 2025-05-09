// Replace these URLs with your actual cat photos
const catImages = [
    'Screenshot_1.jpg',
    'Screenshot_2.jpg',
    'Screenshot_3.jpg'
];

const messages = {
    normal: ['MEOW!', 'Шо зош?!', 'Муррр...', 'Пшшш!'],
    special: ['Кіт спить служба йде', 'Краще нагодуй']
};

// Function to get random position within container
function getRandomPosition() {
    const container = document.getElementById('gallery');
    const maxX = container.clientWidth - 300; // 300 is image width
    const maxY = container.clientHeight - 300; // 300 is image height
    return {
        x: Math.random() * maxX,
        y: Math.random() * maxY
    };
}

// Function to create and add images to the gallery
function createGallery() {
    const gallery = document.getElementById('gallery');
    gallery.style.position = 'relative';
    gallery.style.minHeight = '600px';
    
    catImages.forEach((imageUrl, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'cat-image';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Cat photo ${index + 1}`;
        
        // Add message element
        const message = document.createElement('div');
        message.className = 'cat-message';
        message.style.display = 'none';
        
        // Set random initial position
        const pos = getRandomPosition();
        imageContainer.style.position = 'absolute';
        imageContainer.style.left = `${pos.x}px`;
        imageContainer.style.top = `${pos.y}px`;
        
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
        
        // Add random movement
        setInterval(() => {
            const newPos = getRandomPosition();
            imageContainer.style.transition = 'all 2s ease-in-out';
            imageContainer.style.left = `${newPos.x}px`;
            imageContainer.style.top = `${newPos.y}px`;
        }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds
    });
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