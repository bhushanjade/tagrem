import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';


const Layout = ({component: Component, ...rest}) => {
  return (
      <Route {...rest} render={matchProps => (
          <div className="defaultLayout">
            <Header {...rest} /> {/*//header*/}

            <div className="content-wrapper">
              <div className="container-fluid ">
                <Component {...matchProps} />
              </div>
            </div>
            <div className="Footer"> {/*//Footer*/}
                <Footer/>
            </div>
          </div>
      )} />
  );
};

export default Layout;