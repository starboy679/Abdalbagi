// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');
    const closeBtn = document.querySelector('.modal-close');

    // Project data
    const projects = {
        shopping: {
            title: 'Shopping Websites',
            description: 'A responsive e-commerce website built with HTML, CSS, and JavaScript, featuring a clean design and interactive shopping experience.',
            image: 'images/store.jpg',
            link: 'https://stars-eta-khaki.vercel.app/', // TODO: Replace '#' with your actual task manager project URL (e.g., 'https://your-task-manager.com')
            details: `
                <h3>Technologies Used:</h3>
                <ul>
                    <li>HTML5 for structure</li>
                    <li>CSS3 for styling and animations</li>
                    <li>JavaScript for interactivity</li>
                    <li>Local storage for cart persistence</li>
                    <li>Responsive design principles</li>
                </ul>
                <h3>Features:</h3>
                <ul>
                    <li>Product catalog display</li>
                    <li>Interactive shopping cart</li>
                    <li>Product filtering and search</li>
                    <li>Mobile-responsive design</li>
                    <li>Smooth animations and transitions</li>
                </ul>
            `
        },
        portfolio: {
            title: 'Portfolio Website',
            description: 'My personal portfolio website showcasing various web development projects with modern design and smooth animations.',
            image: 'images/protfolio.jpg',
            link: '#', // TODO: Replace '#' with your actual portfolio website project URL (e.g., 'https://your-portfolio-site.com')
            details: `
                <h3>Technologies Used:</h3>
                <ul>
                    <li>HTML5 and CSS3</li>
                    <li>JavaScript (ES6+)</li>
                    <li>Responsive design principles</li>
                    <li>CSS animations and transitions</li>
                </ul>
                <h3>Features:</h3>
                <ul>
                    <li>Responsive navigation</li>
                    <li>Smooth scrolling sections</li>
                    <li>Project showcase with hover effects</li>
                    <li>Contact form integration</li>
                    <li>Modern UI/UX design</li>
                </ul>
            `
        },
        tasks: {
            title: 'Task Manager',
            description: 'A simple yet powerful task management tool to help organize daily activities with drag-and-drop functionality.',
            image: 'images/tasks.jpg',
            link: '#', // TODO: Replace '#' with your actual shopping website project URL (e.g., 'https://your-shopping-site.com')
            details: `
                <h3>Technologies Used:</h3>
                <ul>
                    <li>HTML5 and CSS3</li>
                    <li>JavaScript (ES6+)</li>
                    <li>Local Storage for data persistence</li>
                    <li>Drag and Drop API</li>
                </ul>
                <h3>Features:</h3>
                <ul>
                    <li>Create, edit, and delete tasks</li>
                    <li>Drag and drop task organization</li>
                    <li>Task categories and priorities</li>
                    <li>Due date tracking</li>
                    <li>Data persistence with local storage</li>
                </ul>
            `
        },
        gifts: {
            title: 'Personalized Gifts Shop',
            description: 'A custom gifts e-commerce website featuring ready-made gifts, customization forms, and seamless WhatsApp order processing.',
            image: 'images/gifts.jpg',
            link: 'https://lovelybox.xo.je/',
            details: `
                <h3>Technologies Used:</h3>
                <ul>
                    <li>HTML5 and CSS3</li>
                    <li>JavaScript (ES6+)</li>
                    <li>WhatsApp Web API integration</li>
                    <li>Responsive design principles</li>
                    <li>Form validation and handling</li>
                </ul>
                <h3>Features:</h3>
                <ul>
                    <li>Ready-made gift catalog</li>
                    <li>Custom gift personalization forms</li>
                    <li>WhatsApp order processing</li>
                    <li>Direct customer communication</li>
                    <li>No payment gateway needed</li>
                   
                    
                </ul>
            `
        }
    };

    // Add click event to project cards
    document.querySelectorAll('.project-card').forEach(item => {
        item.addEventListener('click', function () {
            // Mobile tap-to-flip interaction
            if (window.innerWidth <= 1024) {
                // Check if the click target is the "click-info" span or a child of it.
                const isDetailsBtn = event.target.closest('.click-info');

                // If the card is not yet flipped
                if (!this.classList.contains('is-flipped')) {
                    // Unflip other cards to keep focus on one
                    document.querySelectorAll('.project-card').forEach(card => {
                        card.classList.remove('is-flipped');
                    });
                    
                    this.classList.add('is-flipped');
                    return; // Stop here, don't open modal yet
                }
                // If it IS flipped
                else {
                    // If we clicked the details button, let it proceed to open the modal
                    if (isDetailsBtn) {
                        // Do nothing here, let the code flow down to open modal
                    } else {
                        // If we clicked anywhere else on the card, unflip it
                        this.classList.remove('is-flipped');
                        return; // Stop here, don't open modal
                    }
                }
            }

            const projectKey = this.getAttribute('data-project');
            const project = projects[projectKey];

            if (project) {
                modalImage.src = project.image;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalDetails.innerHTML = project.details;

                // Add project link button if link exists
                const existingButton = modalDetails.querySelector('.project-link-btn');
                if (existingButton) {
                    existingButton.remove();
                }

                if (project.link && project.link !== '#') {
                    const linkButton = document.createElement('a');
                    linkButton.href = project.link;
                    linkButton.target = '_blank';
                    linkButton.className = 'project-link-btn';
                    linkButton.innerHTML = '<i class="fas fa-external-link-alt"></i> View Project';
                    modalDetails.appendChild(linkButton);
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', closeModal);

    // Handle clicking outside cards on mobile to unflip them
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!e.target.closest('.project-card')) {
                document.querySelectorAll('.project-card').forEach(card => {
                    card.classList.remove('is-flipped');
                });
            }
        }
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});
// Floating Code Animation for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.getElementById('hero');
    const codeSnippets = [
        '<div>', '</span>', 'console.log()', 'import React', 
        '#header', '.class', 'const x = 10;', 'return true;', 
        'npm install', 'git push', 'if (err)', 'await fetch()',
        'def main():', 'public static void', 'SELECT * FROM',
        'padding: 0;', 'margin: auto;', 'display: flex;'
    ];

    function createFloatingCode() {
        const el = document.createElement('div');
        el.classList.add('floating-code');
        el.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Random positioning
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 10 + 10) + 'px'; // 10px to 20px
        el.style.animationDuration = (Math.random() * 10 + 5) + 's'; // 5s to 15s
        el.style.opacity = Math.random() * 0.5 + 0.1;
        
        hero.appendChild(el);

        // Remove element after animation ends
        el.addEventListener('animationend', () => {
            el.remove();
        });
    }

    // Create a new code snippet every 500ms
    setInterval(createFloatingCode, 500);
});