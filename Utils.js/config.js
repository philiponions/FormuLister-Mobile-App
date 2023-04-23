// config.js
import { REACT_APP_DEV_MODE, REACT_APP_PROD_MODE } from '@env';

export default {
    url: process.env.NODE_ENV === "development" ? REACT_APP_DEV_MODE : REACT_APP_PROD_MODE,    
  }