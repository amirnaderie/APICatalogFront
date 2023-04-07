import axios from "axios";
const appUrl=process.env.REACT_APP_URL + "menus";

export function getmenus() {
  return axios.get(appUrl );
}

export function insOrUpmenus(insOrUp,Menu) {
  if (insOrUp)
    return axios.post(appUrl, Menu);
  else
    return axios.put(appUrl, Menu);
}

export function insOrUpsubmenus(insOrUp,subMenu) {
  if (insOrUp)
    return axios.post(appUrl+"/submenu", subMenu);
  else
    return axios.put(appUrl+"/submenu", subMenu);
}