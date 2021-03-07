import {
  NAV_PAGE,
} from './constants';

const INIT_STATE = {
  nav_page: 'home'
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case NAV_PAGE:
      return { ...state, nav_page: action.payload };

    default: return { ...state };
  }
}

export default Layout;