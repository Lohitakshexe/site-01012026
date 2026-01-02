console.log('NexGen System Initialized');

// Lock scroll during intro
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', () => {

    // Intro Sequence Logic
    const introOverlay = document.querySelector('.intro-overlay');
    const introText = document.querySelector('.intro-text');
    const mainLogo = document.querySelector('#main-logo');

    // 1. Calculate positions for the morph
    // We wait a bit for layout to settle (though it's fixed position)
    setTimeout(() => {
        if (!introText || !mainLogo) return;

        const logoRect = mainLogo.getBoundingClientRect();
        const textRect = introText.getBoundingClientRect();

        // Calculate translation deltas
        // Destination center - Source center
        const deltaX = (logoRect.left + logoRect.width / 2) - (textRect.left + textRect.width / 2);
        const deltaY = (logoRect.top + logoRect.height / 2) - (textRect.top + textRect.height / 2);

        // Calculate scale factor (approximate based on height)
        const scale = logoRect.height / textRect.height;
        // Actually, let's just use translation and font-size transition if we can, 
        // but transform is smoother.
        // The logo font size is 1.5rem (~24px). Intro font size is 4rem (~64px).
        // Scale ~ 24/64 = 0.375

        // Trigger Animation
        // We set the transform to the calculated delta
        // We use a keyframe or just direct style transition

        introText.style.transition = 'all 1s cubic-bezier(0.76, 0, 0.24, 1)';
        introText.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.35)`; // Tweaked scale
        introText.style.filter = 'blur(0px)';

        // Fade out overlay bg but keep text
        introOverlay.style.transition = 'background-color 0.8s ease';
        introOverlay.style.overflow = 'hidden'; // ensure no scrollbars appear during move
        introOverlay.style.backgroundColor = 'transparent';

        // After move completes
        setTimeout(() => {
            mainLogo.style.opacity = '1';
            mainLogo.style.transition = 'opacity 0.5s ease';
            introOverlay.style.opacity = '0';
            introOverlay.style.pointerEvents = 'none';
            // Unlock scroll
            document.body.style.overflow = '';
        }, 1000);

    }, 2000); // Wait for the initial 2s text reveal to finish/stabilize

});
