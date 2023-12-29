import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
let rootElement = null;

const MainLoader = ({showMainLoader}) => {
  
  return (<div className="mainLoader mainLoader-overlay">
      <div className="mainLoader-cont">
          <div id="circleG-dark">
              <div id="circleG-dark_1" className="circleG-dark"></div>
              <div id="circleG-dark_2" className="circleG-dark"></div>
              <div id="circleG-dark_3" className="circleG-dark"></div>
          </div>
      </div>
    </div>
  );
};


export default (ele, props) => {
  if (ele !== undefined && ele !== null) {
    if (rootElement === null) {
      rootElement = createRoot(ele);
    }
    rootElement.render(
      props?.showMainLoader && <MainLoader/>
    );
  }
};
