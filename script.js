/**
 * LÓGICA PRINCIPAL DE LA APP WEB
 * Controla la interacción entre pantallas y el movimiento del botón "No"
 */

// ========================================
// ELEMENTOS DEL DOM
// ========================================

const questionScreen = document.getElementById('questionScreen');
const celebrationScreen = document.getElementById('celebrationScreen');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const restartBtn = document.getElementById('restartBtn');
const hintMessage = document.getElementById('hintMessage');
const confettiContainer = document.getElementById('confetti');

// ========================================
// VARIABLES DE ESTADO
// ========================================

let noClickCount = 0;

// ========================================
// FUNCIONES PRINCIPALES
// ========================================

/**
 * FUNCIÓN: Maneja el clic en el botón "Sí"
 * Muestra la pantalla de celebración y crea confeti
 */
function handleYesClick() {
    questionScreen.classList.remove('active');
    celebrationScreen.classList.add('active');
    createConfetti();
}

/**
 * FUNCIÓN: Mueve el botón "No" a una posición aleatoria
 * Se ejecuta cuando el usuario intenta hacer clic
 */
function moveNoButton() {
    // Obtener dimensiones de la pantalla
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Obtener dimensiones del botón
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Generar posición aleatoria (con márgenes seguros)
    const maxX = screenWidth - btnWidth - 20;
    const maxY = screenHeight - btnHeight - 20;
    
    const randomX = Math.random() * Math.max(maxX, 0);
    const randomY = Math.random() * Math.max(maxY, 0);

    // Aplicar la nueva posición (fixed positioning)
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Incrementar contador
    noClickCount++;

    // Mostrar mensaje motivacional
    updateHintMessage();
}

/**
 * FUNCIÓN: Actualiza el mensaje motivacional según el contador
 */
function updateHintMessage() {
    const messages = [
        '¡Casi! 😊',
        '¡Vamos! 😅',
        '¡No puedes escapar! 😆',
        '¡No hay escape! 💕',
        '¡Sigue intentando! 🤪',
        '¡Casi lo logras! 😂',
    ];

    const index = Math.min(noClickCount - 1, messages.length - 1);
    hintMessage.textContent = messages[index];
}

/**
 * FUNCIÓN: Crea efecto de confeti que cae
 */
function createConfetti() {
    // Limpiar confeti anterior
    confettiContainer.innerHTML = '';

    // Colores del confeti
    const colors = ['#FF1493', '#FF69B4', '#FFB6D9', '#ff6b9d', '#ffa07a', '#ff1493'];

    // Crear 50 piezas de confeti
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';

        // Posición aleatoria en X
        const randomX = Math.random() * window.innerWidth;

        // Color aleatorio
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Retraso aleatorio
        const delay = Math.random() * 0.3;

        // Aplicar estilos
        confettiPiece.style.left = randomX + 'px';
        confettiPiece.style.backgroundColor = randomColor;
        confettiPiece.style.animationDelay = delay + 's';
        confettiPiece.style.animationDuration = (2 + Math.random() * 1.5) + 's';

        confettiContainer.appendChild(confettiPiece);
    }
}

/**
 * FUNCIÓN: Reinicia la aplicación a la pantalla inicial
 */
function restartApp() {
    celebrationScreen.classList.remove('active');
    questionScreen.classList.add('active');
    
    // Reiniciar estado
    noClickCount = 0;
    hintMessage.textContent = '';
    
    // Reiniciar posición del botón "No" al área original
    const btnContainer = noBtn.parentElement;
    const rect = btnContainer.getBoundingClientRect();
    
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    
    // Limpiar confeti
    confettiContainer.innerHTML = '';
}

// ========================================
// EVENT LISTENERS
// ========================================

yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton, { passive: true });
restartBtn.addEventListener('click', restartApp);

// ========================================
// FUNCIONALIDAD PARA MÓVILES
// ========================================

/**
 * En móviles, el botón "No" también se mueve al intentar hacer clic
 * Esto se maneja con touchstart para mejor experiencia táctil
 */
document.addEventListener('touchmove', function(e) {
    // Prevenir comportamientos por defecto solo en ciertos casos
    if (e.target.closest('.btn-no')) {
        e.preventDefault();
    }
}, { passive: false });

// ========================================
// AJUSTES RESPONSIVE
// ========================================

/**
 * Reiniciar posición del botón cuando se redimensiona la ventana
 * Esto asegura que el botón siempre esté dentro de la pantalla
 */
window.addEventListener('resize', function() {
    if (questionScreen.classList.contains('active') && noClickCount === 0) {
        noBtn.style.position = 'relative';
        noBtn.style.left = 'auto';
        noBtn.style.top = 'auto';
    }
});

console.log('✅ App Valentín Web - Cargada correctamente');
