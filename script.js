// Replace these URLs with your actual cat photos
const catImages = [
    'path/to/your/cat1.jpg',
    'path/to/your/cat2.jpg',
    'path/to/your/cat3.jpg'
];

// Function to create and add images to the gallery
function createGallery() {
    const gallery = document.getElementById('gallery');
    
    catImages.forEach((imageUrl, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'cat-image';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Cat photo ${index + 1}`;
        
        imageContainer.appendChild(img);
        gallery.appendChild(imageContainer);
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