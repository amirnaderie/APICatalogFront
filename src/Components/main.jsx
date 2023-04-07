import { Fragment, React, useState } from "react";
import Content from "./content";
import Header from "./header";
import SideBar from "./sideBar";
import { Context } from "./context";
import Crud from "./crud";
import { HashRouter, Route, Routes } from "react-router-dom";

const Main = () => {
  const [selectedMenu, setSelectedMenu] = useState({});
  const [selectedSubMenu, setSelectedSubMenu] = useState(0);
  const [toggledMenu, setToggledMenu] = useState(false);
  const [changedMenu, setChangedMenu] = useState(false);

  const setToggleMenu = () => {
    setToggledMenu(!toggledMenu);
  };
  const setChangeMenu = () => {
    setChangedMenu(!changedMenu);
  };
  return (
    <Context.Provider
      value={{ selectedSubMenu, setSelectedSubMenu, toggledMenu, setToggleMenu,selectedMenu,setSelectedMenu,setChangeMenu,changedMenu }}
    >
      <Fragment>
        <Header />
        <div className="d-flex">
          <SideBar />
          <HashRouter>
            <Routes>
              <Route exact path="/" element={<Content />} />
              <Route exact path="/crud" element={<Crud />} />
            </Routes>
          </HashRouter>
        </div>
      </Fragment>
    </Context.Provider>
  );
};

export default Main;
