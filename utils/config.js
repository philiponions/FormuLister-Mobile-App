// config.js
import { REACT_APP_USER_DEV_MODE, REACT_APP_SOLVER_DEV_MODE, REACT_APP_USER_PROD_MODE, REACT_APP_SOLVER_PROD_MODE, } from '@env';

export default {
    user_url: REACT_APP_USER_DEV_MODE,    
    solver_url: REACT_APP_SOLVER_PROD_MODE,    
  }