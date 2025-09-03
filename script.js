document.addEventListener('DOMContentLoaded', () => {

    // Lógica para o menu hambúrguer
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const isExpanded = mobileMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Lógica para o cabeçalho aparecer ao rolar
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Lógica para o FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            
            // Fecha todas as respostas antes de abrir a nova
            faqQuestions.forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.remove('active');
            });
            
            // Abre ou fecha a resposta clicada
            if (!isActive) {
                button.classList.add('active');
                answer.classList.add('active');
            }
        });
    });

    // Lógica para animações ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // ===== LÓGICA DO CONTADOR REGRESSIVO =====
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const twentyMinutes = 20 * 60 * 1000;
        let endTime = localStorage.getItem('countdownEndTime');

        if (!endTime || new Date().getTime() > endTime) {
            endTime = new Date().getTime() + twentyMinutes;
            localStorage.setItem('countdownEndTime', endTime);
        }

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                timerElement.textContent = "00:00";
                const offerText = document.querySelector('#countdown-timer-header p');
                if (offerText) {
                    offerText.textContent = "Oferta encerrada!";
                }
                return;
            }

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerElement.textContent = 
                (minutes < 10 ? '0' : '') + minutes + ':' + 
                (seconds < 10 ? '0' : '') + seconds;

        }, 1000);
    }
});

