/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ag: {
          abyss: '#000521',
          void: '#020024',
          obsidian: '#020C47',
          cyber: '#0A1A2F',
          imperial: '#011F65',
          sapphire: '#0E4EB2',
          azure: '#2078CF',
          cyan: '#00D4FF',
          carbon: '#1F1F1F',
          midnight: '#020C47',
          cobalt: '#0E4EB2',
          navy: '#0A1A2F',
          charcoal: '#1F1F1F',
          metallic: '#11203A'
        }
      },
      backgroundImage: {
        'metallic-matte': 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(45, 95, 170, 0.22), transparent 70%), linear-gradient(180deg, #11203A 0%, #0C1629 45%, #070E1B 100%)',
        'dark-elegant': 'linear-gradient(145deg, #0E1A30 0%, #15223C 100%)',
        'neon-dusk': 'linear-gradient(135deg, #00D4FF 0%, #2078CF 45%, #020024 100%)',
        'blue-tier': 'linear-gradient(135deg, #2078CF 0%, #0E4EB2 50%, #011F65 100%)'
      }
    }
  },
  plugins: []
};
