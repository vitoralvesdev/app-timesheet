import { extendTheme } from 'native-base'

export const THEME = extendTheme({
    colors: {
        primary: {
            100: '#FFFFFF'
        },
        gray: {
            100: '#78828A'
        },
        purple: {
            100: '#4F3D56'
        }
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
    }
})