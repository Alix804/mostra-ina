// Gestione attivazione audio al primo click
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.ocean-video');
    const oceanAudio = document.getElementById('ocean-audio');
    let audioEnabled = false;

    // Funzione per attivare l'audio
    function enableAudio() {
        if (!audioEnabled) {
            // Attiva audio del video se presente
            if (video) {
                video.muted = false;
            }
            
            // Attiva e riproduci l'audio MP3
            if (oceanAudio) {
                oceanAudio.play().catch(err => {
                    console.log('Errore riproduzione audio:', err);
                });
            }
            
            audioEnabled = true;
            console.log('Audio delle onde attivato');
            
            // Rimuovi il listener dopo il primo click
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
            
            // Feedback visivo opzionale
            showAudioNotification();
        }
    }

    // Mostra notifica che l'audio è stato attivato
    function showAudioNotification() {
        const notification = document.createElement('div');
        notification.textContent = '🔊 Audio attivato';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            font-size: 1rem;
            z-index: 1000;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Aggiungi animazione CSS per la notifica
    if (!document.getElementById('audio-notification-style')) {
        const style = document.createElement('style');
        style.id = 'audio-notification-style';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-10px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Aggiungi listener per il primo click/touch
    if (video || oceanAudio) {
        document.addEventListener('click', enableAudio);
        document.addEventListener('touchstart', enableAudio);
        
        // Messaggio iniziale per informare l'utente
        const initialMessage = document.createElement('div');
        initialMessage.textContent = 'Clicca per attivare l\'audio delle onde';
        initialMessage.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 4px;
            font-size: 0.9rem;
            z-index: 1000;
            animation: pulse 2s ease-in-out infinite;
        `;
        
        document.body.appendChild(initialMessage);
        
        // Rimuovi il messaggio quando l'audio viene attivato
        document.addEventListener('click', function removeMessage() {
            initialMessage.remove();
            document.removeEventListener('click', removeMessage);
        }, { once: true });
        
        // Aggiungi animazione pulse
        if (!document.getElementById('pulse-animation-style')) {
            const pulseStyle = document.createElement('style');
            pulseStyle.id = 'pulse-animation-style';
            pulseStyle.textContent = `
                @keyframes pulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(pulseStyle);
        }
    }

    // Gestione navigazione con tastiera (opzionale)
    document.addEventListener('keydown', function(e) {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Freccia sinistra
        if (e.key === 'ArrowLeft') {
            if (currentPage === 'index.html' || currentPage === '') {
                window.location.href = 'pagina1.html';
            } else if (currentPage === 'pagina2.html') {
                window.location.href = 'pagina1.html';
            }
        }
        
        // Freccia destra
        if (e.key === 'ArrowRight') {
            if (currentPage === 'index.html' || currentPage === '') {
                window.location.href = 'pagina2.html';
            } else if (currentPage === 'pagina1.html') {
                window.location.href = 'pagina2.html';
            }
        }
        
        // Tasto Home per tornare alla finestra
        if (e.key === 'Home') {
            window.location.href = 'index.html';
        }
    });

    // Gestione modale dettaglio opere
    const modal = document.getElementById('painting-modal');
    const paintings = document.querySelectorAll('.painting[data-painting-index]');
    const closeBtn = document.querySelector('.modal-close');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const paintingDetails = document.querySelectorAll('.painting-detail');
    let currentIndex = 0;

    // Funzione per mostrare opera specifica
    function showPainting(index) {
        // Nascondi tutti i dettagli
        paintingDetails.forEach(detail => detail.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));

        // Mostra dettaglio selezionato
        const selectedDetail = document.querySelector(`.painting-detail[data-index="${index}"]`);
        const selectedThumb = document.querySelector(`.thumbnail-item[data-index="${index}"]`);
        
        if (selectedDetail) selectedDetail.classList.add('active');
        if (selectedThumb) selectedThumb.classList.add('active');
        
        currentIndex = index;
    }

    // Apertura modale al click su quadro
    paintings.forEach(painting => {
        painting.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-painting-index'));
            modal.classList.add('active');
            showPainting(index);
            document.body.style.overflow = 'hidden'; // Blocca scroll
        });
    });

    // Chiusura modale
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Ripristina scroll
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Chiudi cliccando fuori dal contenitore
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Navigazione con miniature
    const tooltip = document.querySelector('.thumbnail-tooltip');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showPainting(index);
        });

        // Mostra tooltip al hover
        thumb.addEventListener('mouseenter', function() {
            const title = this.getAttribute('data-title');
            if (tooltip && title) {
                tooltip.textContent = title;
                tooltip.classList.add('visible');
            }
        });

        // Nascondi tooltip quando il mouse esce
        thumb.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.classList.remove('visible');
            }
        });
    });

    // Navigazione con tastiera nella modale
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : paintingDetails.length - 1;
            showPainting(prevIndex);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = currentIndex < paintingDetails.length - 1 ? currentIndex + 1 : 0;
            showPainting(nextIndex);
        }
    });
});

