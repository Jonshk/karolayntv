# Karolayntv — Portfolio Web

Sitio web profesional para **Karolaynt Villarroel** (@Karolayntv).  
Locutora de radio · Creadora de contenidos · Publicidad digital.

## Stack

- **React 18** + **Vite 5**
- CSS Modules (sin Tailwind, control total del diseño)
- Fuentes: Playfair Display + DM Sans (Google Fonts)
- Animaciones CSS puras + IntersectionObserver

---

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## Build para producción

```bash
npm run build
npm run preview   # vista previa del build
```

Los archivos quedan en `/dist` — listos para subir a Vercel, Netlify o cualquier hosting.

---

## Personalización rápida

### 🖼️ Foto de perfil
En `src/components/About.module.css`, reemplaza el placeholder:
```css
.imagePlaceholder {
  /* Añade esta línea: */
  background-image: url('/tu-foto.jpg');
  background-size: cover;
  background-position: center top;
}
```
Coloca tu foto en la carpeta `/public`.

### 📧 Email de contacto
En `src/components/Contact.jsx`, línea del `href`:
```jsx
href="mailto:TU-EMAIL-REAL@gmail.com"
```
Y el texto visible:
```jsx
<span className={styles.emailText}>TU-EMAIL-REAL@gmail.com</span>
```

### 🔗 Links de redes sociales
En `src/components/Redes.jsx`, actualiza las URLs en el array `redes`:
```js
url: 'https://tiktok.com/@TU-USUARIO',
url: 'https://instagram.com/TU-USUARIO',
// etc.
```
Y también en `src/components/Contact.jsx` el array de socials.

### 🎨 Colores
En `src/styles/global.css`:
```css
--accent: #e63946;   /* rojo — color principal */
--accent2: #f4a261;  /* naranja — acentos secundarios */
```

---

## Estructura del proyecto

```
karolayntv/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx / .module.css
│   │   ├── Navbar.jsx / .module.css
│   │   ├── Hero.jsx / .module.css
│   │   ├── StatsBar.jsx / .module.css
│   │   ├── About.jsx / .module.css
│   │   ├── Services.jsx / .module.css
│   │   ├── Redes.jsx / .module.css
│   │   ├── Contact.jsx / .module.css
│   │   └── Footer.jsx / .module.css
│   ├── hooks/
│   │   ├── useCursor.js
│   │   └── useReveal.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Deploy en Vercel (gratis)

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) → Import Project
3. Selecciona el repo → Deploy
4. ¡Listo! URL automática en segundos.

---

## Activar el formulario de contacto

El formulario está listo. Para que los mensajes lleguen de verdad, elige una opción:

### Opción A — Formspree (RECOMENDADO, gratis)
1. Ve a https://formspree.io → crea cuenta gratis
2. Crea un nuevo Form → copia el endpoint (ej: `https://formspree.io/f/xabcdef`)
3. En `src/components/ContactForm.jsx`, línea con `FORMSPREE_URL`, reemplaza `YOUR_FORM_ID`

### Opción B — WhatsApp directo
En `src/components/ContactForm.jsx`, dentro de `handleSubmit`, reemplaza el bloque `fetch` por:
```js
const texto = `Hola! Soy ${form.name} de ${form.brand}. Servicio: ${form.service}. ${form.message}`
window.open(`https://wa.me/+TUNUMERO?text=${encodeURIComponent(texto)}`, '_blank')
setStatus('success')
```
