import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        "cademit": {
          "primary": "#149DF0",
          "secondary": "#FFFFFF",
          "accent": "#FCC236",
          "neutral": "#16333D",
          "base-100": "",
        },
      },
      "emerald",
      "light",
      "dark",
    ],
  },
}
export default config
