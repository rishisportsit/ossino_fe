# Theme System Quick Reference Card

## 🎨 Color Classes Cheat Sheet

### Surface Colors (Backgrounds)
```tsx
bg-surface-base          // Page background (darkest)
bg-surface-elevated      // Cards, panels
bg-surface-overlay       // Modals, dropdowns  
bg-surface-interactive   // Buttons, hover states (lightest)
```

### Text Colors
```tsx
text-text-base           // Primary text (100% white)
text-text-muted          // Secondary text (75% opacity)
text-text-subtle         // Tertiary text (50% opacity)
```

### Brand Colors
```tsx
// Solid colors
bg-primary               // Main brand color
bg-secondary             // Secondary brand color
bg-accent                // Accent color
bg-tertiary              // Additional accent

text-primary             // Colored text
border-primary           // Colored borders

// With opacity (any value 0-100!)
bg-primary/80            // 80% opacity
bg-primary/50            // 50% opacity  
bg-primary/20            // 20% opacity
text-secondary/60        // 60% opacity text
```

### Status Colors
```tsx
// Solid
text-success, bg-success
text-error, bg-error
text-warning, bg-warning
text-info, bg-info

// With opacity
bg-success/10            // Subtle green background
text-error/80            // Slightly transparent red
```

### Gradients
```tsx
bg-gradient-button       // Primary button gradient (adapts to theme)
bg-gradient-accent       // Accent gradient
bg-gradient-overlay      // Subtle depth gradient
```

### Base Scale (Grayscale)
```tsx
bg-base-100              // Lightest gray
bg-base-300              // Light gray
bg-base-500              // Medium gray
bg-base-600              // Dark gray
bg-base-700              // Darker gray
bg-base-800              // Very dark
bg-base-900              // Darkest (black)

// Use opacity for intermediate shades
bg-base-600/90           // Instead of base-620
bg-base-700/80           // Instead of base-680
```

---

## 🔄 Migration Quick Reference

| OLD | NEW | Notes |
|-----|-----|-------|
| `bg-base-800` | `bg-surface-elevated` | Cards/panels |
| `bg-base-700` | `bg-surface-overlay` | Modals |
| `bg-primary` | `bg-surface-base` | Page bg |
| `text-base-100` | `text-text-base` | Primary text |
| `text-base-300` | `text-text-muted` | Secondary |
| `bg-primary-1` | ✅ Still works! | No migration needed |
| `text-primary-2` | ✅ Still works! | No migration needed |
| `text-secondary-1` | ✅ Still works! | No migration needed |
| `text-secondary-2` | ✅ Still works! | No migration needed |
| `text-status-error-100` | ✅ Still works! | No migration needed |
| `bg-base-620` | `bg-base-600/90` | Use opacity |
| `bg-button-gradient` | `bg-gradient-button` | Gradient |

---

## 🎯 Common Patterns

### Card Component
```tsx
<div className="bg-surface-elevated border border-border-base rounded-xl p-6">
  <h3 className="text-text-base font-bold">Title</h3>
  <p className="text-text-muted">Description</p>
  <div className="bg-surface-overlay rounded-lg p-4">
    <span className="text-primary">Accent Text</span>
  </div>
</div>
```

### Button Variants
```tsx
// Primary button
<button className="bg-gradient-button text-surface-base px-6 py-3 rounded-lg">
  Primary
</button>

// Secondary button
<button className="bg-surface-interactive text-text-base border border-border-base">
  Secondary
</button>

// Outline button
<button className="border-2 border-primary text-primary bg-transparent hover:bg-primary/10">
  Outline
</button>

// Ghost button
<button className="text-text-base hover:bg-surface-interactive">
  Ghost
</button>
```

### Status Badge
```tsx
// Success
<span className="bg-success/20 text-success px-3 py-1 rounded-full text-xs">
  Active
</span>

// Error
<span className="bg-error/20 text-error px-3 py-1 rounded-full text-xs">
  Failed
</span>

// Warning
<span className="bg-warning/20 text-warning px-3 py-1 rounded-full text-xs">
  Pending
</span>
```

### Modal/Dialog
```tsx
<div className="fixed inset-0 bg-surface-base/80 backdrop-blur">
  <div className="bg-surface-overlay border border-border-base rounded-2xl p-6">
    <h2 className="text-text-base text-xl font-bold">Modal Title</h2>
    <p className="text-text-muted">Modal content</p>
    <button className="bg-gradient-button text-surface-base">
      Confirm
    </button>
  </div>
</div>
```

---

## 🎨 Theme Switching

### In Components
```tsx
import { useTheme } from '@/components/shared/ThemeProvider';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="default">Neon Green</option>
      <option value="blue-purple">Blue Purple</option>
      <option value="fire">Fire</option>
      <option value="ocean">Ocean</option>
    </select>
  );
}
```

### Add Theme Switcher UI
```tsx
import ThemeSwitcher from '@/components/shared/ThemeSwitcher';

<ThemeSwitcher />
```

---

## 📊 Available Themes

| Theme | Primary Color | Use Case |
|-------|---------------|----------|
| `default` | Neon Green | Classic casino |
| `blue-purple` | Blue/Purple | Cool tones |
| `fire` | Orange/Red | Hot/energetic |
| `ocean` | Cyan/Teal | Calm/professional |

---

## 🔧 Custom Theme (Quick)

**New: Just define 4 colors, all variants auto-calculated!**

```css
/* Add to src/styles/theme-optimized.css */

[data-theme="my-theme"] {
  /* Define ONLY these 4 base colors: */
  --color-primary: 300 100% 50%;     /* Purple */
  --color-secondary: 320 80% 55%;    /* Pink */
  --color-accent: 200 100% 60%;      /* Blue */
  --color-tertiary: 280 100% 55%;    /* Light purple */
  
  /* Optional: Override surfaces */
  --surface-base: 300 30% 5%;        /* Dark purple bg */
  --surface-elevated: 300 25% 10%;
  
  /* ✅ AUTO-GENERATED using color-mix():
     primary-1, primary-2, primary-3
     secondary-1, secondary-2, secondary-3
     secondary-light-1 through -7
     accent-1, accent-2, accent-3, accent-4
     All gradients adapt automatically! */
}

/* Done! 20+ color variants created from 4 base colors! */
```

**Formula Used:**
```css
primary-2 = 75% primary + 25% white
primary-3 = 45% primary + 55% white
/* Perfect lighter shades, works for any color! */
```

```tsx
// Add to ThemeProvider
export const THEME_METADATA = {
  'my-theme': {
    label: 'My Theme',
    description: 'Custom theme',
    preview: 'hsl(300 100% 50%)',
  },
};
```

---

## 💡 Pro Tips

### Use Opacity Instead of Separate Shades
```tsx
// ❌ OLD WAY: Need separate variables
bg-primary-light, bg-primary-lighter, bg-primary-lightest

// ✅ NEW WAY: One variable, any opacity
bg-primary/10, bg-primary/20, bg-primary/50, bg-primary/80
```

### Clear Hierarchy
```tsx
// Surface z-index hierarchy (from back to front):
bg-surface-base        // 1. Page background
bg-surface-elevated    // 2. Cards on page
bg-surface-overlay     // 3. Modals/dropdowns
bg-surface-interactive // 4. Buttons/hover states
```

### Semantic Over Generic
```tsx
// ❌ UNCLEAR
<div className="bg-base-800">

// ✅ CLEAR
<div className="bg-surface-elevated">  // It's a card!
```

### Theme-Aware Gradients
```tsx
// ✅ Gradients adapt to current theme automatically
bg-gradient-button

// Changes from green → blue → orange → cyan 
// when you switch themes!
```

---

## 📱 Responsive Example
```tsx
<div className="
  bg-surface-elevated
  p-4 sm:p-6 lg:p-8
  rounded-lg sm:rounded-xl lg:rounded-2xl
">
  <h2 className="text-text-base text-lg sm:text-xl lg:text-2xl">
    Responsive Card
  </h2>
  <p className="text-text-muted text-sm sm:text-base">
    Content adapts to screen size
  </p>
</div>
```

---

## 🐛 Troubleshooting

```bash
# Theme not applying?
# Check: <html data-theme="default"> in DevTools

# Colors wrong?
# Verify HSL format: hsl(var(--color-primary) / <alpha-value>)

# Opacity not working?
# Use: bg-primary/50 NOT bg-primary-50
```

---

## 📚 Full Documentation

- [THEME_IMPLEMENTATION_GUIDE.md](./THEME_IMPLEMENTATION_GUIDE.md) - Complete setup
- [THEME_OPTIMIZATION_COMPARISON.md](./THEME_OPTIMIZATION_COMPARISON.md) - Before/after
- [THEME_REDUCTION_BREAKDOWN.md](./THEME_REDUCTION_BREAKDOWN.md) - Variable analysis

---

**Print this card for quick reference while coding! 🎯**
