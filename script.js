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

    // ================================================================
    // ===== LÓGICA DO QUIZ ===========================================
    // ================================================================

    const quizData = {
        start: {
            question: "Qual é o seu principal objetivo com o nosso calendário?",
            answers: ["Fortalecer a minha fé", "Voltar à intimidade com Deus"],
            paths: ["fortalecer", "reconectar"]
        },
        fortalecer: [
            { question: "Em que momento você sente que sua fé precisa de um reforço?", answers: ["Quando enfrento desafios diários", "Nos momentos de dúvida", "Na rotina do dia a dia"] },
            { question: "Como você descreveria o impacto da sua fé na sua vida?", answers: ["Ela me dá força e propósito", "Sinto que falta um pouco de direção", "Às vezes, me sinto desconectado"] },
            { question: "Qual é a principal dificuldade que você enfrenta para fortalecer a sua fé?", answers: ["Falta de tempo", "Falta de inspiração", "Dificuldade em manter uma rotina"] },
            { question: "O quão importante é para você sentir que está progredindo espiritualmente?", answers: ["Muito importante", "Importante, mas nem sempre percebo", "Não sei, preciso de mais clareza"] }
        ],
        reconectar: [
            { question: "Como você descreveria o seu relacionamento atual com Deus?", answers: ["Sinto que estou me reconectando", "Me sinto distante", "Não sei bem como descrever"] },
            { question: "A quanto tempo você não ora?", answers: ["Não oro há duas semanas", "Não oro há mais de um mês", "Já nem sei quanto tempo"] },
            { question: "O quão disposto você está a dar o primeiro passo para uma vida espiritual mais profunda?", answers: ["Muito disposto", "Quase lá", "Preciso de mais um empurrão"] }
        ],
        final: {
            fortalecer: {
                message: "Sabemos que você deseja fortalecer sua fé de forma verdadeira e constante. Por isso este calendário de 30 dias é ideal para isso. Com reflexões, versículos e orações diárias, ele vai ajudá-lo a crescer espiritualmente e se aproximar mais de Deus. Comece agora e viva uma fé mais forte e iluminada!",
                button: "Quero o meu calendário!"
            },
            reconectar: {
                message: "Percebemos que você está se sentindo distante de Deus, e esse calendário de 30 dias foi feito para mudar isso. Com reflexões, versículos e orações diárias, ele vai guiar você para se reconectar e fortalecer sua fé. Comece agora e transforme sua vida espiritual!",
                button: "Quero o meu calendário!"
            }
        }
    };

    const quizOverlay = document.getElementById('quiz-overlay');
    const quizContent = document.getElementById('quiz-content');
    const questionEl = document.getElementById('quiz-question');
    const answersEl = document.getElementById('quiz-answers');
    const progressBar = document.getElementById('quiz-progress-bar');
    const finalScreen = document.getElementById('quiz-final-screen');
    const finalMessageEl = document.getElementById('quiz-final-message');
    const finalButtonEl = document.getElementById('quiz-final-button');
    
    let currentPath = null;
    let questionIndex = 0;
    
    function startQuiz() {
        quizOverlay.classList.add('visible');
        questionIndex = 0;
        currentPath = null;
        displayQuestion(quizData.start);
        updateProgressBar();
    }

    function displayQuestion(qData) {
        quizContent.classList.add('fading-out');

        setTimeout(() => {
            questionEl.textContent = qData.question;
            answersEl.innerHTML = "";
            qData.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.classList.add('quiz-answer-btn');
                button.textContent = answer;
                button.addEventListener('click', () => handleAnswerClick(index));
                answersEl.appendChild(button);
            });
            quizContent.classList.remove('fading-out');
        }, 300);
    }
    
    function handleAnswerClick(index) {
        if (!currentPath) { // Primeira pergunta
            currentPath = quizData.start.paths[index];
            questionIndex = 0;
            displayQuestion(quizData[currentPath][questionIndex]);
        } else { // Perguntas seguintes
            questionIndex++;
            if (questionIndex < quizData[currentPath].length) {
                displayQuestion(quizData[currentPath][questionIndex]);
            } else {
                showFinalScreen();
            }
        }
        updateProgressBar();
    }
    
    function updateProgressBar() {
        const totalQuestions = currentPath ? quizData[currentPath].length + 1 : 1;
        const currentQuestionNumber = currentPath ? questionIndex + 1 : 0;
        const progress = (currentQuestionNumber / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showFinalScreen() {
        progressBar.style.width = `100%`;
        const finalData = quizData.final[currentPath];
        finalMessageEl.textContent = finalData.message;
        finalButtonEl.textContent = finalData.button;
        
        quizContent.style.display = 'none';
        finalScreen.style.display = 'block';

        finalButtonEl.href = '#hero'; // Alterado para levar ao topo do site
        finalButtonEl.addEventListener('click', closeQuiz);
    }

    function closeQuiz() {
        sessionStorage.setItem('quizCompleted', 'true');
        quizOverlay.classList.remove('visible');
    }

    // Inicia o quiz se não tiver sido completado na sessão
    if (!sessionStorage.getItem('quizCompleted')) {
        startQuiz();
    }
    
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

