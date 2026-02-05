window.addEventListener("beforeunload", () => {
    loco.scrollTo(0, { duration: 0, disableLerp: true });
});

gsap.registerPlugin(ScrollTrigger);

const scrollContainer = document.querySelector(".scroll-container");

const loco = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true
});

loco.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
        return arguments.length
            ? loco.scrollTo(value, 0, 0)
            : loco.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed"
});

function wrapperZoom() {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".wrapper",
            scroller: scrollContainer,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true
        }
    })
        .to([".wrapper__image", ".wrapper__image-container"],
            { scale: 1.9, z: 350, ease: "power1.inOut" }, 0) // aynı anda başlat
        .to(".section--hero",
            { scale: 1, ease: "power1.inOut" }, 0); // aynı anda başlat
}

function horizontalScroll() {
    const pinWrap = document.querySelector(".pin-wrap");
    const pinWrapWidth = pinWrap.scrollWidth;
    const scrollLength = pinWrapWidth - window.innerWidth;

    gsap.to(pinWrap, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
            trigger: "#sectionPin",
            scroller: scrollContainer,
            start: "top top",
            end: () => "+=" + pinWrapWidth,
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });
}

window.addEventListener("load", () => {
    wrapperZoom();
    horizontalScroll();

    ScrollTrigger.addEventListener("refresh", () => loco.update());
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});