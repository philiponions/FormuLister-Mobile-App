// config.js
import { REACT_APP_USER_DEV_MODE, REACT_APP_SOLVER_DEV_MODE, REACT_APP_USER_PROD_MODE, REACT_APP_SOLVER_PROD_MODE, } from '@env';

export default {
    user_url: process.env.NODE_ENV === "development" ? REACT_APP_USER_DEV_MODE : REACT_APP_USER_PROD_MODE,    
    solver_url: process.env.NODE_ENV === "development" ? REACT_APP_SOLVER_DEV_MODE : REACT_APP_SOLVER_PROD_MODE,    
  }