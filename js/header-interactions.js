// ========================================
// INTERACCIONES AVANZADAS DEL HEADER
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initHeaderInteractions();
});

function initHeaderInteractions() {
    // Efecto parallax suave
    initParallaxEffect();
    
    // Animación de escritura del título
    initTypingEffect();
    
    // Efectos de scroll
    initScrollEffects();
    
    // Navegación suave
    initSmoothNavigation();
    
    // Efectos de hover mejorados
    initEnhancedHoverEffects();
    
    // Indicador de scroll interactivo
    initScrollIndicator();
}

// Efecto parallax suave en el header
function initParallaxEffect() {
    const header = document.querySelector('header');
    const headerContent = document.querySelector('.header-content');
    
    if (!header || !headerContent) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        headerContent.style.transform = `translateY(${rate}px)`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Animación de escritura para el título
function initTypingEffect() {
    const mainTitle = document.querySelector('.main-title');
    if (!mainTitle) return;
    
    // Aplicar efecto solo en la página principal
    if (document.body.classList.contains('welcome-page')) {
        setTimeout(() => {
            mainTitle.classList.add('typing-effect');
        }, 500);
        
        // Remover el efecto después de completarse
        setTimeout(() => {
            mainTitle.classList.remove('typing-effect');
        }, 4000);
    }
}

// Efectos basados en scroll
function initScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = Math.min(scrollTop / window.innerHeight, 1);
        
        // Cambiar opacidad del header basado en scroll
        header.style.setProperty('--scroll-opacity', 1 - scrollPercent * 0.3);
        
        // Efecto de desvanecimiento del indicador de scroll
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = Math.max(0, 1 - scrollPercent * 2);
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function requestScrollTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollTick);
}

// Navegación suave
function initSmoothNavigation() {
    const navButtons = document.querySelectorAll('.header-nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar scroll suave para anclas internas
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Efectos de hover mejorados
function initEnhancedHoverEffects() {
    const logo = document.querySelector('.header-logo');
    const shapes = document.querySelectorAll('.geometric-shape');
    
    // Efecto de rotación del logo con el mouse
    if (logo) {
        logo.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            const rotateX = deltaY / 10;
            const rotateY = -deltaX / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
    
    // Efectos interactivos en formas geométricas
    shapes.forEach((shape, index) => {
        shape.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = `scale(1.3) rotate(${45 + index * 90}deg)`;
            this.style.filter = 'brightness(1.8) saturate(1.5)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
            this.style.filter = '';
        });
    });
}

// Indicador de scroll interactivo
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', function() {
        const firstSection = document.querySelector('main') || document.querySelector('.modules-section');
        if (firstSection) {
            firstSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Agregar cursor pointer
    scrollIndicator.style.cursor = 'pointer';
    
    // Efecto de hover
    scrollIndicator.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-50%) scale(1.1)';
        this.style.opacity = '1';
    });
    
    scrollIndicator.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(-50%) scale(1)';
        this.style.opacity = '0.7';
    });
}

// Función para reiniciar animaciones cuando sea necesario
function restartAnimations() {
    const animatedElements = document.querySelectorAll('.main-title, .geometric-shape, .header-logo');
    
    animatedElements.forEach(element => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = null;
    });
}

// Exportar funciones para uso externo si es necesario
window.HeaderInteractions = {
    init: initHeaderInteractions,
    restartAnimations: restartAnimations
};