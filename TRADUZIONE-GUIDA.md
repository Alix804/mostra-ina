# Sistema di Traduzione - Guida all'uso

## File creati

1. **translations.json** - Contiene tutte le traduzioni per ITA, ENG e CZ
2. **i18n.js** - Gestisce il sistema di internazionalizzazione

## Come funziona

Il sistema:
- Salva la lingua selezionata in localStorage (persiste tra le pagine)
- Carica automaticamente la lingua quando carichi una pagina
- Traduce tutti gli elementi HTML con attributo `data-i18n`

## Come aggiungere traduzioni

### 1. Per testo semplice
Aggiungi l'attributo `data-i18n` all'elemento HTML:
```html
<h1 data-i18n="header.title">Tanti Nomi, Un Solo Mare</h1>
```

Poi nel file **translations.json**, aggiungi la traduzione:
```json
{
  "ita": {
    "header": {
      "title": "Tanti Nomi, Un Solo Mare"
    }
  },
  "eng": {
    "header": {
      "title": "Many Names, One Sea"
    }
  },
  "cz": {
    "header": {
      "title": "Mnoho jmen, jedno moře"
    }
  }
}
```

### 2. Per contenuto HTML
Usa `data-i18n-html` per contenuti con tag HTML:
```html
<div data-i18n-html="pagina1.paintings.mare1.fullText"></div>
```

## Struttura traduzioni già pronte

Nel file **translations.json** trovi già la struttura per:

### Header e navigazione
- `header.title` - Titolo principale index
- `header.galleryTitle` - Titolo galleria
- `audio.clickToActivate` - Messaggio attivazione audio
- `audio.activated` - Conferma audio attivato
- `navigation.left` - Freccia sinistra
- `navigation.right` - Freccia destra
- `navigation.opposite` - Freccia di fronte

### Opere Pagina 1 (Mare)
- `pagina1.paintings.mare1.title` - Titolo opera
- `pagina1.paintings.mare1.year` - Anno
- `pagina1.paintings.mare1.hoverTitle` - Titolo hover
- `pagina1.paintings.mare1.description` - Descrizione breve
- `pagina1.paintings.mare1.fullText` - Testo completo (HTML)

Stessa struttura per mare2, mare3, mare4, mare5, mare6, mare7

### Opere Pagina 2 (Oceano)
- `pagina2.paintings.oceano1.title`
- `pagina2.paintings.oceano1.year`
- `pagina2.paintings.oceano1.hoverTitle`
- `pagina2.paintings.oceano1.description`

Stessa struttura per oceano2, oceano3, oceano4, oceano5

### Opere Pagina 3 (Lago)
- `pagina3.paintings.lago1.title`
- `pagina3.paintings.lago1.year`
- `pagina3.paintings.lago1.hoverTitle`
- `pagina3.paintings.lago1.description`

Stessa struttura per lago2, lago3, lago4, lago5, lago6

## Come aggiungere le traduzioni ai quadri

Per tradurre i contenuti delle opere d'arte nelle pagine, devi:

### Esempio per i titoli dei quadri
```html
<!-- Prima -->
<h3>Mare I</h3>

<!-- Dopo -->
<h3 data-i18n="pagina1.paintings.mare1.title">Mare I</h3>
```

### Esempio per gli anni
```html
<!-- Prima -->
<p>1887</p>

<!-- Dopo -->
<p data-i18n="pagina1.paintings.mare1.year">1887</p>
```

### Esempio per hover title
```html
<!-- Prima -->
<div class="painting-hover-title">Lessico marino e acquatico del Decameron</div>

<!-- Dopo -->
<div class="painting-hover-title" data-i18n="pagina1.paintings.mare1.hoverTitle">Lessico marino e acquatico del Decameron</div>
```

### Esempio per descrizioni
```html
<!-- Prima -->
<h2>Mare I</h2>

<!-- Dopo -->
<h2 data-i18n="pagina1.paintings.mare1.title">Mare I</h2>
```

### Esempio per testo completo (HTML)
```html
<!-- Prima -->
<div class="painting-info">
    <h2>Lessico marino e acquatico nel Decameron</h2>
    <p><em>a cura di Claudia Palmieri</em></p>
    ...
</div>

<!-- Dopo -->
<div class="painting-info" data-i18n-html="pagina1.paintings.mare1.fullText">
    <!-- Il contenuto verrà sostituito dalla traduzione -->
</div>
```

## Dove inserire le traduzioni

Apri il file **translations.json** e:

1. Trova la sezione della lingua (ita, eng, cz)
2. Trova la chiave corrispondente
3. Sostituisci il testo placeholder con la traduzione reale

### Esempio:
```json
"eng": {
  "pagina1": {
    "paintings": {
      "mare1": {
        "title": "Sea I",
        "hoverTitle": "Marine and aquatic lexicon of the Decameron",
        "description": "Your English translation here...",
        "fullText": "<p>Your full English HTML content here...</p>"
      }
    }
  }
}
```

Per il ceco:
```json
"cz": {
  "pagina1": {
    "paintings": {
      "mare1": {
        "title": "Moře I",
        "hoverTitle": "Námořní a vodní lexikon Dekameronu",
        "description": "Váš český překlad zde...",
        "fullText": "<p>Váš úplný český HTML obsah zde...</p>"
      }
    }
  }
}
```

## Cambio lingua

Il selettore lingua è presente in alto a destra in tutte le pagine. La lingua selezionata viene salvata automaticamente e applicata a tutte le pagine quando le visiti.

## Aggiungere nuove chiavi di traduzione

Se vuoi tradurre altri elementi:

1. Aggiungi l'attributo `data-i18n="tua.chiave.qui"` all'elemento HTML
2. Aggiungi la chiave nel file translations.json per tutte e 3 le lingue:

```json
{
  "ita": {
    "tua": {
      "chiave": {
        "qui": "Testo in italiano"
      }
    }
  },
  "eng": {
    "tua": {
      "chiave": {
        "qui": "Text in English"
      }
    }
  },
  "cz": {
    "tua": {
      "chiave": {
        "qui": "Text v češtině"
      }
    }
  }
}
```

## Note importanti

- I testi attuali in italiano sono già inseriti come riferimento
- Le traduzioni in inglese e ceco hanno prefisso [EN] e [CZ] per indicare che vanno tradotte
- Sostituisci tutti i testi placeholder con le traduzioni reali
- Per contenuti HTML usa `data-i18n-html` invece di `data-i18n`
- Il sistema è già attivo e funzionante
