const questions = [
    {
        q: "Sümerler tarafından gerçekleştirilen ilk yazı sistemi hangisidir?",
        options: ["Çin Yazı Sistemi", "Çivi Yazısı", "Hiyeroglif", "Capitalis Quadrata"],
        answer: 1,
        img: "./images/quiz/civi-yazısı.png"
    },
    {
        q: "Bilinen en eski el yazması hikaye kitabı hangisidir?",
        options: ["Diamond Sutra", "The Egyptian Books of the Dead", "Ortaçağ El Yazması Kitaplar", "Papirüs"],
        answer: 0,
        img: "./images/quiz/diamond-sutra.png"
    },
    {
        q: "Eski Mısır’da yazı işlevi gören ve resim özelliği taşıyan simgeler hangisidir?",
        options: ["Hiyeroglif", "Çin Yazı Sistemi", "Çivi Yazısı", "Capitalis Quadrata"],
        answer: 0,
        img: "./images/quiz/hiyeroglif.png"
    },
    {
        q: "İlk alfabetik yazıyı bulan toplum hangisidir?",
        options: ["Yunanlar ", "Mısırlar ", "Fenikeler ", "Çinler"],
        answer: 2,
        img: "./images/quiz/fenikeler.png"
    },
    {
        q: "Hangisi günümüz amblem ve simge tasarımına önemli katkılar sağlamaktadır?",
        options: ["Ortaçağ El Yazması Kitaplar", "Mağara Resimlemeleri", "Papirüs", "Capitalis Quadrata"],
        answer: 1,
        img: "./images/quiz/magara-resimleri.png"
    }
];

// 🔧 Tanımlanmamış değişkenleri ekleyelim
let current = 0;
let score = 0;

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const quizContainer = document.getElementById("quizContainer");
const questionText = document.getElementById("questionText");
const optionsArea = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const ada = document.getElementById("ada");
const quizImage = document.getElementById("quizImage");

// ✅ Başlat butonuna tıklanınca quiz başlasın
startBtn.addEventListener("click", () => {

    document.body.style.overflow = 'hidden';
    startScreen.classList.add("loaded");
    setTimeout(() => {
       
        quizContainer.classList.add("visible");
        loadQuestion();
    }, 100);
});

function showNext(show) {
    nextBtn.style.display = show ? 'inline-block' : 'none';
}

function loadQuestion() {
   
    const q = questions[current];
    questionText.textContent = q.q;

    // Resim önce bulanık olur
    quizImage.style.transition = 'none';
    quizImage.style.filter = 'blur(25px)';
    quizImage.getBoundingClientRect(); // repaint
    quizImage.src = q.img;
    setTimeout(() => {
        quizImage.style.transition = 'filter 600ms ease';
    }, 30);

    // Şıkları oluştur
    optionsArea.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.type = "button";
        btn.onclick = () => checkAnswer(i);
        optionsArea.appendChild(btn);
    });

    showNext(false);
    if (ada) ada.classList.remove('hidden-slide');
}

function checkAnswer(selected) {
    const q = questions[current];
    const buttons = optionsArea.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) btn.classList.add("correct");
        if (i === selected && selected !== q.answer) btn.classList.add("wrong");
    });

    if (selected === q.answer) {
        score += 10;
        if (scoreDisplay) scoreDisplay.textContent = score;
    }

    // Cevap sonrası resim netleşsin
    quizImage.style.transition = 'filter 600ms ease';
    quizImage.style.filter = 'blur(0px)';

    if (ada) ada.classList.add('hidden-slide');
    showNext(true);
}


nextBtn.addEventListener('click', () => {
    current++;
    if (current < questions.length) {
        loadQuestion();
    } else {
        // ✅ Quiz bittiğinde sonuç ekranı
        const percent = Math.round((score / (questions.length * 10)) * 100);

        // quiz alanlarını saydam yap
        const leftCol = document.querySelector('.quiz-main-left');
        const rightCol = document.querySelector('.quiz-main-right');
        const scoreArea = document.querySelector('.quiz-container > article');
        if (leftCol) leftCol.style.opacity = '0';
        if (rightCol) rightCol.style.opacity = '0';
        if (rightCol) scoreArea.style.opacity = '0';

        quizContainer.innerHTML += `
          <div class="result-screen">
            <span>Başarı Oranın </span>
            <h2>${percent}%</h2>
            <a href="javascript:void(0)" class="restart-btn">Yeni Konuya Geç</a>
          </div>`;



        const restartBtn = document.querySelector('.restart-btn');
        restartBtn.addEventListener('click', () => {
            // Scroll aktif
            document.body.style.overflow = 'auto';

            window.removeEventListener('scroll', handleScrollLock);

            // Quiz ekranını gizle
            const quizGame = document.querySelector('.quiz-game');
            if (quizGame) quizGame.style.display = 'none';

               setTimeout(() => {
                ScrollTrigger.refresh(true);
            }, 300);

            // ✅ LocalStorage’a kaydet
            localStorage.setItem("quizHidden", "true");
        });

    }
});



window.addEventListener("load", () => {
    const quizGame = document.querySelector(".quiz-game");
    if (localStorage.getItem("quizHidden") === "true" && quizGame) {
        quizGame.style.display = "none";
        document.body.style.overflow = "auto";
        setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh(true);
            }
        }, 100);
    }
});

function handleScrollLock() {
    const quizGame = document.querySelector('.quiz-game');
    if (!quizGame || window.getComputedStyle(quizGame).display === 'none') return;

    const quizTop = Math.round(quizGame.getBoundingClientRect().top + window.scrollY);
    if (window.scrollY > quizTop) {
        window.scrollTo(0, quizTop);
    }
}

// Scroll listener'ı bir kez ekliyoruz
window.addEventListener('scroll', handleScrollLock);
