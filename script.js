// Replace these URLs with your actual cat photos
const catImages = [
    'Screenshot_1.jpg',
    'Screenshot_2-removebg-preview.png',
    'Screenshot_3-removebg-preview.png'
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

let clickCount = 0;
let lastClickTime = 0;

function createSidePhotos() {
    const left = document.getElementById('side-photos-left');
    const right = document.getElementById('side-photos-right');
    left.innerHTML = '';
    right.innerHTML = '';
    catImages.forEach((src, i) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'cat-image';
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Білий Котик';
        imgContainer.appendChild(img);
        // Add hover effect
        imgContainer.addEventListener('mouseenter', () => {
            imgContainer.style.transform = 'scale(1.08)';
        });
        imgContainer.addEventListener('mouseleave', () => {
            imgContainer.style.transform = 'scale(1)';
        });
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
        // Alternate left/right
        if (i % 2 === 0) {
            left.appendChild(imgContainer);
        } else {
            right.appendChild(imgContainer);
        }
    });
}

function showMessage(element) {
    const existingMessage = document.querySelector('.cat-message');
    if (existingMessage) existingMessage.remove();
    const message = document.createElement('div');
    message.className = 'cat-message';
    let messageText;
    if (clickCount >= 5) {
        messageText = messages.special[Math.floor(Math.random() * messages.special.length)];
    } else {
        messageText = messages.normal[Math.floor(Math.random() * messages.normal.length)];
    }
    message.textContent = messageText;
    element.appendChild(message);
    setTimeout(() => { message.remove(); }, 2000);
}

document.addEventListener('DOMContentLoaded', createSidePhotos);

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

document.addEventListener('DOMContentLoaded', function() {
    // Фоновий віджет при скролі
    const sections = document.querySelectorAll('.story-block');
    const body = document.body;
    function updateBgOnScroll() {
        let active = 0;
        const scrollY = window.scrollY + window.innerHeight/2;
        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const bottom = rect.bottom + window.scrollY;
            if (scrollY >= top && scrollY < bottom) {
                active = i;
            }
        });
        body.classList.remove('bg-default', 'bg-darker', 'bg-night');
        if (active === 0) body.classList.add('bg-default');
        else if (active === 1) body.classList.add('bg-darker');
        else body.classList.add('bg-night');
    }
    window.addEventListener('scroll', updateBgOnScroll);
    updateBgOnScroll();

    // Make carousel images clickable to enlarge/shrink
    const carouselImages = document.querySelectorAll('.photo-carousel img');

    carouselImages.forEach(img => {
        img.style.transition = 'transform 0.3s ease-in-out'; // Add transition for smooth animation
        img.style.cursor = 'pointer'; // Change cursor to indicate interactivity

        img.addEventListener('click', () => {
            // Remove enlarged class from any other enlarged images
            carouselImages.forEach(otherImg => {
                if (otherImg !== img && otherImg.classList.contains('enlarged')) {
                    otherImg.classList.remove('enlarged');
                }
            });
            
            // Toggle the 'enlarged' class on the clicked image
            img.classList.toggle('enlarged');
        });
    });
});

// Add scroll-controlled GIF animation
let lastScrollTop = 0;
const scrollGif = document.getElementById('scrollGif');
const gifImg = scrollGif.querySelector('img');

// Function to control GIF playback direction
function controlGifPlayback() {
    const scrollTop = window.scrollY;
    const scrollDirection = scrollTop > lastScrollTop ? 'forward' : 'backward';
    
    // Create a new image element to reset the GIF
    const newImg = document.createElement('img');
    newImg.src = gifImg.src;
    newImg.style.width = '100%';
    newImg.style.height = '100%';
    newImg.style.objectFit = 'cover';
    
    // Replace the old image with the new one
    if (gifImg.parentNode) {
      gifImg.parentNode.replaceChild(newImg, gifImg);
    }
    
    // Update the reference
    gifImg = newImg;
    
    // Store the current scroll position
    lastScrollTop = scrollTop;
}

// Add scroll event listener
window.addEventListener('scroll', () => {
    // Throttle the scroll event to improve performance
    if (!window.scrollThrottle) {
        window.scrollThrottle = setTimeout(() => {
            controlGifPlayback();
            window.scrollThrottle = null;
        }, 100); // Adjust this value to control sensitivity
    }
});
