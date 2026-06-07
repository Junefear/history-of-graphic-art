const questions_2 = [
    {
        q: "Yazının icadından sonra insanlık tarihindeki en önemli gelişmelerden biri olan buluş aşağıdakilerden hangisidir?",
        options_2: ["Litografi (taş baskı)", "Ahşap baskı", "Tipo Baskı", "Serigrafi Baskı"],
        answer_2: 1,
        img_2: "./images/quiz/qiuz-2-cevap1.png"
    },
    {
        q: "Grafik tasarım ve baskı teknolojisinde çığır açan tipo baskının mucidi kimdir?",
        options_2: ["JohannGutenberg", "Albrecht Dürer", "Francesco Petrarca", "Leonardo da Vinci"],
        answer_2: 0,
        img_2: "./images/quiz/qiuz-2-cevap2.png"
    },
    {
        q: "Aşağıdakilerden hangisi bir tasarımın metal bir yüzeye kazınması ya da oyulmasıyla elde edilen bir baskı yöntemidir. ",
        options_2: ["Litografi (taş baskı)", "Gravür baskı", "Tipo Baskı", "Serigrafi Baskı"],
        answer_2: 1,
        img_2: "./images/quiz/qiuz-2-cevap3.png"
    },
    {
        q: "Ağaç baskı ustası ve grafik sanatçısı Albrecht Dürer tarafından  en dikkat çekici örnekleri verilen eserler hangisidir?",
        options_2: ["Alman yazı tasarımları ", "Alman afiş tasarımları ", "Alman resimli kitapları ", "Alman resimli broşürler"],
        answer_2: 2,
        img_2: "./images/quiz/qiuz-2-cevap4.png"
    },
    {
        q: " Rönesans’ın hümanizm anlayışı, yazı alanını nasıl etkilemiştir?",
        options_2: ["Özgün ve çeşitli yazı karakterlerinin ortaya çıkmasını sağlamıştır.", "Eserlerde görseller yerine yazılar kullanılmıştır.", "Tipo baskı yöntemi sona ermiştir.", "Yazılar yalnızca afişlerde kullanılmıştır."],
        answer_2: 0,
        img_2: "./images/quiz/qiuz-2-cevap5.png"
    }
];

// 🔧 Tanımlanmamış değişkenleri ekleyelim
let current_2 = 0;
let score_2 = 0;

// Changed: appended underscore to const variable names to avoid duplicates
const startBtn_2 = document.getElementById("startBtn-2");
const startScreen_2 = document.getElementById("startScreen-2");
const quizContainer_2 = document.getElementById("quizContainer-2");
const questionText_2 = document.getElementById("questionText-2");
const optionsArea_2 = document.getElementById("options-2");
const nextBtn_2 = document.getElementById("nextBtn-2");
const scoreDisplay_2 = document.getElementById("scoreDisplay-2");
const ada_2 = document.getElementById("ada-2");
const quizImage_2 = document.getElementById("quizImage-2");

// ✅ Başlat butonuna tıklanınca quiz başlasın
startBtn_2.addEventListener("click", () => {
   
    document.body.style.overflow = 'hidden';
    startScreen_2.classList.add("loaded");
    setTimeout(() => {
        quizContainer_2.classList.add("visible");
        loadQuestion_2();
    }, 100);
});

function showNext_2(show) {
    nextBtn_2.style.display = show ? 'inline-block' : 'none';
}

function loadQuestion_2() {
 
    const q = questions_2[current_2];
    questionText_2.textContent = q.q;

    // Resim önce bulanık olur
    quizImage_2.style.transition = 'none';
    quizImage_2.style.filter = 'blur(25px)';
    quizImage_2.getBoundingClientRect(); // repaint
    quizImage_2.src = q.img_2;
    setTimeout(() => {
        quizImage_2.style.transition = 'filter 600ms ease';
    }, 30);

    // Şıkları oluştur
    optionsArea_2.innerHTML = "";
    q.options_2.forEach((opt, i) => {
        const btn_2 = document.createElement("button");
        btn_2.textContent = opt;
        btn_2.type = "button";
        btn_2.onclick = () => checkAnswer_2(i);
        optionsArea_2.appendChild(btn_2);
    });

    showNext_2(false);
    if (ada_2) ada_2.classList.remove('hidden-slide');
}

function checkAnswer_2(selected) {
    const q = questions_2[current_2];
    const buttons = optionsArea_2.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer_2) btn.classList.add("correct");
        if (i === selected && selected !== q.answer_2) btn.classList.add("wrong");
    });

    if (selected === q.answer_2) {
        score_2 += 10;
        if (scoreDisplay_2) scoreDisplay_2.textContent = score_2;
    }

    // Cevap sonrası resim netleşsin
    quizImage_2.style.transition = 'filter 600ms ease';
    quizImage_2.style.filter = 'blur(0px)';

    if (ada_2) ada_2.classList.add('hidden-slide');
    showNext_2(true);
}


nextBtn_2.addEventListener('click', () => {
    current_2++;
    if (current_2 < questions_2.length) {
        loadQuestion_2();
    } else {
        // ✅ Quiz bittiğinde sonuç ekranı
        const percent = Math.round((score_2 / (questions_2.length * 10)) * 100);

        // quiz alanlarını saydam yap
        const leftCol = document.querySelector('.quiz-main-left-2');
        const rightCol = document.querySelector('.quiz-main-right-2');
        const scoreArea = document.querySelector('.quiz-container-2 > article');
        if (leftCol) leftCol.style.opacity = '0';
        if (rightCol) rightCol.style.opacity = '0';
        if (rightCol) scoreArea.style.opacity = '0';

        quizContainer_2.innerHTML += `
          <div class="result-screen">
            <span>Başarı Oranın </span>
            <h2>${percent}%</h2>
            <a href="javascript:void(0)" class="restart-btn-2">Yeni Konuya Geç</a>
          </div>`;



        const restartBtn = document.querySelector('.restart-btn-2');
        restartBtn.addEventListener('click', () => {
            // Scroll aktif
            document.body.style.overflow = 'auto';

            window.removeEventListener('scroll', handleScrollLock2);

            // Quiz ekranını gizle
            const quizGame = document.querySelector('.quiz-game-2');
            if (quizGame) quizGame.style.display = 'none';

               setTimeout(() => {
                ScrollTrigger.refresh(true);
            }, 300);

            // ✅ LocalStorage’a kaydet
            localStorage.setItem("quiz-2-Hidden", "true");
        });

    }
});



window.addEventListener("load", () => {
    const quizGame = document.querySelector(".quiz-game-2");
    if (localStorage.getItem("quiz-2-Hidden") === "true" && quizGame) {
        quizGame.style.display = "none";
        document.body.style.overflow = "auto";
        setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh(true);
            }
        }, 100);
    }
});


function handleScrollLock2() {
    const quizGame = document.querySelector('.quiz-game-2');
    if (!quizGame || window.getComputedStyle(quizGame).display === 'none') return;

    const quizTop = Math.round(quizGame.getBoundingClientRect().top + window.scrollY);
    if (window.scrollY > quizTop) {
        window.scrollTo(0, quizTop);
    }
}

// Scroll listener'ı bir kez ekliyoruz
window.addEventListener('scroll', handleScrollLock2);
