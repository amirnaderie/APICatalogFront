import React, { useContext, useEffect, useState } from "react";
import Input from "./common/input/input";
import { Context } from "./context";
import { useFormik } from "formik";
import { insOrUpmenus,getmenus,insOrUpsubmenus } from "../Services/menusService";
import Select from './common/select/select';

const Crud = () => {
  const { selectedMenu, setChangeMenu,selectedSubMenu } = useContext(Context);
  const [isnewMenu, SetIsnewMenu] = useState(false);
  const [isnewSubMenu, SetIsnewSubMenu] = useState(false);
  const [menuData,setMenuData]=useState([]);
  
  
  const loadMenu=async ()=>{
  const { data } = await getmenus();
   setMenuData(data.Menu);
   } 

  useEffect(() => {
    loadMenu();
  }, []);

  ///Menu
  const formik = useFormik({
    initialValues: {
      id: selectedMenu.name,
      menuName: selectedMenu.name,
    },
    onSubmit: async (values) => {
      const retval = await insOrUpmenus(isnewMenu, values);
      if (retval.status === 200) {
        if (isnewMenu) 
          formik.setFieldValue("id", retval.data.newRowId);
        setChangeMenu();
                
      }
      SetIsnewMenu(false);
    },
    enableReinitialze: true,
  });

  const newMenuBtnClick = (event) => {
    event.preventDefault();
    formik.setFieldValue("menuName", "");
    SetIsnewMenu(true);
  };
  useEffect(() => {
    formik.setFieldValue("id", selectedMenu.id);
    formik.setFieldValue("menuName", selectedMenu.name);
  }, [selectedMenu]);
  ///End Menu
  ///SubMenu
  const subMenuformik = useFormik({
    initialValues: {
      id: selectedSubMenu.id,
      parentId:0,
      subMenuName: selectedSubMenu.Name,
    },
    onSubmit: async (values) => {
      const retval = await insOrUpsubmenus(isnewSubMenu, values);
      if (retval.status === 200) {
          if (isnewSubMenu) subMenuformik.setFieldValue("id", retval.data.newRowId);
        setChangeMenu();
      }
      SetIsnewSubMenu(false);
    },
    enableReinitialze: true,
  });
  useEffect(() => {
    subMenuformik.setFieldValue("id", selectedSubMenu.id);
    subMenuformik.setFieldValue("parentId", selectedSubMenu.parentId);
    subMenuformik.setFieldValue("subMenuName", selectedSubMenu.Name);
  }, [selectedSubMenu]);

  const newSubMenuBtnClick = (event) => {
    event.preventDefault();
    subMenuformik.setFieldValue("parentId", "0");
    subMenuformik.setFieldValue("subMenuName", "");
    SetIsnewSubMenu(true);
  };
  ///EndSubMenu
  
  return (
    <section id="crud" className="container py-2 ">
      <div className="row pb-2">
        <div className="col-lg-5 mb-4 ">
          <div className="d-flex flex-column justify-content-between">
            <div className="border-bottom mb-3 pb-5">
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="menuName"
                tabIndex="1"
                maxLength={40}
                name="menuName"
                type="text"
                readOnly={
                  formik.values.menuName === undefined && isnewMenu === false
                    ? true
                    : false
                }
                labelcolor="text-info"
                onChange={formik.handleChange}
                label="عنوان گروه"
                value={formik.values.menuName}
                effect={false}
              />
              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-secondary my-2"
                  onClick={newMenuBtnClick}
                >
                  جدید
                </button>
                <button type="submit" className="btn btn-secondary my-2">
                  ثبت
                </button>
              </div>
            </form>
            </div>
            <div className="pt-3">
            <form onSubmit={subMenuformik.handleSubmit}>
            <Select
              tabIndex="1"
              name="parentId"
              id="parentId"
              labelcolor="text-info"
              value={subMenuformik.values.parentId}
              disabled={
                subMenuformik.values.subMenuName === undefined && isnewSubMenu === false
                  ? true
                  : false
              }
              label="عنوان گروه"
              options={menuData}
              onChange={subMenuformik.handleChange}
              // error={errors.model}
              optionlabel="Name"
              optionvalue="id"
              placeholder="انتخاب ..."
            />
              
              <Input
                id="subMenuName"
                tabIndex="1"
                maxLength={40}
                name="subMenuName"
                type="text"
                labelClass = "mt-4"
                readOnly={
                  subMenuformik.values.subMenuName === undefined && isnewSubMenu === false
                    ? true
                    : false
                }
                labelcolor="text-info"
                onChange={subMenuformik.handleChange}
                label="عنوان زیر گروه"
                value={subMenuformik.values.subMenuName}
                effect={false}
              />
              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-secondary my-2"
                  onClick={newSubMenuBtnClick}
                >
                  جدید
                </button>
                <button type="submit" className="btn btn-secondary my-2">
                  ثبت
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Crud;
