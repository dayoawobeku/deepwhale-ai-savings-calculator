import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      white: {
        DEFAULT: '#FFF',
        900: '#F9F9F9',
        800: '#FFFAFF',
      },
      black: {
        DEFAULT: '#000',
      },
      grey: {
        DEFAULT: '#1C1E26',
        900: '#1E1E1E',
        700: '#7A7A7A',
        500: '#BCC1CD',
        400: '#EDEDED',
      },
      transparent: 'transparent',
    },
  },
  plugins: [],
};
export default config;
