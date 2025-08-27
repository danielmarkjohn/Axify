/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        muted: 'var(--color-muted)',
        card: 'var(--color-card)',
        'card-hover': 'var(--color-card-hover)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-foreground': 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'secondary-foreground': 'var(--color-secondary-foreground)',
        badge: 'var(--color-badge-bg)',
        'badge-text': 'var(--color-badge-fg)',
        overlay: 'var(--color-overlay)',
        success: 'var(--color-success)'
      }
    },
  },
  plugins: [],
}
