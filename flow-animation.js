/**
 * Advanced Veo 3 Flow Inspired Animation Controller
 * Creates cinematic, interactive background effects inspired by Google's Veo 3 Flow
 */

class AdvancedFlowAnimation {
    constructor() {
        this.particles = [];
        this.morphs = [];
        this.trails = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isHovering = false;
        this.scrollY = 0;
        this.init();
    }

    init() {
        this.createAdvancedParticles();
        this.createMorphingShapes();
        this.createParticleTrails();
        this.bindEvents();
        this.startAdvancedAnimation();
        this.createCinematicEffects();
    }

    createAdvancedParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Create dynamic particles with different behaviors
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'flow-advanced-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 120 + 60}px;
                height: ${Math.random() * 120 + 60}px;
                background: radial-gradient(circle, 
                    rgba(220, 38, 38, ${Math.random() * 0.6 + 0.2}) 0%, 
                    rgba(16, 185, 129, ${Math.random() * 0.4 + 0.1}) 50%, 
                    transparent 100%);
                border-radius: 50%;
                pointer-events: none;
                z-index: ${Math.floor(Math.random() * 3) + 1};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: advancedFloat ${Math.random() * 25 + 15}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
                filter: blur(${Math.random() * 2}px);
                box-shadow: 0 0 ${Math.random() * 20 + 10}px rgba(220, 38, 38, 0.3);
            `;
            
            heroSection.querySelector('.hero-animated-bg').appendChild(particle);
            this.particles.push(particle);
        }
    }

    createMorphingShapes() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Create fluid morphing shapes
        for (let i = 0; i < 3; i++) {
            const morph = document.createElement('div');
            morph.className = 'flow-dynamic-morph';
            morph.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 80}px;
                height: ${Math.random() * 100 + 80}px;
                background: linear-gradient(45deg, 
                    rgba(220, 38, 38, ${Math.random() * 0.3 + 0.1}) 0%, 
                    rgba(16, 185, 129, ${Math.random() * 0.4 + 0.1}) 50%, 
                    rgba(220, 38, 38, ${Math.random() * 0.2 + 0.05}) 100%);
                border-radius: ${Math.random() * 50 + 25}% ${Math.random() * 50 + 25}% ${Math.random() * 50 + 25}% ${Math.random() * 50 + 25}%;
                animation: dynamicMorph ${Math.random() * 20 + 15}s infinite ease-in-out;
                animation-delay: ${Math.random() * 8}s;
                pointer-events: none;
                z-index: ${Math.floor(Math.random() * 2) + 1};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                filter: blur(${Math.random() * 1.5}px);
            `;
            
            heroSection.querySelector('.hero-animated-bg').appendChild(morph);
            this.morphs.push(morph);
        }
    }

    createParticleTrails() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Create glowing particle trails
        for (let i = 0; i < 4; i++) {
            const trail = document.createElement('div');
            trail.className = 'flow-dynamic-trail';
            trail.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(220, 38, 38, ${Math.random() * 0.8 + 0.2});
                border-radius: 50%;
                animation: trailFlow ${Math.random() * 12 + 8}s infinite linear;
                animation-delay: ${Math.random() * 6}s;
                pointer-events: none;
                z-index: 2;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                box-shadow: 0 0 ${Math.random() * 15 + 5}px rgba(220, 38, 38, 0.8);
                filter: blur(1px);
            `;
            
            heroSection.querySelector('.hero-animated-bg').appendChild(trail);
            this.trails.push(trail);
        }
    }

    createCinematicEffects() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Create cinematic light rays
        const lightRay = document.createElement('div');
        lightRay.className = 'flow-light-ray';
        lightRay.style.cssText = `
            position: absolute;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, 
                transparent 0%, 
                rgba(220, 38, 38, 0.3) 20%, 
                rgba(16, 185, 129, 0.2) 50%, 
                rgba(220, 38, 38, 0.3) 80%, 
                transparent 100%);
            animation: lightRayMove 10s infinite linear;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            filter: blur(1px);
        `;
        
        heroSection.querySelector('.hero-animated-bg').appendChild(lightRay);

        // Create floating orbs
        for (let i = 0; i < 2; i++) {
            const orb = document.createElement('div');
            orb.className = 'flow-floating-orb';
            orb.style.cssText = `
                position: absolute;
                width: ${Math.random() * 60 + 40}px;
                height: ${Math.random() * 60 + 40}px;
                background: radial-gradient(circle, 
                    rgba(220, 38, 38, 0.4) 0%, 
                    rgba(16, 185, 129, 0.2) 50%, 
                    transparent 100%);
                border-radius: 50%;
                animation: orbFloat ${Math.random() * 30 + 20}s infinite ease-in-out;
                animation-delay: ${Math.random() * 10}s;
                pointer-events: none;
                z-index: 2;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                box-shadow: 0 0 ${Math.random() * 30 + 20}px rgba(220, 38, 38, 0.4);
            `;
            
            heroSection.querySelector('.hero-animated-bg').appendChild(orb);
        }
    }

    bindEvents() {
        // Enhanced mouse movement interaction
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateAdvancedInteractions();
        });

        // Mouse enter/leave for hover effects
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.activateHoverEffects();
            });
            
            heroSection.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.deactivateHoverEffects();
            });
        }

        // Enhanced scroll interaction
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
            this.updateScrollEffects();
        });

        // Resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Click interactions
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });
    }

    updateAdvancedInteractions() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (this.mouseX - centerX) * 0.02;
        const deltaY = (this.mouseY - centerY) * 0.02;

        // Apply advanced mouse following effects
        const centerElement = document.querySelector('.flow-center');
        if (centerElement) {
            centerElement.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
        }

        // Update particle positions based on mouse
        this.particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.01;
            particle.style.transform = `translate(${deltaX * speed}px, ${deltaY * speed}px)`;
        });
    }

    activateHoverEffects() {
        // Intensify animations on hover
        this.particles.forEach(particle => {
            particle.style.animationDuration = '8s';
            particle.style.filter = 'blur(0px)';
        });

        this.morphs.forEach(morph => {
            morph.style.animationDuration = '6s';
        });
    }

    deactivateHoverEffects() {
        // Return to normal speed
        this.particles.forEach(particle => {
            particle.style.animationDuration = '15s';
            particle.style.filter = 'blur(1px)';
        });

        this.morphs.forEach(morph => {
            morph.style.animationDuration = '15s';
        });
    }

    updateScrollEffects() {
        // Advanced parallax effects
        this.particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.3;
            particle.style.transform = `translateY(${this.scrollY * speed}px)`;
        });

        this.morphs.forEach((morph, index) => {
            const speed = (index + 1) * 0.2;
            morph.style.transform = `translateY(${this.scrollY * speed}px)`;
        });
    }

    createClickEffect(x, y) {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, 
                rgba(220, 38, 38, 0.6) 0%, 
                transparent 70%);
            border-radius: 50%;
            left: ${relativeX - 10}px;
            top: ${relativeY - 10}px;
            animation: rippleEffect 1s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        heroSection.querySelector('.hero-animated-bg').appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }

    handleResize() {
        // Recalculate positions on resize
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
            }
        });
    }

    startAdvancedAnimation() {
        // Add advanced CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes advancedFloat {
                0% {
                    transform: translate(0, 0) rotate(0deg) scale(1);
                    opacity: 0.7;
                }
                25% {
                    transform: translate(80px, -40px) rotate(90deg) scale(1.2);
                    opacity: 0.9;
                }
                50% {
                    transform: translate(-40px, 80px) rotate(180deg) scale(0.8);
                    opacity: 0.6;
                }
                75% {
                    transform: translate(-80px, -20px) rotate(270deg) scale(1.1);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(0, 0) rotate(360deg) scale(1);
                    opacity: 0.7;
                }
            }

            @keyframes dynamicMorph {
                0% {
                    border-radius: 50% 20% 50% 20%;
                    transform: rotate(0deg) scale(1);
                }
                25% {
                    border-radius: 20% 50% 20% 50%;
                    transform: rotate(90deg) scale(1.3);
                }
                50% {
                    border-radius: 50% 50% 20% 20%;
                    transform: rotate(180deg) scale(0.7);
                }
                75% {
                    border-radius: 20% 20% 50% 50%;
                    transform: rotate(270deg) scale(1.1);
                }
                100% {
                    border-radius: 50% 20% 50% 20%;
                    transform: rotate(360deg) scale(1);
                }
            }

            @keyframes trailFlow {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(120px, -60px) scale(2);
                    opacity: 0.4;
                }
                100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.8;
                }
            }

            @keyframes lightRayMove {
                0% {
                    transform: translateX(0);
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(100vw);
                    opacity: 0;
                }
            }

            @keyframes orbFloat {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(100px, -50px) scale(1.5);
                    opacity: 0.9;
                }
                100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.6;
                }
            }

            @keyframes rippleEffect {
                0% {
                    transform: scale(1);
                    opacity: 0.6;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }

            /* Enhanced hover effects */
            .hero:hover .flow-center {
                animation-duration: 3s;
                opacity: 1;
                filter: brightness(1.2);
            }

            .hero:hover .flow-particle {
                animation-duration: 8s;
                filter: brightness(1.1);
            }

            /* Smooth transitions */
            .flow-advanced-particle,
            .flow-dynamic-morph,
            .flow-dynamic-trail {
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Method to add burst effects
    addBurstEffect() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        for (let i = 0; i < 8; i++) {
            const burst = document.createElement('div');
            burst.style.cssText = `
                position: absolute;
                width: ${Math.random() * 30 + 10}px;
                height: ${Math.random() * 30 + 10}px;
                background: radial-gradient(circle, 
                    rgba(220, 38, 38, ${Math.random() * 0.6 + 0.2}) 0%, 
                    transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: burstEffect 2s ease-out;
                pointer-events: none;
                z-index: 5;
            `;
            
            heroSection.querySelector('.hero-animated-bg').appendChild(burst);

            setTimeout(() => {
                if (burst.parentNode) {
                    burst.parentNode.removeChild(burst);
                }
            }, 2000);
        }
    }
}

// Initialize the advanced animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedFlowAnimation();
    
    // Add periodic burst effects for extra dynamism
    setInterval(() => {
        const animation = new AdvancedFlowAnimation();
        animation.addBurstEffect();
    }, 12000);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedFlowAnimation;
}
