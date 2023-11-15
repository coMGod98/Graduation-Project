import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    
    strong {
      font-weight: bold;
    }
    
    a {
        text-decoration: none;
    }

    button {
        border: 1px gray solid;
        cursor: pointer;
    }

    .slick-slider .slick-track, .slick-slider .slick-list {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

`;

export default GlobalStyles;
