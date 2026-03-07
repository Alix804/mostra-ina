# Mostra INA - Finestra sul Mare

Progetto web interattivo che simula una finestra sul mare con tende oscillanti e galleria d'arte.

## 📁 Struttura del Progetto

```
mostra-ina/
├── index.html          # Pagina principale con finestra sul mare
├── pagina1.html        # Galleria d'arte - Prima sala
├── pagina2.html        # Galleria d'arte - Seconda sala
├── styles.css          # Stili CSS principali
├── script.js           # JavaScript per gestione audio e navigazione
├── assets/             # Cartella risorse (da creare)
│   ├── ocean-waves.mp4       # Video onde del mare
│   ├── onde.mp3              # Audio onde del mare
│   ├── tenda-sinistra.png    # Immagine tenda sinistra (PNG trasparente)
│   ├── tenda-destra.png      # Immagine tenda destra (PNG trasparente)
│   ├── quadro1.jpg           # Opera d'arte 1
│   ├── quadro2.jpg           # Opera d'arte 2
│   ├── quadro3.jpg           # Opera d'arte 3
│   └── quadro4.jpg           # Opera d'arte 4
└── README.md
```

## 🎨 Caratteristiche

### Pagina Principale (index.html)
- **Layout finestra**: Contenitore centrato che simula una finestra con bordo (muro)
- **Video mare**: Video a schermo intero in loop con onde del mare
- **Tende animate**: Due immagini PNG trasparenti ai lati con animazione CSS oscillante
- **Box-shadow inset**: Effetto spessore del muro
- **Navigazione**: Frecce per spostarsi tra le pagine

### Pagine Galleria (pagina1.html, pagina2.html)
- **Sfondo muro**: Stesso sfondo della pagina principale
- **Quadri**: Pannelli che simulano opere d'arte appese
- **Didascalie**: Cartellini in stile museo con titolo, autore, anno e tecnica

## 🔧 Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: 
  - Flexbox e Grid per layout responsive
  - Animazioni CSS per le tende
  - Z-index per gestione livelli
  - Box-shadow inset per effetto profondità
- **JavaScript**: Gestione audio e navigazione con tastiera

## 📦 Risorse Necessarie

Per completare il progetto, crea la cartella `assets/` e aggiungi i seguenti file:

### Video
- **ocean-waves.mp4**: Video di onde del mare (consigliato formato MP4, H.264)
  - Sorgenti gratuite: [Pexels](https://www.pexels.com/videos/), [Pixabay](https://pixabay.com/videos/)

### Audio
- **onde.mp3**: File audio con il suono delle onde del mare (formato MP3)
  - Sorgenti gratuite: [Freesound](https://freesound.org/), [YouTube Audio Library](https://www.youtube.com/audiolibrary)

### Immagini Tende (PNG trasparenti)
- **tenda-sinistra.png**: Immagine tenda sinistra
- **tenda-destra.png**: Immagine tenda destra
  - Puoi creare tende usando software come GIMP, Photoshop, o Canva
  - Assicurati che abbiano sfondo trasparente (canale alpha)

### Quadri
- **quadro1.jpg, quadro2.jpg, quadro3.jpg, quadro4.jpg**: Immagini opere d'arte
  - Sorgenti gratuite: [Unsplash](https://unsplash.com/), [Wikimedia Commons](https://commons.wikimedia.org/)
  - Consigliato formato 4:3, risoluzione minima 800x600px

## 🚀 Come Utilizzare

1. **Crea la cartella assets** e aggiungi tutte le risorse necessarie (video, audio MP3, immagini)
2. Apri `index.html` nel browser
3. **Clicca** sulla pagina per attivare l'audio delle onde
4. Usa le **frecce** o i **tasti freccia della tastiera** per navigare
5. Premi **Home** per tornare alla finestra principale

## 🎯 Funzionalità JavaScript

- **Attivazione audio**: Al primo click dell'utente, l'audio MP3 delle onde viene attivato e riprodotto in loop
- **Navigazione tastiera**: 
  - `←` e `→`: Naviga tra le pagine
  - `Home`: Torna alla pagina principale
- **Notifiche**: Feedback visivo per l'attivazione dell'audio

## 🎨 Personalizzazione

### Modificare i Colori del Muro
Nel file `styles.css`, cerca:
```css
.wall {
    background: linear-gradient(135deg, #a69080 0%, #8b7c6b 100%);
}
```

### Regolare l'Animazione delle Tende
Modifica la durata in `styles.css`:
```css
.curtain-left {
    animation: sway-left 6s ease-in-out infinite; /* Cambia 6s */
}
```

### Cambiare le Didascalie
Modifica il contenuto HTML in `pagina1.html` e `pagina2.html` all'interno dei tag `.museum-label`.

## 📱 Responsive Design

Il sito è ottimizzato per dispositivi mobili con breakpoint a 768px.

## 🌐 Browser Supportati

- Chrome/Edge (consigliato)
- Firefox
- Safari
- Opera

## 📄 Licenza

Progetto educativo - Uso libero

---

**Buona esplorazione della Mostra INA! 🌊🖼️**
