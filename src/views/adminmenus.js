import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import { Link,NavLink } from 'react-router-dom';
import Parser from 'html-react-parser'; 
class adminmenus extends Component {
    constructor(props) {
        super(props);
        //console.log("generic", this.props)
        this.state = {
      baseurl:api,
      result: []
        }
        // this.loadData = this.loadData.bind(this)

    }

    componentWillMount() {
        //console.log('mount', this.state.result[0])
    }
    componentDidMount() {
        //console.log('prop', this.props.location.state.id)
        // this.loadData(this.props.location.state.id);
    }
    loadData(prop) {
        let _result = [];
        //console.log('loadData', prop, this.props.location.state.id)
        var link = this.state.baseurl + `Generic/page/` + prop;
        //console.log('link', link)
        axios.get(link)
            .then(res => {
                if (res.data) {
                    //console.log('result', res.data)
                    res.data.map((data) => {
                        _result.push(data)
                        this.setState({ result: _result });
                        //console.log('result', this.state.result[0], _result)

                    })
                }
            })
    }
    componentDidUpdate(prevProps) {
        // if (this.props.location.pathname !== prevProps.location.pathname) {
        //     this.loadData(this.props.location.state.id);
        // }
    }
    render() {

        return (
            <>
                    <div className="row">
                        <div className="card dashboard-progress"  style={{ width : '100%' }}>

                            <div className="card-body">
                            <h2 className="title_cn" style={{ marginBottom : '30px' }}>Admin Panel </h2>
                            
{/* 
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
          )} */}

                            <div className="row sortable extra_links">

                                <div className="col-xl-12 col-lg-12 mb-4">

                                    <div className="table-caption">
                                        <div className="row admin_icon_fix">
                                            <div className="col-lg-4 col-12 mb-4">
                                                <NavLink to="/app/menuselection">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon simple-icon-list"></div>
                                                            <h6 className="mb-0 pl-3">Manage Navigation</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div>
                                            <div className="col-lg-4 col-12 mb-4">
                                                <NavLink to="/app/categoryAdmin">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon iconsminds-folder-cloud"></div>
                                                            <h6 className="mb-0 pl-3">Manage Files</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div>
                                            <div className="col-lg-4 col-12 mb-4">
                                                <NavLink to="">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon iconsminds-folder-cloud"></div>
                                                            <h6 className="mb-0 pl-3">Lorem ipsum</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div>
                                            {/* <div className="col-lg-6 col-12 mb-4">
                                                <NavLink to="/app/menuselection">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon iconsminds-folder-cloud ft_20"></div>
                                                            <h6 className="mb-0 pl-3">Manage Files</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row sortable extra_links">
                                <div className="col-xl-12 col-lg-12 mb-4">
                                <div className="table-caption">
                                        <div className="row admin_icon_fix">
                                        <div className="col-lg-4 col-12 mb-4">
                                                <NavLink to="/app/admincontent">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon iconsminds-file-edit"></div>
                                                            <h6 className="mb-0 pl-3">Manage Content</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div>
                                            <div className="col-lg-4 col-12 mb-4">
                                                <NavLink to="/app/adminusers">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon simple-icon-people"></div>
                                                            <h6 className="mb-0 pl-3">Manage Admin Users</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div>
                                            <div className="col-lg-4 col-12 mb-4">
                                                <NavLink to="">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon simple-icon-people"></div>
                                                            <h6 className="mb-0 pl-3">Lorem ipsum</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div>
                                           
                                            {/* <div className="col-lg-6 col-12 mb-4">
                                                <NavLink to="/app/menuselection">
                                                    <div className="card">

                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon iconsminds-folder-cloud ft_20"></div>
                                                            <h6 className="mb-0 pl-3">Manage Files</h6>

                                                        </div>
                                                    </div></NavLink>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        
                        </div>
                    </div></div>
            </>
        );
    };
}
adminmenus.propTypes = {}
export default adminmenus;