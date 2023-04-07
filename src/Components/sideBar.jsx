import { React, useContext, useState, useEffect, useRef } from "react";
import { getmenus } from "../Services/menusService";
import { Context } from "./context";

import "./sideBar.css";

const SideBar = () => {
  const { setSelectedSubMenu, toggledMenu, setToggleMenu,setSelectedMenu,changedMenu } = useContext(Context);
  const [mainMenu, setMainMenu] = useState([]);
  const [subMenu, setSubMenu] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      const { data } = await getmenus();
      setMainMenu(data.Menu);
      setSubMenu(data.SubMenu);
    }
    fetchAPI();
  }, [changedMenu]);

  ///start  handle Click outside to deactive opened sidebar
  //  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (
      !myRef.current.contains(e.target) &&
      e.target.id !== "sidebarCollapse"
    ) {
      if (toggledMenu) setToggleMenu();
    }
  };

  //const handleClickInside = () => setClickedOutside(false);
  ///end

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="wrapper" ref={myRef}>
      <nav id="sidebar" className={toggledMenu ? "active" : ""}>
        <ul className="list-unstyled components text-dark">
          <p className="text-alert"> تفکیک خدمات</p>
          {mainMenu.map((item) => (
            <li key={`li${item["id"]}`}>
              <a
                href={`#ul${item["id"]}`}
                data-bs-toggle="collapse"
                aria-expanded="false"
                onClick={() => {
                  setSelectedMenu({id:item["id"],name:item["Name"]});
                }}
              >
                {item.Name}
              </a>
              <ul className="collapse list-unstyled" id={`ul${item["id"]}`}>
                {subMenu
                  .filter((submenu) => submenu["parentId"] === item["id"])
                  .map((subitem) => (
                    <li key={`subli${subitem["id"]}`} className="px-3">
                      <a
                        href={() => false}
                        onClick={() => {
                          setSelectedSubMenu({id:subitem["id"],Name:subitem["Name"],parentId:subitem["parentId"]} );
                        }}
                      >
                        {`- ${subitem.Name}`}
                      </a>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
