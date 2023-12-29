import React, { useEffect, useState } from "react";

import {
	getLocalStorage,
} from "../../../utils/functions/storage";
import { popUpModalConstant } from "../../../utils/constants/common";

const PopUpModal = ({ onClosePopup, url }) => {
const [genericDataSetUp,setGenericDataSetUp] = useState({})
   const getGenericData = () => {
		const genericData =  JSON.parse(localStorage.getItem("generic_data_container_app"))["mainGenericDataList"]; //Get generic data for container app
    genericData && genericData?.items.map((items)=>{
      if (items.hasOwnProperty('genericData') ){
        items?.genericData.map((item)=>{
          if (item['popupId']===popUpModalConstant.POPID ){
            setGenericDataSetUp(item)
          }
        })
      }

    })
    }

    useEffect(() => {
      try{ getGenericData()}
      catch (error) {
        console.log("---useEffect call", error)
    }
      
    }, []); 

  return (
    <div className="overlay">
      <div className="overlay__final">
        <button className="skyplus6e-header__hamburger-close-menu-button close-icon" aria-label="Close hamburger menu" onClick={onClosePopup}>
          <i className="icon-cross"></i>
        </button>
        <div className="overlay__disclaimer">{genericDataSetUp?.highlightLabel || popUpModalConstant.HIGHLIGHTLABEL}</div>
        <div className="overlay__notice">{genericDataSetUp?.heading || popUpModalConstant.HEADING}</div>
       
        { genericDataSetUp?.description?.html ? <p className="content" dangerouslySetInnerHTML={{__html: genericDataSetUp?.description?.html}} />:
        <p className="overlay__content">  {popUpModalConstant.DESC}
        </p>}
        <div className="btn-wrapper">
          <button className="btn-dir" onClick={() => {
            onClosePopup();
          }}>{genericDataSetUp?.ctaLabel ||popUpModalConstant.CTALABEL}</button>
          <a href={url} target="_blank" onClick={onClosePopup} className="btn-dir"><button className="stay-here">{genericDataSetUp?.secondaryCtaLabel || popUpModalConstant.SECCTALABEL}</button></a>

        </div>
      </div>
    </div>
  );
};



export default PopUpModal;
