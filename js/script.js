/* ============================================
   SCRIPT.JS - LANDING PAGE SAQUE AQUI
   Funcionalidades de Interatividade e Otimização
   ============================================ */

// ============================================
// 1. TOGGLE FAQ
// ============================================

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os outros FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir/Fechar o FAQ clicado
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ============================================
// 2. SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Não previne comportamento padrão para links vazios
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 3. ANALYTICS E RASTREAMENTO DE EVENTOS
// ============================================

// Rastrear cliques no CTA principal
document.getElementById('ctaPrincipal')?.addEventListener('click', function() {
    trackEvent('CTA_Principal_Clicado', {
        location: 'Hero Section',
        timestamp: new Date().toISOString()
    });
});

// Rastrear cliques no CTA final
document.querySelectorAll('.cta-final .btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('CTA_Final_Clicado', {
            location: 'CTA Final Section',
            timestamp: new Date().toISOString()
        });
    });
});

// Rastrear aberturas de FAQ
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        const question = this.querySelector('span').textContent;
        trackEvent('FAQ_Aberto', {
            question: question,
            timestamp: new Date().toISOString()
        });
    });
});

// Função genérica de rastreamento
function trackEvent(eventName, eventData) {
    // Enviar para Google Analytics (se configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Log no console para debug
    console.log(`[Event Tracked] ${eventName}:`, eventData);
}

// ============================================
// 4. LAZY LOADING DE IMAGENS
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// 5. OTIMIZAÇÃO DE PERFORMANCE - DEBOUNCE
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 6. DETECÇÃO DE SCROLL PARA EFEITOS
// ============================================

const handleScroll = debounce(() => {
    const scrollPosition = window.scrollY;
    
    // Adicionar classe ao header quando scrollar
    const header = document.querySelector('.header');
    if (scrollPosition > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    // Animação de entrada para elementos visíveis
    animateOnScroll();
}, 10);

window.addEventListener('scroll', handleScroll);

// ============================================
// 7. ANIMAÇÃO DE ENTRADA (FADE-IN)
// ============================================

function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Se o elemento está visível na viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ============================================
// 8. VALIDAÇÃO DE FORMULÁRIO (se houver)
// ============================================

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ============================================
// 9. COPIAR PARA CLIPBOARD
// ============================================

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copiado para a área de transferência!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification('Copiado para a área de transferência!', 'success');
}

// ============================================
// 10. NOTIFICAÇÕES
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#34a853' : '#1a73e8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// 11. DETECÇÃO DE DEVICE
// ============================================

function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        return 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

// Log do tipo de dispositivo
console.log(`Device Type: ${getDeviceType()}`);

// ============================================
// 12. OTIMIZAÇÃO DE PERFORMANCE - PRELOAD
// ============================================

function preloadResources() {
    // Preload de fontes
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
    document.head.appendChild(link);
}

preloadResources();

// ============================================
// 13. VERIFICAÇÃO DE SUPORTE A FEATURES
// ============================================

function checkBrowserSupport() {
    const features = {
        localStorage: typeof Storage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        intersectionObserver: 'IntersectionObserver' in window,
        clipboard: navigator.clipboard !== undefined
    };
    
    console.log('Browser Support:', features);
    return features;
}

checkBrowserSupport();

// ============================================
// 14. ARMAZENAMENTO LOCAL (PARA RASTREAMENTO)
// ============================================

function saveUserInteraction(action, data) {
    if (typeof localStorage !== 'undefined') {
        const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
        interactions.push({
            action,
            data,
            timestamp: new Date().toISOString()
        });
        
        // Manter apenas os últimos 50 eventos
        if (interactions.length > 50) {
            interactions.shift();
        }
        
        localStorage.setItem('userInteractions', JSON.stringify(interactions));
    }
}

// ============================================
// 15. INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing Page Saque Aqui - Carregada com sucesso!');
    
    // Inicializar componentes
    animateOnScroll();
    
    // Rastrear visualização de página
    trackEvent('Pagina_Visualizada', {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        device: getDeviceType()
    });
    
    // Salvar interação
    saveUserInteraction('page_load', {
        device: getDeviceType(),
        timestamp: new Date().toISOString()
    });
});

// ============================================
// 16. UNLOAD - SALVAR DADOS ANTES DE SAIR
// ============================================

window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - performance.timing.navigationStart) / 1000);
    saveUserInteraction('page_unload', {
        timeOnPage: `${timeOnPage}s`,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// 17. ADICIONAR ESTILOS DINÂMICOS PARA ANIMAÇÕES
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    [data-animate] {
        opacity: 0;
        animation: fadeIn 0.6s ease forwards;
    }
    
    [data-animate].animated {
        animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
    
    input.error {
        border-color: #d33b27 !important;
        background-color: #fff5f5 !important;
    }
`;
document.head.appendChild(style);

console.log('Script.js carregado com sucesso!');
