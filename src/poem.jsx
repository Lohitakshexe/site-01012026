import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Particles from './Particles';
import TiltedCard from './TiltedCard';

// Custom CSS for the Poem Page to ensure WOW factor
const inlineStyles = `
  @keyframes textFadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
      filter: blur(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  .poem-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at center, #110202 0%, #050505 100%);
    overflow: hidden;
    font-family: 'Outfit', sans-serif;
  }

  .poem-title {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #ffd4d4 0%, #db2777 50%, #e11d48 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
    animation: textFadeIn 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  .poem-stanza {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #ffe4e6;
    margin-bottom: 1.25rem;
    font-weight: 300;
    opacity: 0;
    animation: textFadeIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  .poem-paragraph {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #fda4af;
    margin-bottom: 1.25rem;
    font-weight: 300;
    text-align: justify;
    opacity: 0;
    animation: textFadeIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  .particles-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  /* Custom Cursor Styles matching Main Page */
  #poem-custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    pointer-events: none;
    z-index: 999999;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
  }

  .p-cursor-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    box-sizing: border-box;
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .p-cursor-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .p-cursor-line {
    position: absolute;
    background: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .p-cursor-line.horizontal {
    width: 100%;
    height: 1px;
  }

  .p-cursor-line.vertical {
    width: 1px;
    height: 100%;
  }

  #poem-custom-cursor.hover-active .p-cursor-ring {
    width: 60px;
    height: 60px;
    border-color: #dd6688;
    transform: translate(-10px, -10px);
  }

  #poem-custom-cursor.hover-active .p-cursor-dot {
    background: #dd6688;
    width: 8px;
    height: 8px;
  }

  #poem-custom-cursor.hover-active .p-cursor-line {
    display: none;
  }
`;

function PoemPage() {
  const cursorRef = useRef(null);
  const [hoverActive, setHoverActive] = useState(false);

  useEffect(() => {
    // Inject Custom Stylesheet dynamically
    const styleEl = document.createElement('style');
    styleEl.innerHTML = inlineStyles;
    document.head.appendChild(styleEl);

    // Custom Cursor tracking & global mousemove forwarding to Particles container
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Synthetically dispatch the mousemove event directly to the particles container
      // so the WebGL rendering loop captures interactions anywhere on the screen
      const particlesContainer = document.querySelector('.particles-container');
      if (particlesContainer) {
        const syntheticEvent = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: false,
          cancelable: true
        });
        particlesContainer.dispatchEvent(syntheticEvent);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button')) {
        setHoverActive(true);
      } else {
        setHoverActive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let frameId;
    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(frameId);
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="poem-container">
      {/* Custom interactive particles night sky taking full width & height */}
      <div className="particles-bg">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Center 3D interactive floating card for poem content positioned on top of particles */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TiltedCard
          imageSrc="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23120505'/></svg>"
          altText="Matte Poem Background"
          captionText="To Shreeya, with love 💖"
          containerWidth="100%"
          containerHeight="850px"
          imageWidth="580px"
          imageHeight="780px"
          rotateAmplitude={12}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div style={{
              width: '580px',
              height: '780px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3.5rem 3rem',
              backgroundColor: 'rgb(8, 2, 2)', // 100% solid opaque card - zero translucence
              backdropFilter: 'blur(80px)', // Breathtaking heavy matte silica diffusion
              borderRadius: '15px',
              border: '1.5px solid rgba(225, 29, 72, 0.3)', // Frosted glass highlight border
              boxShadow: 'inset 0 0 50px rgba(225, 29, 72, 0.05), 0 35px 80px rgba(0, 0, 0, 0.9)',
              boxSizing: 'border-box'
            }}>
              <h1 className="poem-title" style={{ margin: 0, marginBottom: '1.75rem', zIndex: 3 }}>o my brightest star</h1>
              
              <div className="poem-stanza" style={{ animationDelay: '0.4s', zIndex: 3, margin: '0 0 1.25rem 0', textAlign: 'center' }}>
                O' my love,<br />
                Let me tell you this once again,<br />
                For when you are sad,<br />
                You are nothing but Shreeya in my eyes,<br />
                For when you are happy,<br />
                You are nothing but Shreeya in my eyes.
              </div>

              <div className="poem-paragraph" style={{ animationDelay: '0.8s', zIndex: 3, margin: '0 0 1.25rem 0' }}>
                This Shreeya I obsess over? She's the most crucial part of my life. I am so grateful for everything, my love—from that first message you sent to all the giggles you bring upon my face each day. I cry so easily? (I am right now.) Why shouldn't I?
              </div>

              <div className="poem-paragraph" style={{ animationDelay: '1.2s', zIndex: 3, margin: '0 0 1.25rem 0' }}>
                I, just another mortal, have fallen so deeply in love with you. I cannot 'not imagine' you in any aspect of my life. You are always there in my head. You are the one to whom I can entrust my vulnerabilities—mere small things which you may not notice, but those make me feel like a person. I am all that, all my feelings inside you, all my desires, it's all because of you.
              </div>

              <div className="poem-paragraph" style={{ animationDelay: '1.6s', zIndex: 3, margin: '0 0 1.25rem 0' }}>
                My love, I will protect you from everything I can. I will be there to hold your hand and tell you that: 'O my love, this shall pass too, and you shall spring like the crazy gurl you are.' You will never comprehend what you are in my eyes. You are the one thing without which I am nothing of me.
              </div>

              <div className="poem-stanza" style={{ animationDelay: '2.0s', zIndex: 3, margin: '0', textAlign: 'center' }}>
                O my love,<br />
                Let me tell you this once again,<br />
                You are eternal in my heart. This 'Lohitaksh' will always be yours, be true, and by your side.
              </div>
            </div>
          }
        />
      </div>

      {/* Custom Crosshair Cursor matching Home Page */}
      <div 
        id="poem-custom-cursor" 
        className={hoverActive ? 'hover-active' : ''} 
        ref={cursorRef}
      >
        <div className="p-cursor-ring" />
        <div className="p-cursor-dot" />
        <div className="p-cursor-line horizontal" />
        <div className="p-cursor-line vertical" />
      </div>
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<PoemPage />);
}
