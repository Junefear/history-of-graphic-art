const questions_3 = [
    {
        q: "Hangisi günümüzde kullanılan ofset baskı tekniğinin atası olarak kabul edilen buluştur?",
        options_3: ["Litografi (taş baskı)", "Gravür baskı", "Tipo Baskı", "Serigrafi Baskı"],
        answer_3: 0,
        img_3: "./images/quiz/qiuz-3-cevap-1.png"
    },
    {
        q: "Hangisi gazete, dergi ve kitap gibi tipografi ağırlıklı basılı materyallerin üretimini hızlandırmış ve ekonomik bir şekilde çoğaltılmasını sağlayan buluştur? ",
        options_3: ["Ahşap Baskı Makinesi", "Mürekkep Baskı Makinesi", "Tipo Baskı Makinesi", "Linotype Makinesi"],
        answer_3: 3,
        img_3: "./images/quiz/qiuz-3-cevap-2.png"
    },
    {
        q: "Hangisi yalnızca tipografi ve illüstrasyona bağlı kalmadan tasarımlarda gerçekliğin birebir temsiline imkan tanıyan buluştur?",
        options_3: ["Linotype Makinesi", "Litografi Baskı Makinesi", "Fotoğraf Makinesi", "Ahşap Baskı Makinesi"],
        answer_3: 1,
        img_3: "./images/quiz/qiuz-3-cevap-3.png"
    },
    {
        q: "Hangisi 'Sanat ve El Sanatları' anlamında, sanayileşen bir anlamda ucuzlaşan tasarımlara karşı ortaya çıkan akımdır?",
        options_3: ["Kübizm ", "Art and Crafts", "Dadaizm", "Bauhaus"],
        answer_3: 2,
        img_3: "./images/quiz/qiuz-3-cevap-4.png"
    },
    {
        q: "Hangisi Arts and Crafts sonrasında mimari, ürün tasarımI, resim sanatı ve grafik tasarım gibi birçok alanda varlık gösteren, çok yönlü dekoratif bir üsluptur? ",
        options_3: ["Kübizm", "Pop Art", "Dadaizm", "Art Nouveau"],
        answer_3: 0,
        img_3: "./images/quiz/qiuz-3-cevap-5.png"
    }
];

// 🔧 Tanımlanmamış değişkenleri ekleyelim
let current_3 = 0;
let score_3 = 0;

// Changed: appended underscore to const variable names to avoid duplicates
const startBtn_3 = document.getElementById("startBtn-3");
const startScreen_3 = document.getElementById("startScreen-3");
const quizContainer_3 = document.getElementById("quizContainer-3");
const questionText_3 = document.getElementById("questionText-3");
const optionsArea_3 = document.getElementById("options-3");
const nextBtn_3 = document.getElementById("nextBtn-3");
const scoreDisplay_3 = document.getElementById("scoreDisplay-3");
const ada_3 = document.getElementById("ada-3");
const quizImage_3 = document.getElementById("quizImage-3");

// ✅ Başlat butonuna tıklanınca quiz başlasın
startBtn_3.addEventListener("click", () => {

    document.body.style.overflow = 'hidden';
    startScreen_3.classList.add("loaded");
    setTimeout(() => {
        quizContainer_3.classList.add("visible");
        loadQuestion_3();
    }, 100);
});

function showNext_3(show) {
    nextBtn_3.style.display = show ? 'inline-block' : 'none';
}

function loadQuestion_3() {

    const q = questions_3[current_3];
    questionText_3.textContent = q.q;

    // Resim önce bulanık olur
    quizImage_3.style.transition = 'none';
    quizImage_3.style.filter = 'blur(25px)';
    quizImage_3.getBoundingClientRect(); // repaint
    quizImage_3.src = q.img_3;
    setTimeout(() => {
        quizImage_3.style.transition = 'filter 600ms ease';
    }, 30);

    // Şıkları oluştur
    optionsArea_3.innerHTML = "";
    q.options_3.forEach((opt, i) => {
        const btn_3 = document.createElement("button");
        btn_3.textContent = opt;
        btn_3.type = "button";
        btn_3.onclick = () => checkAnswer_3(i);
        optionsArea_3.appendChild(btn_3);
    });

    showNext_3(false);
    if (ada_3) ada_3.classList.remove('hidden-slide');
}

function checkAnswer_3(selected) {
    const q = questions_3[current_3];
    const buttons = optionsArea_3.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer_3) btn.classList.add("correct");
        if (i === selected && selected !== q.answer_3) btn.classList.add("wrong");
    });

    if (selected === q.answer_3) {
        score_3 += 10;
        if (scoreDisplay_3) scoreDisplay_3.textContent = score_3;
    }

    // Cevap sonrası resim netleşsin
    quizImage_3.style.transition = 'filter 600ms ease';
    quizImage_3.style.filter = 'blur(0px)';

    if (ada_3) ada_3.classList.add('hidden-slide');
    showNext_3(true);
}


nextBtn_3.addEventListener('click', () => {
    current_3++;
    if (current_3 < questions_3.length) {
        loadQuestion_3();
    } else {
        // ✅ Quiz bittiğinde sonuç ekranı
        const percent = Math.round((score_3 / (questions_3.length * 10)) * 100);

        // quiz alanlarını saydam yap
        const leftCol = document.querySelector('.quiz-main-left-3');
        const rightCol = document.querySelector('.quiz-main-right-3');
        const scoreArea = document.querySelector('.quiz-container-3 > article');
        if (leftCol) leftCol.style.opacity = '0';
        if (rightCol) rightCol.style.opacity = '0';
        if (rightCol) scoreArea.style.opacity = '0';

        quizContainer_3.innerHTML += `
          <div class="result-screen">
            <span>Başarı Oranın </span>
            <h2>${percent}%</h2>
            <a href="javascript:void(0)" class="restart-btn-3">Yeni Konuya Geç</a>
          </div>`;



        const restartBtn = document.querySelector('.restart-btn-3');
        restartBtn.addEventListener('click', () => {
            // Scroll aktif
            document.body.style.overflow = 'auto';

            window.removeEventListener('scroll', handleScrollLock3);

            // Quiz ekranını gizle
            const quizGame = document.querySelector('.quiz-game-3');
            if (quizGame) quizGame.style.display = 'none';

               setTimeout(() => {
                ScrollTrigger.refresh(true);
            }, 300);

            // ✅ LocalStorage’a kaydet
            localStorage.setItem("quiz-3-Hidden", "true");
        });

    }
});



window.addEventListener("load", () => {
    const quizGame = document.querySelector(".quiz-game-3");
    if (localStorage.getItem("quiz-3-Hidden") === "true" && quizGame) {
        quizGame.style.display = "none";
        document.body.style.overflow = "auto";
        setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh(true);
            }
        }, 100);
    }
});


function handleScrollLock3() {
    const quizGame = document.querySelector('.quiz-game-3');
    if (!quizGame || window.getComputedStyle(quizGame).display === 'none') return;

    const quizTop = Math.round(quizGame.getBoundingClientRect().top + window.scrollY);
    if (window.scrollY > quizTop) {
        window.scrollTo(0, quizTop);
    }
}

// Scroll listener'ı bir kez ekliyoruz
window.addEventListener('scroll', handleScrollLock3);
