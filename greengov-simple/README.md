# GreenGov — Developer Guide

This is a simplified, heavily-commented version of the GreenGov React frontend.
Every visual effect and React pattern is explained in the source files.
Below is a quick reference to find each concept.

---

## Project Structure

```
greengov-simple/
├── public/
│   └── index.html              ← Browser entry point (the HTML shell)
├── src/
│   ├── index.js                ← JS entry point (boots React into #root)
│   ├── App.jsx                 ← Sets up routing (which URL shows which page)
│   ├── styles/
│   │   └── global.css          ← CSS variables, reset, and keyframe animations
│   ├── pages/
│   │   └── HomePage.jsx        ← Assembles all sections into one page
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx      ← Scroll-detect navbar + mobile hamburger menu
│       │   └── Navbar.css
│       └── home/
│           ├── HeroSection.jsx ← Canvas particles + CSS glow orbs + SVG donut
│           ├── HeroSection.css
│           ├── StatsSection.jsx ← Animated number counter + IntersectionObserver
│           ├── StatsSection.css
│           ├── FeaturesSection.jsx ← Scroll-reveal cards (staggered)
│           ├── FeaturesSection.css
│           ├── ProgramsSection.jsx ← Data-driven cards with conditional styles
│           ├── ProgramsSection.css
│           ├── RolesSection.jsx ← Tab switcher with useState
│           ├── RolesSection.css
│           ├── CTASection.jsx  ← Stateless component + CSS ring animation
│           ├── CTASection.css
│           ├── Footer.jsx      ← Nested .map() for link columns
│           └── Footer.css
└── package.json
```

---

## Effect Quick Reference

### 1. Canvas Particle Animation
**File:** `src/components/home/HeroSection.jsx`

Floating green dots drawn on an HTML `<canvas>` element using the 2D drawing API.
- `useRef` connects React to the canvas DOM element
- `requestAnimationFrame` creates a 60fps animation loop
- Each "particle" is an object `{ x, y, vx, vy, r, alpha }` updated every frame
- Cleanup: `cancelAnimationFrame` stops the loop on component unmount

```js
// Core loop:
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // erase
  particles.forEach(p => {
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); // draw dot
    p.y += p.vy; // move upward
  });
  animationFrameId = requestAnimationFrame(draw); // loop
};
```

---

### 2. CSS Background Orbs (Glowing Blobs)
**File:** `src/components/home/HeroSection.css` — `.bg-orb`

Divs with `border-radius: 50%` + `radial-gradient` background + `filter: blur(80px)`.
The heavy blur removes visible edges, making them look like glowing light sources.

```css
.bg-orb {
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74,155,111,0.35) 0%, transparent 70%);
  filter: blur(80px); /* ← this is the key — blurs the whole element */
}
```

---

### 3. CSS Grid Overlay
**File:** `src/components/home/HeroSection.css` — `.hero-grid-overlay`

Two `linear-gradient` backgrounds stacked via comma separation in `background-image`.
Each is a 1px colored line that tiles across the section at 60px intervals.

```css
background-image:
  linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
background-size: 60px 60px;
```

---

### 4. Gradient Text (Shimmer Effect)
**File:** `src/components/home/HeroSection.css` — `.headline-accent`

The gradient is applied as a background, then clipped to the text shape.
The `shimmer` animation slides `background-position` to make it flow.

```css
.headline-accent {
  background: linear-gradient(135deg, #7ec8a0, #c9a84c);
  background-size: 200% auto;           /* wider than text so it can slide */
  -webkit-background-clip: text;        /* clip gradient to text outline */
  -webkit-text-fill-color: transparent; /* hide the text fill */
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
```

---

### 5. Pulsing Ring (Badge Dot)
**File:** `src/components/home/HeroSection.css` — `.badge-dot::after`

A CSS pseudo-element (`::after`) acts like an invisible child element.
It scales up and fades out using `pulse-ring` keyframes — like a radar ping.

```css
.badge-dot::after {
  content: '';           /* required for pseudo-elements to render */
  position: absolute;
  inset: -3px;           /* slightly larger than the dot */
  border-radius: 50%;
  border: 1px solid var(--mint);
  animation: pulse-ring 1.5s ease-out infinite;
}

@keyframes pulse-ring {
  0%   { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}
```

---

### 6. Float Animation (Hero Card)
**File:** `src/styles/global.css` — `.float` + `@keyframes float`

The visual card gently bobs up and down using `translateY`.

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}
.float { animation: float 4s ease-in-out infinite; }
```

---

### 7. Scroll-Triggered Navbar Background
**File:** `src/components/layout/Navbar.jsx` + `Navbar.css`

`useEffect` adds a scroll event listener. When `window.scrollY > 60`,
the `scrolled` state becomes `true`, adding the `.scrolled` CSS class.
CSS `transition` smoothly animates the background change.

```js
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll); // cleanup
}, []);
```

```css
.gg-navbar { background: transparent; transition: background 0.3s ease; }
.gg-navbar.scrolled { background: rgba(6, 32, 15, 0.95); }
```

---

### 8. Animated Number Counter
**File:** `src/components/home/StatsSection.jsx` — `useCounter` hook

A custom hook uses `setInterval` to increment a number toward a target,
creating a counting animation. It only starts when `start` is `true`.

```js
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16); // amount per frame
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer); // stop when done
    }, 16); // ~60fps
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
};
```

---

### 9. IntersectionObserver (Trigger on Scroll)
**File:** `src/components/home/StatsSection.jsx` + `FeaturesSection.jsx`

`IntersectionObserver` watches when an element enters the viewport.

**In StatsSection:** triggers the counter animation  
**In FeaturesSection:** reveals hidden cards by changing their opacity and transform

```js
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    setAnimate(true);    // or directly change element styles
    observer.disconnect(); // stop watching after first trigger
  }
}, { threshold: 0.2 }); // fires when 20% is visible

observer.observe(ref.current); // start watching the element
```

---

### 10. Scroll-Reveal with Stagger (Feature Cards)
**File:** `src/components/home/FeaturesSection.jsx`

Each card starts invisible (`opacity: 0`, `translateY: 20px`).
IntersectionObserver sets them to visible. A staggered `transitionDelay`
makes them appear one after another.

```js
cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  card.style.transitionDelay = `${index * 0.08}s`; // 0s, 0.08s, 0.16s...
  observer.observe(card);
});
```

---

### 11. Tab Switcher (useState)
**File:** `src/components/home/RolesSection.jsx`

Classic tab pattern: state holds the active tab ID. Clicking a tab updates state.
React re-renders and shows the correct detail panel.

```js
const [active, setActive] = useState('citizen'); // default tab
const role = roles.find(r => r.id === active);   // derive current role

<button onClick={() => setActive(r.id)}>...</button> // update on click
<div key={active}>...</div>  // key trick: remounts panel on tab change
```

---

### 12. SVG Donut Chart
**File:** `src/components/home/HeroSection.jsx`

Built from `<circle>` SVG elements using `stroke-dasharray` to show partial arcs.
- `stroke-dasharray="220 80"` = 220px colored stroke, 80px gap (out of ~301px circumference)
- `stroke-dashoffset` shifts the starting position around the circle
- The SVG is rotated -90° in CSS so the gap starts at the top

```jsx
<circle cx="60" cy="60" r="48"
  stroke="#7ec8a0"
  strokeDasharray="220 80"    // 220/(220+80) ≈ 73%
  strokeDashoffset="60"       // shift start clockwise
/>
```

---

## Key React Concepts Used

| Concept | Where Used |
|---|---|
| `useState` | Navbar (scroll/menu), StatsSection (animate), RolesSection (active tab) |
| `useEffect` | Navbar (scroll listener), HeroSection (canvas), StatsSection (IntersectionObserver), FeaturesSection (IntersectionObserver), useCounter |
| `useRef` | HeroSection (canvas element), StatsSection (section element) |
| Custom Hook | `useCounter` in StatsSection |
| `Array.map()` | All list-like UI: stats, features, programs, roles, footer links |
| Conditional className | Navbar (`scrolled`, `active`, `open`) |
| Conditional inline style | ProgramsSection (status color, bar color, disabled button) |
| key prop trick | RolesSection (remount panel on tab change) |
| Derived state | RolesSection (`role = roles.find(...)`) |

---

## Running the Project

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.
