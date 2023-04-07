import { useContext,useEffect,useState } from "react";
import { Context } from "./context";
import { getapis,getFile } from "../Services/apisService";
import { search_Allitems_in_Allobjects_Ofarray } from './../lib/utility';
import "./content.css";


const Content = () => {
  const {selectedSubMenu,toggledMenu} = useContext(Context);
  const [apis, setApis] = useState([]);
  const [selectedAPIs, setSelectedAPIs] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      const {data}= await getapis();
      setApis(data);
      setSelectedAPIs(data);
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    const retval=apis.filter(item=> item.parentId===selectedSubMenu.id||selectedSubMenu.id===0);
    setSelectedAPIs(retval);
  }, [selectedSubMenu]);
  
  const search=()=>{
   const retval=search_Allitems_in_Allobjects_Ofarray(apis, searchInput);
    setSelectedAPIs(retval);
  }

  const setInput = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    //<div  >select menu {selectedContet.menu}</div>
    <section id="services" className="container py-2 ">
      <div className={`row mb-md-4 mb-2 pb-2 ${toggledMenu?" deactive":""}`} id="searchDiv">
      <div className="mb-1 col-md-4  ">
            <div className=" position-relative  ">
              <input className="form-control" id="choices-text-preset-values" type="text" value={searchInput} onChange={setInput} placeholder="جستجو API ... " />
              <button className="btn-search" type="button"  onClick={search}>
                <svg  width="24" height="24" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </button>
            </div>
          </div>
          </div>
      <div className="row pb-2">    
      {selectedAPIs && selectedAPIs.map((item, i) => (
          
        <div className="col-lg-4  col-md-6 mb-4 contenItem " key={item.id}>
          <div className="shadow-lg  text-center rounded border-bottom border-4 ">
           
            <h4 className="fw-normal fs-6">{item.title}</h4>
            
            <p className="overflow-auto  pt-3 px-2 border-top text-justify text-right text-justify lh-2">
              نــوع:{item.type}<br></br><br></br>
              {item.desc}
            </p>
            <div className={`accordion position-relative ${toggledMenu?" deactive":""}`} id={`accordionApi`}>
              <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${item.id}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${item.id}`}
                  >
                    اطلاعات بیشتر
                  </button>
                </h2>
                <div
                  id={`collapse${item.id}`}
                  className="accordion-collapse collapse position-relative "
                  aria-labelledby={`heading${item.id}`}
                  data-bs-parent={`#accordionApi`}
                >
                  <div className="accordion-body">
                    <i style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "green",
                     
                    }}
                      aria-hidden="true" onClick={() => getFile(item.url)}>دانلود فایل تست </i>
                    
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>))}
      </div>
    </section>
 
  );
};

export default Content;
