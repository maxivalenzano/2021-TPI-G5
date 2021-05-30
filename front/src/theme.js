import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffA500',
        },
        secondary: {
            main: '#0070FF',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#cfe8fc',
        },
    },
});

export default theme;