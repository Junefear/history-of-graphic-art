console.clear();

gsap.registerPlugin(ScrollTrigger);

function wrapperZoom() {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".wrapperZoom",
            start: "top top",
            end: "+=110%",
            pin: true,
            scrub: 1.2, // daha yumuşak geçiş
            anticipatePin: 1
        }
    })
        .to(".front-image", {
            scale: 2.1,
            z: 350,
            transformOrigin: "center center",
            ease: "power2.inOut"
        })
        .to(".section.hero", {
            scale: 1,
            transformOrigin: "center center",
            ease: "power2.inOut"
        }, "<")
        .to(".hero-text, .hero-des", {
            opacity: 1,
            scale: 1,
            ease: "power2.out"
        }, "-=70%"); // animasyon ortalarında gelsin
}

function horizontalScroll() {
    const pinWraps = document.querySelectorAll(".pin-wrap, .pin-wrap-2, .pin-wrap-3, .pin-wrap-4");
    if (!pinWraps.length) return [];

    const tweens = [];

    pinWraps.forEach((pinWrap, index) => {
        const pinSection = pinWrap.closest(".sectionPin, .sectionPin-2, .sectionPin-3, .sectionPin-4");
        const pinWrapWidth = pinWrap.scrollWidth;
        const scrollLength = pinWrapWidth - window.innerWidth;

        // Her scroll alanına özgü timeline bağlantıları (isteğe göre ortak da olabilir)
        const anchors = Array.from(document.querySelectorAll(".time-line a"));
        const map = anchors.map(a => {
            const id = a.getAttribute("href").replace("#", "");
            return { a, id, el: document.getElementById(id) };
        });

        let currentActiveId = null;

        const tween = gsap.to(pinWrap, {
            x: -scrollLength,
            ease: "none",
            onUpdate: function () {
                const x = Math.abs(gsap.getProperty(pinWrap, "x")) || 0;
                const center = x + (window.innerWidth / 2);

                let nearest = null;
                let nearestDist = Infinity;

                map.forEach(item => {
                    if (!item.el) return;
                    const elMid = item.el.offsetLeft + (item.el.offsetWidth / 2);
                    const dist = Math.abs(elMid - center);
                    if (dist < nearestDist) {
                        nearestDist = dist;
                        nearest = item;
                    }
                });

                if (nearest && nearest.id !== currentActiveId) {
                    currentActiveId = nearest.id;
                    anchors.forEach(a => a.classList.remove("active"));
                    const found = anchors.find(
                        a => a.getAttribute("href").replace("#", "") === currentActiveId
                    );
                    if (found) found.classList.add("active");
                }
            },
            scrollTrigger: {
                id: `hscroll-${index}`,
                trigger: pinSection,
                start: "top top",
                end: () => `+=${scrollLength + window.innerHeight}`,
                scrub: 1.1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: false
            }
        });

        tweens.push(tween);
    });

    return tweens;
}




function welcomeAnimate() {
    gsap.from(".welcome-area > span, .welcome-area > h1", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".welcome-area",
            start: "top 50%",             // sol kenar, viewport’un %80 noktasına geldiğinde başla
            end: "top 5%",               // opsiyonel: istersen animasyon alanını daralt
            toggleActions: "play none play reverse",
            scrub: false,
            markers: false
        }
    });
}









function periodOne(hTween) {
    gsap.fromTo(".main-text",
        { opacity: 0, x: 60 },
        {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".section-one",
                containerAnimation: hTween,
                invalidateOnRefresh: true,
                start: "left 80%",
                end: "left 20%",
                toggleActions: "play none play reverse",
                scrub: false,
                markers: false
            }
        }
    );
    gsap.fromTo(".sub-text",
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".section-one",
                containerAnimation: hTween,
                invalidateOnRefresh: true,
                start: "left 80%",
                end: "left 20%",
                toggleActions: "play none play reverse",
                scrub: false,
                markers: false
            }
        }
    );
}

function SubjectTextAnimate(hTween) {

    gsap.from(".prehistoric-period-left > span, .prehistoric-period-left > abbr, .prehistoric-period-left > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".section-two",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });

    gsap.from(".prehistoric-period-right > p", {
        opacity: 0,
        x: 60,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".section-two",
            start: "top 100%",             // sol kenar, viewport’un %80 noktasına geldiğinde başla
            end: "top 5%",               // opsiyonel: istersen animasyon alanını daralt
            toggleActions: "play none play reverse",
            scrub: false,
            markers: false
        }
    });

}




function mezopotamyaAnimate(hTween) {
    gsap.from(".mezopotamya-2", {
        x: 200, // sol dışından gelir
        opacity: 0,
        duration: 4,
        scrollTrigger: {
            containerAnimation: hTween,
            trigger: ".mesopotamian-civilization", // bu kısmı article veya istediğin bölümle değiştir
            start: "center 80%",   // 🔥 tam ortada başlar
            end: "center 50%", // bir miktar sonrasında biter
            scrub: true,                // scroll ile senkronize
        }
    });

    gsap.from(".mezopotamya-4", {
        x: -200, // sağ dışından gelir
        opacity: 0,
        duration: 4,
        scrollTrigger: {
            containerAnimation: hTween,
            trigger: ".mesopotamian-civilization",
            start: "center 80%",   // 🔥 tam ortada başlar
            end: "center 50%", // bir miktar sonrasında biter
            scrub: true,
        }
    });

    gsap.from(".mesopotamian-civilization-area > span, .mesopotamian-civilization-area > abbr, .mesopotamian-civilization-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".mesopotamian-civilization",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}


function alphabetsAnimate(hTween) {

    gsap.from(".alphabets-area > span, .alphabets-area > abbr, .alphabets-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".alphabets",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}

function ancientEgyptAnimate(hTween) {

    gsap.from(".ancient-egypt-area > span, .ancient-egypt-area > abbr, .ancient-egypt-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".ancient-egypt",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}


function chinesGraphicDesignAnimate(hTween) {

    gsap.from(".chines-graphic-desing-area > span, .chines-graphic-desing-area > abbr, .chines-graphic-desing-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".chines-graphic-desing",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}

function manuscriptsAnimate(hTween) {
    gsap.from(".manuscripts-img-1", {
        x: 100, // sol dışından gelir
        opacity: 0,
        duration: 2,
        scrollTrigger: {
            containerAnimation: hTween,
            trigger: ".manuscripts", // bu kısmı article veya istediğin bölümle değiştir
            start: "center 80%",   // 🔥 tam ortada başlar
            end: "center 50%", // bir miktar sonrasında biter
            scrub: true,                // scroll ile senkronize
        }
    });

    gsap.from(".manuscripts-img-2", {
        x: 400, // sol dışından gelir
        opacity: 0,
        duration: 2,
        scrollTrigger: {
            containerAnimation: hTween,
            trigger: ".manuscripts", // bu kısmı article veya istediğin bölümle değiştir
            start: "center 80%",   // 🔥 tam ortada başlar
            end: "center 50%", // bir miktar sonrasında biter
            scrub: true,                // scroll ile senkronize
        }
    });

    gsap.from(".manuscripts-img-3", {
        x: 800, // sağ dışından gelir
        opacity: 0,
        duration: 2,
        scrollTrigger: {
            containerAnimation: hTween,
            trigger: ".manuscripts",
            start: "center 80%",   // 🔥 tam ortada başlar
            end: "center 50%", // bir miktar sonrasında biter
            scrub: true,
        }
    });

    gsap.from(".manuscripts-area > span, .manuscripts-area > abbr, .manuscripts-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".manuscripts",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}



function DiamondArea(hTween) {
    const texts = gsap.utils.toArray('.demo-text');

    if (texts.length >= 2) {
        // 1. metin genişliği
        const text1Width = texts[0].querySelector('.wrappera').scrollWidth;
        const text2Width = texts[1].querySelector('.wrappera').scrollWidth;

        // timeline containerAnimation'a bağlı
        gsap.timeline({
            scrollTrigger: {
                trigger: ".chines-graphic-desing-3",
                containerAnimation: hTween, // ✅ yatay scroll'a bağla
                start: "left-=750 center",
                end: "right+=750 center",
                scrub: 1.5,
                markers: false // test için aç
            }
        })
            // 1. metin: sağdan sola
            .fromTo(
                texts[0].querySelector('.wrappera'),
                { x: `${texts[0].offsetWidth}px` },
                { x: `-${text1Width / 1.2}px`, ease: "none" }
            )
            // 2. metin: soldan sağa
            .fromTo(
                texts[1].querySelector('.wrappera'),
                { x: `-${text2Width}px` },
                { x: `${texts[1].offsetWidth / 1}px`, ease: "none" },
                0 // aynı anda başlat
            );
    }
}


function imageReveal(hTween, containerSelector) {
    const revealContainers = containerSelector
        ? document.querySelectorAll(`${containerSelector} .reveal`)
        : document.querySelectorAll(".reveal");

    revealContainers.forEach((container) => {
        let clipPath;
        if (container.classList.contains("reveal--left")) clipPath = "inset(0 0 0 100%)";
        if (container.classList.contains("reveal--right")) clipPath = "inset(0 100% 0 0)";
        if (container.classList.contains("reveal--top")) clipPath = "inset(0 0 100% 0)";
        if (container.classList.contains("reveal--bottom")) clipPath = "inset(100% 0 0 0)";

        const image = container.querySelector("img");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                containerAnimation: hTween,
                toggleActions: "restart none none reset",
                markers: false
            }
        });

        tl.set(container, { autoAlpha: 1 });
        tl.from(container, { clipPath, duration: 1, delay: 0.2, ease: Power4.easeInOut });

        if (container.classList.contains("reveal--overlay")) {
            tl.from(image, { clipPath, duration: 0.6, ease: Power4.easeOut });
        }

        tl.from(image, { scale: 1.3, duration: 1.2, delay: -1, ease: Power2.easeOut });
    });
}


function resetScrollPositions(hTween) {


    gsap.fromTo(".st-1",
        { y: "-15%" },
        {
            y: "15%",
            ease: "none",
            scrollTrigger: {
                containerAnimation: hTween,
                trigger: ".germany-image-book-2",
                start: "left center",
                end: "right center",
                scrub: true,
            }
        }
    );

    gsap.fromTo(".st-2",
        { y: "15%" },
        {
            y: "-15%",
            ease: "none",
            scrollTrigger: {
                containerAnimation: hTween,
                trigger: ".germany-image-book-2",
                start: "left center",
                end: "right center",
                scrub: true,
            }
        }
    );
}

function fontDesing(hTween) {


    // Yardımcı fonksiyon: her resme uçuş animasyonu uygular
    const fly = (selector, amountX, amountY) => {
        gsap.fromTo(selector,
            { x: `${-amountX}%`, y: `${-amountY}%`, scale: 0.9 },
            {
                x: `${amountX}%`,
                y: `${amountY}%`,
                scale: 1.25,
                ease: "none",
                scrollTrigger: {
                    containerAnimation: hTween,
                    trigger: ".font-design-3",
                    start: "left center",
                    end: "right center",
                    scrub: true,
                }
            }
        );
    };

    fly(".t-1", -75, 0);
    fly(".t-2", -100, -50);
    fly(".t-3", 175, -60);

    fly(".b-1", -125, 75);
    fly(".b-2", 100, 50);
    fly(".b-3", -175, 90);
}

function periodTwo(hTween) {
    gsap.fromTo(".topic-period > h2",
        { opacity: 0, y: 180 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".topic-two",
                containerAnimation: hTween,
                invalidateOnRefresh: true,
                start: "left 80%",
                end: "left 20%",
                toggleActions: "play none play reverse",
                markers: false
            }
        }
    );

    gsap.fromTo(".topic-period > div",
        { opacity: 0, x: 300 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".topic-two",
                containerAnimation: hTween,
                invalidateOnRefresh: true,
                start: "left 80%",
                end: "left 20%",
                toggleActions: "play none play reverse",
                markers: false
            }
        }
    );
}

function learningWords(hTween) {
    // container'ı çöz

    // Eğer containerAnim varsa yatay başlangıç/bitiş kullan; yoksa dikey start/end kullan
    const start = hTween ? "left center" : "top 75%";
    const end = hTween ? "right center" : "top 40%";

    gsap.fromTo(".learnini-gif",
        {
            width: "0%",
            opacity: 0,
            y: 50,
            transformOrigin: "left center"
        },
        {
            width: "60%",
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                containerAnimation: hTween,
                invalidateOnRefresh: true,
                trigger: ".learning-words",
                start: start,
                end: end,
                toggleActions: "play none play reverse",
                scrub: false,
                markers: false
            }
        }
    );
}

function letterpressAnimate(hTween) {

    gsap.from(".letterpress-area > span, .letterpress-area > abbr, .letterpress-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".letterpress",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}

function germanyBookAnimate(hTween) {

    gsap.from(".germany-image-book-area > span, .germany-image-book-area > abbr, .germany-image-book-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".germany-image-book",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}

function fontDesignAnimate(hTween) {

    gsap.from(".font-design-area > span, .font-design-area > abbr, .font-design-area > section > p", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".font-design",
            containerAnimation: hTween,        // 🔴 kritik bağ
            start: "left 70%",                 // .section-two sol kenarı viewport’un %70 noktasında
            toggleActions: "play none play reverse",
            invalidateOnRefresh: true,
            scrub: false,
            markers: false
        }
    });
}

window.addEventListener("load", () => {
    const scrollPos = sessionStorage.getItem("scrollPos");

    // 1️⃣ Giriş animasyonları
    wrapperZoom();
    welcomeAnimate();

    // 2️⃣ Tüm yatay scroll’ları oluştur
    const hTweens = horizontalScroll(); // artık array döner

    // Eğer iki yatay alan varsa:
    const firstH = hTweens[0];
    const secondH = hTweens[1];
    const thirdH = hTweens[2];
    const fourthH = hTweens[3];

    // 3️⃣ İlk yatay scroll alanına bağlı animasyonlar
    if (firstH) {
        periodOne(firstH);
        SubjectTextAnimate(firstH);
        mezopotamyaAnimate(firstH);
        alphabetsAnimate(firstH);
        ancientEgyptAnimate(firstH);
        chinesGraphicDesignAnimate(firstH);
        manuscriptsAnimate(firstH);
        DiamondArea(firstH);
        imageReveal(firstH, ".pin-wrap");
    }

    // 4️⃣ İkinci yatay scroll alanına bağlı animasyonlar
    if (secondH) {
        imageReveal(secondH, ".pin-wrap-2");
        resetScrollPositions(secondH);
        fontDesing(secondH);
        learningWords(secondH);
        letterpressAnimate(secondH);
        germanyBookAnimate(secondH);
        fontDesignAnimate(secondH);
    }

    if (thirdH) {
        imageReveal(thirdH, ".pin-wrap-3");
    }

    if (fourthH) {
        imageReveal(fourthH, ".pin-wrap-4");
    }

    // 5️⃣ Dikey (yataydan bağımsız) animasyonlar
    if (secondH) periodTwo(secondH);

    // 6️⃣ Timeline tıklamaları (her iki yatay alan için)
    document.querySelectorAll(".time-line a").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".time-line a").forEach(a => a.classList.remove("active"));
            btn.classList.add("active");

            const targetId = btn.getAttribute("href").replace("#", "");
            const targetEl = document.getElementById(targetId);

            // 🔹 Hedef hangi pin-wrap içinde?
            const pinWrap = targetEl?.closest(".pin-wrap, .pin-wrap-2, .pin-wrap-3, .pin-wrap-4");
            let hTween = null;

            if (pinWrap?.classList.contains("pin-wrap-4")) {
                hTween = fourthH; // dördüncü yatay scroll timeline’ı
            } else if (pinWrap?.classList.contains("pin-wrap-3")) {
                hTween = thirdH; // üçüncü yatay scroll timeline’ı
            } else if (pinWrap?.classList.contains("pin-wrap-2")) {
                hTween = secondH;
            } else if (pinWrap?.classList.contains("pin-wrap")) {
                hTween = firstH;
            }

            if (targetEl && hTween && pinWrap) {
                const targetOffset = targetEl.offsetLeft;
                const scrollLength = pinWrap.scrollWidth - window.innerWidth;

                gsap.to(hTween, {
                    duration: 1,
                    progress: targetOffset / scrollLength,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        const st = ScrollTrigger.getById(hTween.vars.scrollTrigger.id);
                        if (st) {
                            st.scroll(hTween.progress() * (st.end - st.start) + st.start);
                        }
                    }
                });
            }
        });
    });

    // 7️⃣ Menu-nav tıklamaları → ilgili sectionPin'e scroll
    const sectionStMap = {
        "sectionPin":   "hscroll-0",
        "sectionPin-2": "hscroll-1",
        "sectionPin-3": "hscroll-2",
        "sectionPin-4": "hscroll-3"
    };

    document.querySelectorAll(".menu-item").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").replace("#", "");
            const stId = sectionStMap[targetId];
            if (stId) {
                const st = ScrollTrigger.getById(stId);
                if (st) {
                    window.scrollTo({ top: st.start, behavior: "smooth" });
                }
            }
            if (typeof toggleMenu === "function") toggleMenu();
        });
    });

    // 8️⃣ Sayfa yenilendiğinde scroll konumunu koru
    if (scrollPos) {
        window.scrollTo(0, parseFloat(scrollPos));
        setTimeout(() => ScrollTrigger.refresh(true), 500);
    }

    ScrollTrigger.refresh();
});

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollPos", window.scrollY);
});
