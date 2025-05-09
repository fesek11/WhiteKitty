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