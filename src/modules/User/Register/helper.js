/* eslint-disable no-useless-escape */
export const requirements = [
  {
    title: 'One uppercase character',
    regex: /(.*[A-Z].*)/
  },
  {
    title: 'One lowercase character',
    regex: /(.*[a-z].*)/
  },
  {
    title: 'One number or symbol',
    regex: /(\d|[-`~!@#$%^&*()_+={}\[\];':",./\\|<>?])+/
  },
  { title: '8 characters minimum', regex: /.{8,}/ }
]
