import React, { Component } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Parser from 'html-react-parser'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import IntlMessages from '../helpers/IntlMessages';

class category extends Component {

  constructor(props) {
    super(props);
    // const [modalLong, setModalLong] = useState(false);

    this.state = {
      menus: [],
      content: []
    }

  }
  componentWillMount() {
    //console.log('mount', this.state.menus.length)
  }
  componentDidMount() {
    let _menus = [];
    let _content = [];

    var link = `http://148.72.206.209:93/api/Menu/CN`;
    axios.get(link)
      .then(res => {
        if (res.data) {
          //console.log('result')
          res.data.map((data) => {
            _menus.push(data)
            this.setState({ menus: _menus });
          })
        }
      })        
      var contentLink = `http://148.72.206.209:93/api/Generic/page/0`;
      console.log('result',contentLink)

      axios.get(contentLink)
        .then(res => {
          console.log('result',res)
          if (res.data) {
            
            res.data.map((data) => {
              _content.push(data)
              this.setState({ content: _content });
            })
          }
        })
  }
  render() {
    return (
      <>
        <div className="row">
          {/* <div className="col-12">  <h1 className="main_head">CorpNet</h1>
            <div className="separator mb-5"></div>
          </div> */}


          <div className="col-xl-8 col-lg-12 mb-4">


            <div className="banner-outer">

              {/* <div className="cta">
                <a href="">Click here</a>

              </div> */}
            </div>
       </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-400">
              <div className="card-body">

              {this.state.content?.length > 0 && this.state.content.map((data, index) =>
              data.id==5  &&
              
              <div className="img_sec">
              
              
                  <img src="/assets/img/landing-page/applications/contact-banner.png" />
                  <h3>{data.maintitle}</h3>
                  <p>{data.pagecontent.length > 0 &&
                  Parser(data.pagecontent.slice(0,400)) }
                  {data.pagecontent.length > 400 && 
               <div className="learn_more">
                     
                     <Link className="btn-link"  target="_self"
                                      to={{
                                          pathname: "/app/generic/5",
                                          state: {
                                              id: "5"

                                          }
                                      }}>
                                   <br/>    <a href="">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></a>
                            </Link>
                 
                </div>
                }
                  </p>
               
              
              
              </div>
              )}
              <div className="cta-contact"><a href="">i help</a> <span></span>
                    <a href="" className="invert_style">+9714 45454545</a>
                  </div>
              </div>
              
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-sm-12 mb-4">
              <div className="card dashboard-progress">
              
                <div className="card-body">
              {this.state.content?.length > 0 && this.state.content.map((data, index) =>
             data.id==4  &&
              
              <div>
              <h2 className="title_cn">{data.maintitle}</h2>
                  <p className="welcome_content">
                  {data.pagecontent.length > 0 &&
                    Parser(data.pagecontent.slice(0,450)) }
                    {data.pagecontent.length > 400 && 
                 <div className="learn_more">
                       
                       <Link className="btn-link"  target="_self"
                                        to={{
                                            pathname: "/app/generic/4",
                                            state: {
                                                id: "4"
  
                                            }
                                        }}>
                                     <br/>    <a href="">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></a>
                              </Link>
                   
                  </div>
               }
                    </p>
                    </div>
                
                
               )} 
               <div className="block-section">
                    <div className="row">
                      {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>

                        <div className="col-lg-6">
                          <div className="inner-block">
                            {data.ShowContNav &&

                              <a href={data.url} className="box_sec">
                                <div className={"glyph-icon " + data.Thumbnail + " icons_new  "}></div>
                                <div className="p_content">

                                  <p className="font-weight-medium mb-0 ">{data.DirName}</p>
                                  <p className="text-muted mb-0 text-small">{data.DirDescription}</p>

                                </div>
                              </a>
                            }
                          </div>

                        </div>

                      )}

                    </div>

                  </div>
                  </div>
                </div>
                
              </div>
            
            
            <div className="col-md-6 col-lg-4 col-12 mb-4 h-400">
            <div className="imp_block">

              {this.state.content?.length > 0 && this.state.content.map((data, index) =>
               data.id==6  &&
              
                    <div>
                      <h3>{data.maintitle}</h3>
                      <p>
                        {data.pagecontent.length > 0 &&
                          Parser(data.pagecontent.slice(0, 80))}
                        {data.pagecontent.length >100 &&
                          <div className="learn_more">

                            <Link className="btn-link" target="_self"
                              to={{
                                pathname: "/app/generic/6",
                                state: {
                                  id: "6"

                                }
                              }}>
                              <a href="">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></a>
                            </Link>

                          </div>
                        }
                      </p> 
                  </div>
              )}
                </div>

              <div className="card h-195">
                {/* <div className="card-header pl-0 pr-0">
                <ul className="nav nav-tabs card-header-tabs  ml-0 mr-0" role="tablist">
                  <li className="nav-item w-50 text-center">
                    <a className="nav-link active" id="first-tab_" data-toggle="tab" href="#firstFull" role="tab" aria-controls="first" aria-selected="true">Quick Links</a>
                  </li>
                  <li className="nav-item w-50 text-center">
                    <a className="nav-link" id="second-tab_" data-toggle="tab" href="#secondFull" role="tab" aria-controls="second" aria-selected="false">Recent Links</a>
                  </li>
                </ul>
              </div> */}

                  <Tabs headerStyle={{  }}   onSelect={(index, label) => console.log(`Selected Index: ${index}, Label: ${label}`)} selected={0}>
                    <Tab label="Quick Links">
                      
                      <div className="card-body">

                        <div className="tab-content">

                          {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>

                            <a href={data.url}>

                              {data.ShowQuickLink &&
                                <div className="links_with_icon">
                                  <i className="glyph-icon iconsminds-link-2"></i><span>{data.DirName}</span>
                                </div>
                              }
                            </a>
                          )}
                        </div>

                      </div>

                    </Tab>
                    <Tab label="Recent Links">

                      <div className="card-body">

                        <div className="tab-content">
                          {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>

                            <a href={data.url}>
                              {data.ShowQuickLink &&

                                <div className="links_with_icon">
                                  <i className="glyph-icon iconsminds-link-2"></i><span>{data.DirName}</span>
                                </div>
                              }
                            </a>
                          )}
                        </div>
                      </div>

                    </Tab>
                  </Tabs>
              </div>
            </div>

          </div>
        </div>

        <div className="row sortable extra_links">
          {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>
            Math.ceil(this.state.menus.length / 2) &&
            <div className="col-xl-3 col-lg-6 mb-4">

              <a href={data.url}>
                <div className="card">
                  {data.ShowBottomNav &&

                    <div className="card-body d-flex  align-items-center">
                      <div className={"glyph-icon " + data.Thumbnail + " ft_20  "}></div>
                      <h6 className="mb-0 pl-3">{data.DirName}</h6>

                    </div>
                  }
                </div>
              </a>
            </div>
          )}

          {/* <div className="col-xl-3 col-lg-6 mb-4">
            <a href="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-book-open ft_20"></div>
                  <h6 className="mb-0 pl-3">User Information</h6>

                </div>
              </div></a>
          </div>
          <div className="col-xl-3 col-lg-6 mb-4">
            <a href="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-notebook ft_20"></div>
                  <h6 className="mb-0 pl-3">Policies</h6>

                </div>
              </div></a>
          </div>
          <div className="col-xl-3 col-lg-6 mb-4">
            <a href="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-docs ft_20"></div>
                  <h6 className="mb-0 pl-3">User Manual</h6>

                </div>
              </div></a>
          </div> */}
        </div>

      </>
    );

  };
}

category.propTypes = {}
export default category;