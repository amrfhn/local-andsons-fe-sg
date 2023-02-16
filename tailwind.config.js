module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundSize: {
        none: '0 0'
      },
      colors: {
        secondary: '#ed9075',
        bismark: '#457a86',
        prescription: '#F3FF37',
        limegreen: '#E8E9C6',
        'brand-black': '#000000',
        'brand-white': '#FFFFFF'
      },
      fontFamily: {
        normal: ['PublicSans'],
        black: ['PublicSansBlack'],
        bold: ['PublicSansBold'],
        medium: ['PublicSansSemiBold'],
        extrabold: ['PublicSansExtraBold'],
        ahamono: ['AHAMONO']
      },
      fontSize: {
        '2.5xl': '1.75rem'
      },
      padding: {
        '5vw': '5vw',
        '7.5vw': '7.5vw',
        '10vw': '10vw'
      },
      minHeight: {
        auto: 'auto',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem'
      },
      maxWidth: {
        '1/1': '100%',
        '1/2': '50%',
        '1/3': '33.3333%',
        '2/3': '66.6666%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%'
      },
      width: {
        'fit': 'fit-content'
      }
    }
  },
  safelist: [
    'max-w-1/1',
    'max-w-1/2',
    'max-w-1/3',
    'max-w-2/3',
    'max-w-1/4',
    'max-w-2/4',
    'max-w-3/4',
    'max-w-1/5',
    'max-w-2/5',
    'max-w-3/5',
    'max-w-4/5',
    'md:max-w-1/1',
    'md:max-w-1/2',
    'md:max-w-1/3',
    'md:max-w-2/3',
    'md:max-w-1/4',
    'md:max-w-2/4',
    'md:max-w-3/4',
    'md:max-w-1/5',
    'md:max-w-2/5',
    'md:max-w-3/5',
    'md:max-w-4/5',
    'tw-max-w-1/1',
    'tw-max-w-1/2',
    'tw-max-w-1/3',
    'tw-max-w-2/3',
    'tw-max-w-1/4',
    'tw-max-w-2/4',
    'tw-max-w-3/4',
    'tw-max-w-1/5',
    'tw-max-w-2/5',
    'tw-max-w-3/5',
    'tw-max-w-4/5',
    'md:tw-max-w-1/1',
    'md:tw-max-w-1/2',
    'md:tw-max-w-1/3',
    'md:tw-max-w-2/3',
    'md:tw-max-w-1/4',
    'md:tw-max-w-2/4',
    'md:tw-max-w-3/4',
    'md:tw-max-w-1/5',
    'md:tw-max-w-2/5',
    'md:tw-max-w-3/5',
    'md:tw-max-w-4/5',
    'tw-min-h-auto',
    'tw-min-h-36',
    'tw-min-h-40',
    'md:tw-min-h-auto',
    'md:tw-min-h-36',
    'md:tw-min-h-40',
    'tw-bg-none',
    'md:tw-bg-none'
  ],
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  prefix: 'tw-'
}
