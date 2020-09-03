
import React, { Component } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Parser from 'html-react-parser'; 
import { Link,NavLink } from 'react-router-dom';
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap-tabs';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from '../views/Shared/baseurl-api';import Carousel from 'react-bootstrap/Carousel';
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

class home extends Component {

  constructor(props) {
    super(props);
    // const [modalLong, setModalLong] = useState(false);

    this.state = {
      menus: [],
      recentlinks: [],
      baseurl:api,
      content: []
    }

  }
  componentWillMount() {
    //console.log('mount', this.state.menus.length)
  }
  componentDidMount() {
    let _menus = [];
    let _content = [];
    let _recent = [];

    var link = this.state.baseurl + `Menu/CN`;
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
         
      var link = this.state.baseurl + `Generic/GetRecentLinks?username=hakkimb`;
    axios.get(link)
      .then(res => {
        if (res.data) {
          //console.log('result')
          res.data.map((data) => {
            _recent.push(data)
            this.setState({ recentlinks: _recent });
          })
        }
      })       
      var contentLink = this.state.baseurl + `Generic/page/0`;
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
          <div className="card-body">
          <div className="card h-400">
          <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/assets/img/banner-4.png"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/assets/img/banner-3.png"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/assets/img/banner-1.png"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div> </div></div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-400">
              <div className="card-body">

              {this.state.content?.length > 0 && this.state.content.map((data, index) =>
              data.id==5  &&
              
              <div className="img_sec">
              
              
                  <img src="/assets/img/contact-banner.png" />
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
                            </Link>
                            <br/>    <NavLink to="/app/generic/5">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></NavLink>
                 
                </div>
                }
                  </p>
               
              
              
              </div>
              )}
              <div className="cta-contact"><NavLink to="">i help</NavLink> <span></span>
                    <NavLink to="" className="invert_style">+9714 45454545</NavLink>
                  </div>
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
                  <span className="welcome_content">
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
                              </Link>
                              <br/>    <NavLink to="/app/generic/4">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></NavLink>
                   
                  </div>
               }
                    </span>
                    </div>
                
                
               )} 
               <div className="block-section">
                    <div className="row">
                      {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>

                        <div className="col-lg-6">
                          <div className="inner-block">
                            {data.ShowContNav &&

                              <NavLink to={data.url} className="box_sec">
                                <div className={"glyph-icon " + data.Thumbnail + " icons_new  "}></div>
                                <div className="p_content">

                                  <p className="font-weight-medium mb-0 ">{data.DirName}</p>
                                  <p className="text-muted mb-0 text-small">{data.DirDescription}</p>

                                </div>
                              </NavLink>
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
                      <span>
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
                            </Link>
                            <NavLink to="/app/generic/6">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></NavLink>

                          </div>
                        }
                      </span> 
                  </div>
              )}
                </div>

              <div className="card h-195">
                {/* <div className="card-header pl-0 pr-0">
                <ul className="nav nav-tabs card-header-tabs  ml-0 mr-0" role="tablist">
                  <li className="nav-item w-50 text-center">
                    <a className="nav-link active" id="first-tab_" data-toggle="tab" href="#firstFull" role="tab" aria-controls="first" aria-selected="true">Quick Links</NavLink>
                  </li>
                  <li className="nav-item w-50 text-center">
                    <a className="nav-link" id="second-tab_" data-toggle="tab" href="#secondFull" role="tab" aria-controls="second" aria-selected="false">Recent Links</NavLink>
                  </li>
                </ul>
              </div> */}

                  <Tabs headerStyle={{  }}   onSelect={(index, label) => console.log(`Selected Index: ${index}, Label: ${label}`)} selected={0}>
                    <Tab label="Quick Links">
                      
                      <div className="card-body">

                        <div className="tab-content">

                          {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>

                            <NavLink to={data.url}>

                              {data.ShowQuickLink &&
                                <div className="links_with_icon">
                                  <i className="glyph-icon iconsminds-link-2"></i><span>{data.DirName}</span>
                                </div>
                              }
                            </NavLink>
                          )}
                        </div>

                      </div>

                    </Tab>
                    <Tab label="Recent Links">

                      <div className="card-body">

                        <div className="tab-content">
                          {/* {this.state.menus?.length > 0 && this.state.menus.map((data, index) => */}
{this.state.recentlinks?.length > 0 && this.state.recentlinks.map((data, index) =>

                            <NavLink to={data.DocPath}>

                                <div className="links_with_icon">
                                  <i className="glyph-icon iconsminds-link-2"></i><span>{data.DocName}</span>
                                </div>
                              
                            </NavLink>
                          )}
                        </div>
                      </div>

                    </Tab>
                  </Tabs>
              </div>
            </div>

          </div>
       

        <div className="row sortable extra_links">
          {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>
            Math.ceil(this.state.menus.length / 2) &&
            <div className="col-xl-3 col-lg-6 mb-4">

              <NavLink to={data.url}>
                <div className="card">
                  {data.ShowBottomNav &&

                    <div className="card-body d-flex  align-items-center">
                      <div className={"glyph-icon " + data.Thumbnail + " ft_20  "}></div>
                      <h6 className="mb-0 pl-3">{data.DirName}</h6>

                    </div>
                  }
                </div>
              </NavLink>
            </div>
          )}

          {/* <div className="col-xl-3 col-lg-6 mb-4">
            <NavLink to="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-book-open ft_20"></div>
                  <h6 className="mb-0 pl-3">User Information</h6>

                </div>
              </div></NavLink>
          </div>
          <div className="col-xl-3 col-lg-6 mb-4">
            <NavLink to="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-notebook ft_20"></div>
                  <h6 className="mb-0 pl-3">Policies</h6>

                </div>
              </div></NavLink>
          </div>
          <div className="col-xl-3 col-lg-6 mb-4">
            <NavLink to="">
              <div className="card">

                <div className="card-body d-flex  align-items-center">
                  <div className="glyph-icon simple-icon-docs ft_20"></div>
                  <h6 className="mb-0 pl-3">User Manual</h6>

                </div>
              </div></NavLink>
          </div> */}
        </div>

      </>
    );

  };
}

home.propTypes = {}
export default home;