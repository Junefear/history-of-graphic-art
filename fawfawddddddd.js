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
    const pinWrap = document.querySelector(".pin-wrap");
    if (!pinWrap) return null;

    const pinWrapWidth = pinWrap.scrollWidth;
    const scrollLength = pinWrapWidth - window.innerWidth;

    const tween = gsap.to(pinWrap, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
            id: "hscroll",
            trigger: ".sectionPin",
            start: "top top",
            end: () => `+=${scrollLength + window.innerHeight}`,
            scrub: 1.1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    return tween;
}

// function wordsSlideFromRight() {
//     const elements = document.querySelectorAll("[words-slide-from-right]");
//     elements.forEach((element) => {
//         const tl = gsap.timeline({ paused: true });
//         const words = element.querySelectorAll(".word");
//         tl.from(words, {
//             opacity: 0,
//             x: "1em",
//             duration: 0.6,
//             ease: "power2.out",
//             stagger: { amount: 0.2 },
//         });

//         ScrollTrigger.create({
//             trigger: ".sectionPin", // sadece sectionPin alanına gelince
//             start: "top center",
//             onEnter: () => tl.play(),
//             onLeaveBack: () => tl.progress(0).pause()
//         });
//     });
// }
//function wordsSlideFromRight() {
//     let reveal = document.querySelectorAll(".section-period");

//     reveal.forEach((el) => {
//         let headings = el.querySelectorAll("h2");

//         let tl = gsap.timeline()
//             .from(headings, {
//                 x: 80,
//                 y: 40,
//                 autoAlpha: 0,       // opacity + visibility
//                 duration: 1,
//                 ease: "power3.out",
//                 stagger: 0.12
//             });

//         ScrollTrigger.create({
//             trigger: el,
//             start: "top 85%",
//             end: "top 40%",
//             scrub: false,          // scrub kapalı, daha pürüzsüz
//             markers: false,
//             toggleActions: "play none none reverse",
//             animation: tl
//         });
//     });
// }



// function textanimate(hTween) {
//     gsap.from(".section-one .section-period > h2", {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//             trigger: ".section-one",
//             containerAnimation: hTween,
//             start: "left 80%",                 // .section-one soldan %80 görünürken
//             toggleActions: "play none none reverse",
//             markers: false
//         }
//     });
// }

// function imageReveal() {
//     const revealContainers = document.querySelectorAll(".reveal");

//     revealContainers.forEach((container) => {
//         let clipPath;

//         // Left to right
//         if (container.classList.contains("reveal--left")) {
//             clipPath = "inset(0 0 0 100%)";
//         }
//         // Right to left
//         if (container.classList.contains("reveal--right")) {
//             clipPath = "inset(0 100% 0 0)";
//         }
//         // Top to bottom
//         if (container.classList.contains("reveal--top")) {
//             clipPath = "inset(0 0 100% 0)";
//         }
//         // Bottom to top
//         if (container.classList.contains("reveal--bottom")) {
//             clipPath = "inset(100% 0 0 0)";
//         }

//         const image = container.querySelector("img");

//         // Animation trigger
//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: container,
//                 start: "top bottom",
//                 end: "bottom top",
//                 //markers: true, // Turn on to show trigger markers
//                 toggleActions: "restart none none reset"
//             }
//         });

//         // Animation timeline
//         tl.set(container, { autoAlpha: 1 });
//         tl.from(container, {
//             clipPath,
//             duration: 1,
//             delay: 0.2,
//             ease: Power4.easeInOut
//         });
//         if (container.classList.contains("reveal--overlay")) {
//             tl.from(image, { clipPath, duration: 0.6, ease: Power4.easeOut });
//         }
//         tl.from(image, {
//             scale: 1.3,
//             duration: 1.2,
//             delay: -1,
//             ease: Power2.easeOut
//         });
//     });

//     ScrollTrigger.refresh();
// }


function spanAnimate(hTween) {
    if (!hTween) return;

    ScrollTrigger.matchMedia({
        // Tüm ekran boyutları için
        "(min-width: 0px)": function () {
            gsap.from(".prehistoric-period-left > span, .prehistoric-period-left > abbr, .prehistoric-period-left > section > p", {
                opacity: 0,
                y: 60,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".section-two",
                    containerAnimation: hTween,
                    start: "left 80%",
                    end: "left 40%",
                    toggleActions: "play none none reverse",
                    scrub: false,
                    markers: true, // test için
                    id: "spanAnimate"
                }
            });
        }
    });

    // tüm trigger'lar tanımlandıktan sonra
    ScrollTrigger.refresh();
}

function asdad(hTween) {
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

function syncActiveButtonsOnScroll(hTween) {
    // Eşleştirme: timeline butonları <-> hedef elementler
    const btns = Array.from(document.querySelectorAll(".time-line a"));
    const targets = btns.map(btn => {
        const id = (btn.getAttribute("href") || "").replace("#", "");
        return id ? document.getElementById(id) : null;
    });

    // Güncelleme fonksiyonu: viewport ortasına en yakın hedefi bul
    function update() {
        let closestIndex = -1;
        let minDist = Infinity;
        const viewportCenterX = window.innerWidth / 2;

        targets.forEach((t, i) => {
            if (!t) return;
            const rect = t.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const dist = Math.abs(centerX - viewportCenterX);
            if (dist < minDist) {
                minDist = dist;
                closestIndex = i;
            }
        });

        if (closestIndex !== -1) {
            btns.forEach((b, i) => b.classList.toggle("active", i === closestIndex));
        }
    }

    // Sürekli RAF döngüsü: scroll momentum süresince update çağırır
    let rafId = null;
    let lastEventTime = 0;
    function loop() {
        update();
        // Eğer son event 120ms içinde geldiyse döngüyü sürdür
        if (Date.now() - lastEventTime < 120) {
            rafId = requestAnimationFrame(loop);
        } else {
            rafId = null;
        }
    }

    function onScrollEvent() {
        lastEventTime = Date.now();
        if (!rafId) rafId = requestAnimationFrame(loop);
    }

    // Dinleyiciler (performans için passive kullanalım)
    window.addEventListener("scroll", onScrollEvent, { passive: true });
    window.addEventListener("resize", onScrollEvent);
    window.addEventListener("wheel", onScrollEvent, { passive: true });
    window.addEventListener("touchmove", onScrollEvent, { passive: true });

    // Eğer yatay tween varsa onun güncellemelerine de bağla (anlık güncelleme)
    if (hTween && typeof hTween.eventCallback === "function") {
        hTween.eventCallback("onUpdate", update);
    } else {
        // ayrıca ScrollTrigger instance'ı varsa update'ine bağlamayı dene
        const st = ScrollTrigger.getById("hscroll");
        if (st) {
            try {
                // bazı GSAP sürümlerinde addEventListener yok, bu yüzden try/catch
                if (typeof st.addEventListener === "function") {
                    st.addEventListener("update", onScrollEvent);
                } else if (st.vars) {
                    const prev = st.vars.onUpdate;
                    st.vars.onUpdate = function() { if (typeof prev === "function") prev.apply(this, arguments); onScrollEvent(); };
                }
            } catch (e) { /* ignore */ }
        }
    }

    // İlk kontrol
    onScrollEvent();
}

window.addEventListener("load", () => {
    const scrollPos = sessionStorage.getItem("scrollPos");

    wrapperZoom();
    const hTween = horizontalScroll();     // tween’i al
    // textanimate(hTween);                   // ve ona bağla
    // imageReveal();
    spanAnimate(hTween);
    asdad(hTween);

    document.querySelectorAll(".time-line a").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            // 🔹 Aktif class'ı yönet
            document.querySelectorAll(".time-line a").forEach(a => a.classList.remove("active"));
            btn.classList.add("active");

            let targetId = btn.getAttribute("href").replace("#", "");
            let targetEl = document.getElementById(targetId);

            if (targetEl && hTween) {
                const pinWrap = document.querySelector(".pin-wrap");

                // Hedef elementin pinWrap içindeki konumu
                const targetOffset = targetEl.offsetLeft;

                // Tween’i o noktaya kaydır
                gsap.to(hTween, {
                    duration: 1,
                    progress: targetOffset / (pinWrap.scrollWidth - window.innerWidth),
                    ease: "power2.inOut",
                    onUpdate: () => {
                        // Mouse scroll ile aynı noktada senkronize et
                        const st = ScrollTrigger.getById("hscroll");
                        if (st) {
                            st.scroll(hTween.progress() * (st.end - st.start) + st.start);
                        }
                    }
                });
            }
        });
    });

    // Yeni: scroll ile butonları senkronize et
    syncActiveButtonsOnScroll(hTween);

    if (scrollPos) {
        window.scrollTo(0, parseFloat(scrollPos));
        setTimeout(() => ScrollTrigger.refresh(), 200);
    }


});

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollPos", window.scrollY);

});
