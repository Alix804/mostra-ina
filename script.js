// Gestione attivazione audio al primo click
document.addEventListener('DOMContentLoaded', function() {
    const oceanAudio = document.getElementById('ocean-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    let audioEnabled = false;

    function updateAudioIcon() {
        if (audioEnabled) {
            audioIcon.textContent = '🔇'; // Audio acceso, mostra icona barrata per "stacca"
        } else {
            audioIcon.textContent = '🔊'; // Audio spento, mostra icona normale
        }
    }

    function toggleAudio() {
        if (!oceanAudio) return;
        if (audioEnabled) {
            oceanAudio.pause();
            oceanAudio.currentTime = 0;
            audioEnabled = false;
            updateAudioIcon();
        } else {
            oceanAudio.play().then(() => {
                audioEnabled = true;
                updateAudioIcon();
            }).catch(err => {
                // Autoplay policy: l'utente deve interagire
                alert('Impossibile avviare l\'audio: interagisci con la pagina.');
            });
        }
    }

    if (audioToggle && oceanAudio) {
        audioToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleAudio();
        });
        updateAudioIcon();
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

    // --- FLIP quadro1 ---
    const quadro1 = document.querySelector('.painting-frame.quadro1');
    const flipBtn = quadro1 ? quadro1.querySelector('.flip-btn') : null;
    if (flipBtn && quadro1) {
        flipBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            quadro1.classList.toggle('flipped');
        });
    }
});

