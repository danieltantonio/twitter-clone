import type { Config } from 'tailwindcss'
import colors from "tailwindcss/colors";
import withMt from "@material-tailwind/react/utils/withMT";

const config = withMt({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "rgb(29, 155, 240)",
        slate: "rgb(148 163 184)",
      },
      dropShadow: {
        "tooltip": "0 0 0.4rem rgb(32, 35, 39)"
      }
    },
    colors: {
      transparent: "transparent",
      white: colors.white,
      black: colors.black,
      rdgrey: "rgb(22, 24, 28)",
      rlgrey: "rgb(32, 35, 39)",
      rwhite: "rgb(239, 243, 244)",
      green: "rgb(0, 186, 124)",
      like: "rgb(249, 24, 128)"
    }
  },
  plugins: [],
});

export default config
