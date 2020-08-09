import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';

const Footer = () => {
  return (
    // <footer className="page-footer">
    //   <div className="footer-content">
    //     <div className="container-fluid">
    //       <Row>
    //         <Colxx xxs="12" sm="6">
    //           <p className="mb-0 text-muted">ColoredStrategies 2020</p>
    //         </Colxx>
    //         <Colxx className="col-sm-6 d-none d-sm-block">
    //           <ul className="breadcrumb pt-0 pr-0 float-right">
    //             <li className="breadcrumb-item mb-0">
    //               <NavLink className="btn-link" to="#" location={{}}>
    //                 Review
    //               </NavLink>
    //             </li>
    //             <li className="breadcrumb-item mb-0">
    //               <NavLink className="btn-link" to="#" location={{}}>
    //                 Purchase
    //               </NavLink>
    //             </li>
    //             <li className="breadcrumb-item mb-0">
    //               <NavLink className="btn-link" to="#" location={{}}>
    //                 Docs
    //               </NavLink>
    //             </li>
    //           </ul>
    //         </Colxx>
    //       </Row>
    //     </div>
    //   </div>
    // </footer>

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
                                <a href="#" className="btn-link">Mashreq Intranet</a>
                            </li>
                            <li className="breadcrumb-item mb-0">
                                <a href="#" className="btn-link">Disclaimer</a>
                            </li>
                            <li className="breadcrumb-item mb-0">
                                <a href="#" className="btn-link">Terms of Use</a>
                            </li>
                            <li className="breadcrumb-item mb-0">
                                <a href="#" className="btn-link">Privacy Policy</a>
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
