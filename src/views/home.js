
import React, { Component } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Parser from 'html-react-parser';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import { api,mediaPath } from '../views/Shared/baseurl-api';
import Carousel from 'react-bootstrap/Carousel';
import {Baseurl} from '../constants/defaultValues';
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      recentlinks: [],
      baseurl: api,
      base: Baseurl,
      content: []
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    let _menus = [];
    let _content = [];
    let _recent = [];
    var link = this.state.baseurl + `Menu/CN`;
    axios.get(link)
      .then(res => {
        if (res.data) {
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
          res.data.map((data) => {
            _recent.push(data)
            this.setState({ recentlinks: _recent });
          })
        }
      })
    var contentLink = this.state.baseurl + `Generic/page/0`;
    console.log('result', contentLink)
    axios.get(contentLink)
      .then(res => {
        console.log('result', res)
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
          <div className="col-xl-8 col-lg-12 mb-4">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={this.state.base+"/assets/img/banner-4.png"}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 banner-colored-blue"
                  src={this.state.base+"/assets/img/banner-3.png"}
                  alt="Third slide"
                />
                <Carousel.Caption className="color-blue">
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src= {this.state.base+"/assets/img/banner-1.png"}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-400">
              <div className="card-body">
                {this.state.content?.length > 0 && this.state.content.map((data) =>
                  data.id === 5 &&
                  <div key={data.id} className="img_sec">
                    <img src={this.state.base+"/assets/img/contact-banner.png"}></img>
                    <h3>{data.maintitle}</h3>
                    <span>{data.pagecontent.length > 0 &&
                      Parser(data.pagecontent.slice(0, 400))}
                      {data.pagecontent.length > 400 &&
                        <div className="learn_more">
                          <Link className="btn-link" target="_self"
                            to={{
                              pathname: "/app/generic/5",
                              state: {
                                id: "5"
                              }
                            }}>
                          </Link>
                          <br />    <NavLink to="/app/generic/5">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></NavLink>
                        </div>
                      }
                    </span>
                  </div>
                )}
                <div className="cta-contact"><NavLink to="http://ihelp/">i help</NavLink> <span></span>
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
                  data.id === 4 &&
                  <div key={data.id} >
                    <h2 className="title_cn">{data.maintitle}</h2>
                    <span className="welcome_content">
                      {data.pagecontent.length > 0 &&
                        Parser(data.pagecontent.slice(0, 450))}
                      {data.pagecontent.length > 400 &&
                        <div className="learn_more">
                          <Link className="btn-link" target="_self"
                            to={{
                              pathname: "/app/generic/4",
                              state: {
                                id: "4"
                              }
                            }}>
                          </Link>
                          <br />    <NavLink to="/app/generic/4">Learn more <i className="glyph-icon iconsminds-arrow-right-2"></i></NavLink>
                        </div>
                      }
                    </span>
                  </div>
                )}
                <div className="block-section">
                  <div className="row">
                    {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>
                      <div key={data.id} className="col-lg-6">
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
                data.id === 6 &&
                <div key={data.id} >
                  <h3>{data.maintitle}</h3>
                  <span>
                    {data.pagecontent.length > 0 &&
                      Parser(data.pagecontent.slice(0, 80))}
                    {data.pagecontent.length > 100 &&
                      <div key={data.id} className="learn_more">
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
                <Tabs headerStyle={{}} onSelect={(index, label) => console.log(`Selected Index: ${index}, Label: ${label}`)} selected={0}>
                  <Tab label="Quick Links">
              <div className="card-body">
                       
              <PerfectScrollbar
                options={{ suppressScrollX: true, wheelPropagation: false }}
              >    <div className="tab-content">
                        {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>
                          <NavLink key={data.id}  to={data.url}>
                            {data.ShowQuickLink &&
                              <div key={data.id}  className="links_with_icon row col-lg-12">
                                <i className="glyph-icon iconsminds-link-2 col-lg-2"></i><span  className="col-lg-10">{data.DirName}</span>
                              </div>
                            }
                          </NavLink>
                        )}
                      </div></PerfectScrollbar> 
                    </div>
                  </Tab>
                  <Tab label="Recent Links">
                  
                  <div className="card-body" >
                  <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}>   
                      <div className="tab-content">
                      {this.state.recentlinks?.length > 0 && this.state.recentlinks.map((data, index) =>
                      
                        <a key={data.id}  target="_blank" href={mediaPath+data.DocPath}>
                <div key={data.id} className="links_with_icon row col-lg-12">
                              <i className="glyph-icon iconsminds-link-2 col-lg-2"></i><span  className="col-lg-10">{data.DocName}</span>
                            </div>
                            </a>
                        )}
                      </div>
              </PerfectScrollbar>
                    </div>
                  </Tab>
                </Tabs>
            </div>
          </div>
        </div>
        <div className="row sortable extra_links">
          {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>
            Math.ceil(this.state.menus.length / 2) &&
            <div key={data.id}  className="col-xl-3 col-lg-6 mb-4">
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
        </div>
      </>
    );
  };
}
home.propTypes = {}
export default home;