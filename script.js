document.addEventListener('DOMContentLoaded', () => {
    const mainMessage = document.getElementById('main-message');
    const flowerContainer = document.getElementById('flower-container');
    const loveText = document.querySelector('.love-text');

    const loveMessages = [
        "I Love You",
        "Aku Sayang Kamu",
        "ngga nyangka ya haha ketemu di epep",
        "semoga bisa makin deket ya :)",
       ];

    const flowers = ['🌸', '🌺', '🌷', '🌼', '🌹', '🌻']; // Emojis of flowers

    let messageIndex = 0;
    let clickCount = 0;

    // Function to change the main message
    const changeMessage = () => {
        mainMessage.textContent = loveMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loveMessages.length;
    };

    // Initial message change after a short delay
    setTimeout(changeMessage, 2000); // Change message after 2 seconds

    // Event listener for mouse movement (for desktop)
    document.addEventListener('mousemove', (e) => {
        if (clickCount < 20) { // Limit number of flowers to avoid performance issues
            createFlower(e.clientX, e.clientY);
            clickCount++;
        }
    });

    // Event listener for touch movement (for mobile)
    document.addEventListener('touchmove', (e) => {
        // Prevent scrolling while touching for interaction
        e.preventDefault();
        if (e.touches.length > 0 && clickCount < 20) {
            const touch = e.touches[0];
            createFlower(touch.clientX, touch.clientY);
            clickCount++;
        }
    }, { passive: false }); // Use { passive: false } to allow preventDefault

    // Event listener for clicks (for general interaction)
    document.addEventListener('click', (e) => {
        changeMessage(); // Change message on click too
        createFlower(e.clientX, e.clientY, true); // Create a larger flower on click
    });

    // Function to create a flower emoji at specified coordinates
    const createFlower = (x, y, isClick = false) => {
        const flower = document.createElement('span');
        flower.classList.add('flower');
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

        // Position the flower relative to the message section
        const containerRect = flowerContainer.getBoundingClientRect();
        flower.style.left = `${x - containerRect.left}px`;
        flower.style.top = `${y - containerRect.top}px`;

        if (isClick) {
            flower.style.fontSize = '3em'; // Larger flower on click
            flower.style.opacity = '1';
            flower.style.transform = 'scale(1)';
        }

        flowerContainer.appendChild(flower);

        // Remove the flower after animation
        setTimeout(() => {
            flower.remove();
        }, 3000); // Match animation duration
    };

    // Optional: Add a subtle animation to the "I Love You" text
    setInterval(() => {
        loveText.style.transform = 'scale(1.02)';
        setTimeout(() => {
            loveText.style.transform = 'scale(1)';
        }, 300);
    }, 2000);
});