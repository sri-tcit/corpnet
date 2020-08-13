import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';

// var Link = Router.Link;
// const backUrl = '/some/other/value';
const Footer = () => {
  return (
    <footer className="page-footer">
        <div className="footer-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="mb-0 text-muted">Copyright © 2020 Mashreq. All Rights Reserved.</p>
                    </div>
                    <div className="col-sm-6 d-none d-sm-block ">
                        <ul className="breadcrumb footer  pt-0 pr-0 float-right">
                            <li className="breadcrumb-item mb-0">
                                <a href="http://mashreq.com" target="_self" className="btn-link">Mashreq Intranet</a>
                            </li>
                            <li className="breadcrumb-item mb-0">
                            
                            <Link className="btn-link" target="_self"
                                      to={{
                                          pathname: "/app/generic/1",
                                          state: {
                                              id: "1"

                                          }
                                      }}>
                                      Disclaimer
                            </Link>
                            </li>
                            <li className="breadcrumb-item mb-0">
                               
                            <Link className="btn-link" target="_self"
                                      to={{
                                          pathname: "/app/generic/2",
                                          state: {
                                              id: "2"

                                          }
                                      }}>
                                      Terms of Use
                            </Link> 
                            </li>
                            <li className="breadcrumb-item mb-0">
                               
                            <Link className="btn-link"  target="_self"
                                      to={{
                                          pathname: "/app/generic/3",
                                          state: {
                                              id: "3"

                                          }
                                      }}>
                                      Privacy Policy
                            </Link>
                            </li>
                            </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
