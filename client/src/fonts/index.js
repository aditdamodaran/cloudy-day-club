import { createGlobalStyle } from 'styled-components';

import ProximaNovaBoldWoff from './proxima_nova/proxima_nova_bold.woff';
import ProximaNovaBoldWoff2 from './proxima_nova/proxima_nova_bold.woff2';
import ProximaNovaSemiBoldWoff from './proxima_nova/proxima_nova_semibold.woff';
import ProximaNovaSemiBoldWoff2 from './proxima_nova/proxima_nova_semibold.woff2';

export default createGlobalStyle`
  @font-face {
      font-family: 'ProximaNova-Bold';
      src: local('ProximaNova-Bold'), local('ProximaNova-Bold'),
      url(${ProximaNovaBoldWoff2}) format('woff2'),
      url(${ProximaNovaBoldWoff}) format('woff');
      font-weight: 700;
      font-style: bold;
  }
  @font-face {
    font-family: 'ProximaNova-SemiBold';
    src: local('ProximaNova-SemiBold'), local('ProximaNova-SemiBold'),
    url(${ProximaNovaSemiBoldWoff2}) format('woff2'),
    url(${ProximaNovaSemiBoldWoff}) format('woff');
    font-weight: 600;
    font-style: bold;
  }
`;