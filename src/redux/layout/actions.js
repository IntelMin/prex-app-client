import {
  NAV_PAGE,
} from './constants';


export const setNavPage = (page) => ({
    type: NAV_PAGE,
    payload: page
});
