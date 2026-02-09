console.log('wannabe crazy lover System Initialized - VERSION 5 - FIREBASE INTEGRATED');

// --- FIREBASE SETUP ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3wJAaup7xd_C1xX3NQTUnAOFduGFB-AA",
    authDomain: "sh-chat01.firebaseapp.com",
    projectId: "sh-chat01",
    storageBucket: "sh-chat01.firebasestorage.app",
    messagingSenderId: "604995349638",
    appId: "1:604995349638:web:3df48c1026bd24857a3507"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lock scroll during intro
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', () => {

    // Intro Sequence Logic
    const introOverlay = document.querySelector('.intro-overlay');
    const introText = document.querySelector('.intro-text');
    const mainLogo = document.querySelector('#main-logo');

    // 1. Calculate positions for the morph
    setTimeout(() => {
        if (!introText || !mainLogo) return;

        const logoRect = mainLogo.getBoundingClientRect();
        const textRect = introText.getBoundingClientRect();

        const deltaX = (logoRect.left + logoRect.width / 2) - (textRect.left + textRect.width / 2);
        const deltaY = (logoRect.top + logoRect.height / 2) - (textRect.top + textRect.height / 2);

        introText.style.transition = 'all 1s cubic-bezier(0.76, 0, 0.24, 1)';
        introText.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.35)`;
        introText.style.filter = 'blur(0px)';

        introOverlay.style.transition = 'background-color 0.8s ease';
        introOverlay.style.overflow = 'hidden';
        introOverlay.style.backgroundColor = 'transparent';

        setTimeout(() => {
            mainLogo.style.opacity = '1';
            mainLogo.style.transition = 'opacity 0.5s ease';
            introOverlay.style.opacity = '0';
            introOverlay.style.pointerEvents = 'none';
            document.body.style.overflow = '';
        }, 1000);

    }, 2000);

    // --- The Proposal Logic ---
    const proposalBtn = document.getElementById('proposal-btn');
    if (proposalBtn) {
        proposalBtn.style.pointerEvents = 'auto';
        proposalBtn.style.cursor = 'pointer';
        const container = proposalBtn.closest('.proposal-container');
        if (container) {
            container.style.zIndex = '2000';
            container.style.position = 'relative';
        }

        proposalBtn.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('page-transition-ripple');
            document.body.appendChild(ripple);

            const rect = proposalBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            ripple.style.left = `${centerX}px`;
            ripple.style.top = `${centerY}px`;

            setTimeout(() => {
                ripple.classList.add('active');
            }, 10);

            setTimeout(() => {
                document.body.classList.add('romantic-theme');

                const main = document.querySelector('main');
                if (main) {
                    main.style.opacity = '0';
                    main.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        main.style.display = 'none';
                    }, 500);

                    const header = document.querySelector('header');
                    if (header) {
                        header.style.opacity = '0';
                        header.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => { header.style.display = 'none'; }, 500);
                    }

                    // --- Flower Animation Sequence ---
                    setTimeout(() => {
                        console.log("Starting flower animation sequence...");
                        const flowerContainer = document.getElementById('flower-animation-container');
                        const flower = document.querySelector('.flower');

                        if (flowerContainer && flower) {
                            console.log("Flower container found, showing...");
                            flowerContainer.style.display = 'flex';
                            // Trigger reflow
                            void flowerContainer.offsetWidth;
                            flowerContainer.style.opacity = '1';
                            flower.classList.add('animate');

                            // Wait for animation (e.g., 5 seconds)
                            setTimeout(() => {
                                console.log("Flower animation finished, hiding...");
                                flowerContainer.style.opacity = '0';
                                setTimeout(() => {
                                    flowerContainer.style.display = 'none';
                                    flower.classList.remove('animate');

                                    // Proceed to original flow
                                    const proposalFlow = document.getElementById('proposal-flow');
                                    if (proposalFlow) {
                                        console.log("Showing proposal flow...");
                                        proposalFlow.style.display = 'block';
                                        setTimeout(() => {
                                            proposalFlow.style.opacity = '1';
                                            proposalFlow.style.transition = 'opacity 1s ease';
                                        }, 50);

                                        initProposalFlow();
                                    }
                                }, 1000); // Fade out duration for flower container
                            }, 8000); // Duration to show flower
                        } else {
                            console.error("Flower container NOT found!");
                            // Fallback if flower elements missing
                            const proposalFlow = document.getElementById('proposal-flow');
                            if (proposalFlow) {
                                proposalFlow.style.display = 'block';
                                setTimeout(() => {
                                    proposalFlow.style.opacity = '1';
                                    proposalFlow.style.transition = 'opacity 1s ease';
                                }, 50);

                                initProposalFlow();
                            }
                        }
                    }, 500);
                }

            }, 600);
        });
    }

    function initProposalFlow() {
        const flowContainer = document.getElementById('proposal-flow');
        const drumEmoji = document.getElementById('drum-emoji');
        const drumText = document.getElementById('drum-text');
        const questionText = document.getElementById('question-text');
        const questionButtons = document.querySelector('.question-buttons');

        let drumTriggered = false;
        let questionTriggered = false;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        function playDrumroll() {
            const audio = new Audio('sfx/freesound_community-drum-roll-please-6921.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.error("Audio playback failed:", e));
        }

        flowContainer.addEventListener('scroll', () => {
            const height = window.innerHeight;

            const drumSection = document.getElementById('part-2-drumroll');
            if (drumSection) {
                const rect = drumSection.getBoundingClientRect();
                if (rect.top < height * 0.6 && rect.bottom > height * 0.4 && !drumTriggered) {
                    drumTriggered = true;
                    drumEmoji.classList.add('jump-active');
                    drumEmoji.classList.add('buzz-active');
                    if (audioCtx.state === 'suspended') audioCtx.resume();
                    playDrumroll();
                    setTimeout(() => {
                        drumText.style.opacity = '1';
                    }, 1000);
                }
            }

            const questionSection = document.getElementById('part-3-question');
            if (questionSection) {
                const rect = questionSection.getBoundingClientRect();
                if (rect.top < height * 0.6 && !questionTriggered) {
                    questionTriggered = true;
                    questionText.style.opacity = '1';
                    questionText.style.transform = 'scale(1)';
                    setTimeout(() => {
                        questionButtons.style.opacity = '1';
                    }, 1000);
                }
            }
        });

        // --- BUTTON LOGIC ---

        // 'No' Button Logic
        const btnNo = document.getElementById('btn-no');
        const noReasonSection = document.getElementById('part-no-reason');
        const questionSectionWrapper = document.querySelector('.question-container-wrapper');

        // Listeners for "reasons"
        const noReasonsListContainer = document.querySelector('#no-reasons-list .list-content');
        if (noReasonsListContainer) {
            setupFirebaseListener("reasons", noReasonsListContainer);
        }

        if (btnNo) {
            btnNo.addEventListener('click', (e) => {
                if (noReasonSection) {
                    if (questionSectionWrapper) questionSectionWrapper.style.display = 'none';
                    noReasonSection.style.display = 'flex';
                    void noReasonSection.offsetWidth;
                    noReasonSection.classList.add('active');
                    noReasonSection.style.opacity = '1';
                }
            });
        }

        const btnSubmitReason = document.getElementById('btn-submit-reason');
        const btnSkipReason = document.getElementById('btn-skip-reason');
        const reasonInput = document.getElementById('no-reason-input');

        if (btnSubmitReason) {
            btnSubmitReason.addEventListener('click', async () => {
                const text = reasonInput ? reasonInput.value.trim() : '';
                const wordCount = text.length > 0 ? text.split(/\s+/).length : 0;

                // Removed mandatory check for debugging, user can adjust
                if (wordCount < 5 && wordCount > 0) {
                    // alert warning? Nah, let them save.
                }

                if (text) {
                    btnSubmitReason.innerText = "Saving...";
                    try {
                        await addDoc(collection(db, "reasons"), {
                            content: text,
                            timestamp: serverTimestamp()
                        });
                        alert("Reason saved to the archives.");
                        btnSubmitReason.innerText = "Submitted";
                        reasonInput.value = "";
                    } catch (e) {
                        alert("Error saving: " + e.message);
                        btnSubmitReason.innerText = "Retry";
                    }
                } else {
                    alert("Please write something first.");
                }
            });
        }

        if (btnSkipReason) {
            btnSkipReason.addEventListener('click', () => {
                alert("Redirecting...");
                if (noReasonSection) {
                    noReasonSection.classList.remove('active');
                    noReasonSection.style.opacity = '0';
                    setTimeout(() => {
                        noReasonSection.style.display = 'none';
                        if (questionSectionWrapper) {
                            questionSectionWrapper.style.display = 'block';
                        }
                    }, 500);
                }
            });
        }

        // 'Yes' Button Logic
        const btnYes = document.getElementById('btn-yes');
        const part5Comment = document.getElementById('part-5-comment');

        // Listeners for "comments"
        const yesCommentsListContainer = document.querySelector('#yes-comments-list .list-content');
        if (yesCommentsListContainer) {
            setupFirebaseListener("comments", yesCommentsListContainer);
        }

        const yesCommentInput = document.getElementById('yes-comment-input');
        const btnSubmitComment = document.getElementById('btn-submit-comment');

        if (btnYes) {
            btnYes.addEventListener('click', (e) => {
                createConfetti(e.clientX, e.clientY);

                if (questionText) {
                    questionText.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    questionText.style.transform = 'scale(0.8)';
                    questionText.style.opacity = '0';

                    setTimeout(() => {
                        // Change text
                        // We add a 'next' button here
                        questionText.innerHTML = `
                            <span class="text-gradient" style="font-size: 2.5rem; line-height: 1.4;">
                                You have subscribed to useless chitter chatter by <em>Mr. Lohitaksh Khatri</em>, we welcome you to the family
                            </span>
                            <div style="margin-top: 2rem;">
                                <button id="btn-next-loop" style="background: none; border: none; font-size: 3rem; cursor: pointer; color: #fff; animation: bounce 2s infinite;">→</button>
                            </div>
                        `;

                        questionText.style.transform = 'scale(1)';
                        questionText.style.opacity = '1';

                        // Attach Next Button Listener NOW (since element just created)
                        setTimeout(() => {
                            const btnNext = document.getElementById('btn-next-loop');
                            if (btnNext) {
                                btnNext.addEventListener('click', () => {
                                    // Hide Question Text
                                    questionText.style.opacity = '0';

                                    if (part5Comment) {
                                        part5Comment.style.display = 'flex';
                                        void part5Comment.offsetWidth;
                                        part5Comment.style.opacity = '1';
                                        part5Comment.classList.add('active'); // active class for pointer events
                                    }
                                    if (questionSectionWrapper) {
                                        // Hide the wrapper but keep spacing?
                                        // Actually better to hide the text logic
                                    }
                                });
                            }
                        }, 100);

                    }, 500);
                }

                // Hide buttons
                const btnContainer = document.querySelector('.question-buttons');
                if (btnContainer) {
                    btnContainer.style.opacity = '0';
                    setTimeout(() => btnContainer.style.display = 'none', 500);
                }
            });
        }

        // Handle Yes Comment Submit
        if (btnSubmitComment) {
            btnSubmitComment.addEventListener('click', async () => {
                const text = yesCommentInput ? yesCommentInput.value.trim() : '';
                if (text) {
                    btnSubmitComment.innerText = "Saving...";
                    try {
                        await addDoc(collection(db, "comments"), {
                            content: text,
                            timestamp: serverTimestamp()
                        });
                        alert("Saved! 😎");
                        yesCommentInput.value = "";
                        btnSubmitComment.innerText = "Saved";
                    } catch (e) {
                        alert("Error saving: " + e.message);
                        btnSubmitComment.innerText = "Retry";
                    }
                } else {
                    alert("Say something!");
                }
            });
        }

    } // End initProposalFlow

    // --- FIREBASE HELPER FUNCTIONS ---

    function setupFirebaseListener(collectionName, containerElement) {
        // Simple Real-time Listener
        const q = query(collection(db, collectionName), orderBy("timestamp", "desc"), limit(20));

        onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                containerElement.innerHTML = "No inputs yet.";
                return;
            }
            const html = snapshot.docs.map(docSnapshot => {
                const data = docSnapshot.data();
                const safeContent = escapeHtml(data.content); // Use basic escape
                return `<div style="padding: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 0.5rem; word-break: break-word;">
                            "${safeContent}"
                        </div>`;
            }).join('');
            containerElement.innerHTML = html;
        });
    }

    function escapeHtml(text) {
        if (!text) return "";
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

}); // End DOMContentLoaded

// Global Confetti (needed outside module scope if called via onclick, but we attach via JS listener)
// We export nothing, just side effects.
// But wait, createConfetti was global before. 
// Since this is now a module, createConfetti is scoped. 
// We should attach it to window if needed by HTML onclicks (none here, all JS).
// But for safety:
window.createConfetti = function (x, y) {
    const confettiCount = 500;
    const colors = ['#ffccdd', '#dd6688', '#cc3355', '#ffffff', '#ffeeff', '#ffd700'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);

        const spreadX = window.innerWidth;
        const spreadY = window.innerHeight;

        const angle = Math.random() * Math.PI * 2;
        const velocity = 200 + Math.random() * 400;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 200;

        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.transform = `translate(0,0) rotate(${Math.random() * 360}deg)`;

        const animation = confetti.animate([
            { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });

        animation.onfinish = () => confetti.remove();
    }
};
