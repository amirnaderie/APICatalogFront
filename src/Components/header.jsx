import { React, useContext } from "react";
import { Context } from "./context";
import "./header.css";
const Header = () => {
  const {setToggleMenu} = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-dark d-flex justify-content-between">
     <button type="button" id="sidebarCollapse" onClick={()=>setToggleMenu()} className="navbar-btn mx-2">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
       <div className="mx-3 text-light">
        بازارچه API  بانک سپه
      </div>
      <a className="navbar-brand mx-3" href="#">
        <img
          src="/Api.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
      </a>
     
    </nav>
  );
};

export default Header;
