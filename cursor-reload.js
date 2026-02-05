// Creates a reload button that appears when cursor is over .ancient-egypt-5 .left-layer

(function () {
    // avoid running if DOM not ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // create button
        const btn = document.createElement('button');
        btn.className = 'reload-button';
        btn.type = 'button';
        btn.textContent = 'Reload';
        document.body.appendChild(btn);

        // show/hide state
        let visible = false;

        // mousemove handler: position button and check target
        window.addEventListener('mousemove', (e) => {
            // position near pointer (slightly above)
            btn.style.left = e.clientX + 'px';
            btn.style.top = e.clientY + 'px';

            // find element under the cursor (use the coordinates)
            // elementFromPoint returns the topmost element; check its ancestors
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const overLeft = el && el.closest && el.closest('.ancient-egypt-5 .left-layer');

            if (overLeft) {
                if (!visible) {
                    visible = true;
                    btn.classList.add('show');
                }
            } else {
                if (visible) {
                    visible = false;
                    btn.classList.remove('show');
                }
            }
        }, { passive: true });

        // click -> reload
        btn.addEventListener('click', () => {
            // small visual feedback before reload
            btn.disabled = true;
            btn.textContent = 'Reloading…';
            setTimeout(() => location.reload(), 120);
        });

        // hide the button on mouseleave of window
        window.addEventListener('mouseleave', () => {
            visible = false;
            btn.classList.remove('show');
        });
    }
})();
