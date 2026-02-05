// gsap.registerPlugin(ScrollTrigger);

// function multipleHorizontalScrolls() {
//   const sections = document.querySelectorAll(".sectionPin-2");
//   const tweens = [];

//   sections.forEach((section, index) => {
//     const pinWrap = section.querySelector(".pin-wrap-2");
//     if (!pinWrap) return;

//     const scrollLength = pinWrap.scrollWidth - window.innerWidth;
//     const scrollId = `hscroll-${index}`;

//     // 🧭 .time-line içindeki anchor'lar varsa, aktif bölümü takip et
//     const anchors = Array.from(section.querySelectorAll(".time-line a"));
//     const map = anchors.map(a => {
//       const id = a.getAttribute("href").replace("#", "");
//       return { a, id, el: section.querySelector(`#${id}`) };
//     });

//     let currentActiveId = null;

//     const tween = gsap.to(pinWrap, {
//       x: -scrollLength,
//       ease: "none",
//       onUpdate: function () {
//         if (anchors.length === 0) return;

//         const x = Math.abs(gsap.getProperty(pinWrap, "x")) || 0;
//         const center = x + (window.innerWidth / 2);

//         let nearest = null;
//         let nearestDist = Infinity;

//         map.forEach(item => {
//           if (!item.el) return;
//           const elMid = item.el.offsetLeft + (item.el.offsetWidth / 2);
//           const dist = Math.abs(elMid - center);
//           if (dist < nearestDist) {
//             nearestDist = dist;
//             nearest = item;
//           }
//         });

//         if (nearest && nearest.id !== currentActiveId) {
//           currentActiveId = nearest.id;
//           anchors.forEach(a => a.classList.remove("active"));
//           const found = anchors.find(a => a.getAttribute("href").replace("#", "") === currentActiveId);
//           if (found) found.classList.add("active");
//         }
//       },
//       scrollTrigger: {
//         id: scrollId,
//         trigger: section,
//         start: "top top",
//         end: () => "+=" + (scrollLength + window.innerHeight),
//         scrub: 1.1,
//         pin: true,
//         anticipatePin: 1,
//         invalidateOnRefresh: true
//       }
//     });

//     // Tween'i kaydet (hem section'a hem diziye)
//     section._hscrollTween = tween;
//     tweens.push(tween);

//     // 📦 Scroll ilerlemesini sessionStorage’a kaydet
//     ScrollTrigger.create({
//       trigger: section,
//       start: "top top",
//       end: () => "+=" + (scrollLength + window.innerHeight),
//       onUpdate: (self) => {
//         sessionStorage.setItem(`${scrollId}-progress`, self.progress);
//       }
//     });

//     // ♻️ Sayfa yeniden açıldığında eski pozisyona dön
//     const savedProgress = sessionStorage.getItem(`${scrollId}-progress`);
//     if (savedProgress) {
//       gsap.delayedCall(0.5, () => {
//         tween.progress(parseFloat(savedProgress));
//         ScrollTrigger.refresh();
//       });
//     }
//   });

//   return tweens;
// }

// /**
//  * hTweens: tek tween veya tween dizisi
//  * selector: containerAnimation'ı hangi section'a göre seçmek istersen (örn ".learning-words")
//  * döndürür: tek tween (veya null)
//  */
// function resolveContainerAnim(hTweens, selector) {
//   if (!hTweens) return null;

//   // eğer tek tween gönderildiyse direkt döndür
//   if (!Array.isArray(hTweens)) return hTweens;

//   // selector verilmişse, o elementin en yakın .sectionPin-2'sinin tween'ini kullan
//   if (selector) {
//     const el = document.querySelector(selector);
//     if (el) {
//       const section = el.closest(".sectionPin-2");
//       if (section && section._hscrollTween) return section._hscrollTween;
//     }
//   }

//   // fallback: dizinin ilk tweeni
//   return hTweens[0] || null;
// }


// function resetScrollPositions(hTweenOrArray) {
//   let containerAnim = resolveContainerAnim(hTweenOrArray, ".germany-image-book-2");

//   // Eğer containerAnim yoksa return (ya da fallback davranışı uygulayabilirsin)
//   if (!containerAnim) return;

//   gsap.fromTo(".st-1",
//     { y: "-15%" },
//     {
//       y: "15%",
//       ease: "none",
//       scrollTrigger: {
//         containerAnimation: containerAnim,
//         trigger: ".germany-image-book-2",
//         start: "left center",
//         end: "right center",
//         scrub: true,
//       }
//     }
//   );

//   gsap.fromTo(".st-2",
//     { y: "15%" },
//     {
//       y: "-15%",
//       ease: "none",
//       scrollTrigger: {
//         containerAnimation: containerAnim,
//         trigger: ".germany-image-book-2",
//         start: "left center",
//         end: "right center",
//         scrub: true,
//       }
//     }
//   );
// }

// function fontDesing(hTweenOrArray) {
//   let containerAnim = resolveContainerAnim(hTweenOrArray, ".font-design-3");
//   if (!containerAnim) return;

//   // Yardımcı fonksiyon: her resme uçuş animasyonu uygular
//   const fly = (selector, amountX, amountY) => {
//     gsap.fromTo(selector,
//       { x: `${-amountX}%`, y: `${-amountY}%`, scale: 0.9 },
//       {
//         x: `${amountX}%`,
//         y: `${amountY}%`,
//         scale: 1.25,
//         ease: "none",
//         scrollTrigger: {
//           containerAnimation: containerAnim,
//           trigger: ".font-design-3",
//           start: "left center",
//           end: "right center",
//           scrub: true,
//         }
//       }
//     );
//   };

//   fly(".t-1", -75, 0);
//   fly(".t-2", -100, -50);
//   fly(".t-3", 175, -60);

//   fly(".b-1", -125, 75);
//   fly(".b-2", 100, 50);
//   fly(".b-3", -175, 90);
// }

// function periodTwo() {
//   gsap.fromTo(".topic-period > h2",
//     { opacity: 0, y: 180 },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".topic-two",
//         start: "top 70%",
//         end: "top 30%",
//         toggleActions: "play none none reverse",
//         markers: false
//       }
//     }
//   );

//   gsap.fromTo(".topic-period > div",
//     { opacity: 0, x: 300 },
//     {
//       opacity: 1,
//       x: 0,
//       duration: 1,
//       ease: "power3.out",
//       stagger: 0.15,
//       scrollTrigger: {
//         trigger: ".topic-two",
//         start: "top 70%",
//         end: "top 30%",
//         toggleActions: "play none none reverse",
//         markers: false
//       }
//     }
//   );
// }

// function learningWords(hTweens) {
//   // container'ı çöz
//   const containerAnim = resolveContainerAnim(hTweens, ".learning-words");

//   // Eğer containerAnim varsa yatay başlangıç/bitiş kullan; yoksa dikey start/end kullan
//   const start = containerAnim ? "left center" : "top 75%";
//   const end = containerAnim ? "right center" : "top 40%";

//   gsap.fromTo(".learnini-gif",
//     {
//       width: "0%",
//       opacity: 0,
//       y: 50,
//       transformOrigin: "left center"
//     },
//     {
//       width: "60%",
//       opacity: 1,
//       y: 0,
//       duration: 1.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         containerAnimation: containerAnim,
//         trigger: ".learning-words",
//         start: start,
//         end: end,
//         toggleActions: "play none none reverse",
//         scrub: false,
//         markers: false
//       }
//     }
//   );
// }


// window.addEventListener("load", () => {
//   const scrollPos = sessionStorage.getItem("scrollPos2");
//   if (scrollPos) window.scrollTo(0, parseFloat(scrollPos));

//   const hTweens = multipleHorizontalScrolls(); // dizi döner
//   periodTwo();                                   // dikey animasyon
//   resetScrollPositions(hTweens);
//   fontDesing(hTweens);
//   learningWords(hTweens);
// });

// window.addEventListener("beforeunload", () => {
//   sessionStorage.setItem("scrollPos2", window.scrollY);
// });
