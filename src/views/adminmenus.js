import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import { NavLink } from 'react-router-dom';
import {Baseurl} from '../constants/defaultValues';
class adminmenus extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
      baseurl:api,
      result: []
        }
       
    }
    
    componentWillMount() {
        
    }
    componentDidMount() {
        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");
        if (role == "Super Admin" || role == "Admin")
        {}
        else{
        window.location.assign(Baseurl+'/app/home');
        }
        
    }
    loadData(prop) {
        let _result = [];
        
        var link = this.state.baseurl + `Generic/page/` + prop;
        
        axios.get(link)
            .then(res => {
                if (res.data) {
                    
                    res.data.map((data) => {
                        _result.push(data)
                        this.setState({ result: _result });
                        
                       
                    })
                }
            })
    }
    componentDidUpdate(prevProps) {
        
        
        
    }
    render() {
        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");
        return (
            <>
                    <div className="row">
                        <div className="card dashboard-progress"  style={{ width : '100%' }}>
                            <div className="card-body">
                            <h2 className="title_cn" style={{ marginBottom : '30px' }}>Admin Panel </h2>
                            
                            <div className="row sortable extra_links">
                                <div className="col-xl-12 col-lg-12 mb-4">
                                    <div className="table-caption">
                                        <div className="row admin_icon_fix">
                                        {
            ( role == "Super Admin") &&
                                            <div className="col-lg-6 col-12 mb-4">
                                                <NavLink to="/app/menuselection">
                                                    <div className="card">
                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon simple-icon-list"></div>
                                                            <h6 className="mb-0 pl-3">Manage Navigation</h6>
                                                        </div>
                                                    </div></NavLink>
                                            </div>}
                                            {
            ( role == "Admin" || role == "Super Admin") &&
                                            <div className="col-lg-6 col-12 mb-4">
                                                <NavLink to="/app/categoryAdmin">
                                                    <div className="card">
                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon iconsminds-folder-cloud"></div>
                                                            <h6 className="mb-0 pl-3">Manage Files</h6>
                                                        </div>
                                                    </div></NavLink>
                                            </div>}
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row sortable extra_links">
                                <div className="col-xl-12 col-lg-12 mb-4">
                                <div className="table-caption">
                                        <div className="row admin_icon_fix">
                                        {
            ( role == "Super Admin") &&
                                        <div className="col-lg-6 col-12 mb-4">
                                                <NavLink to="/app/admincontent">
                                                    <div className="card">
                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon iconsminds-file-edit"></div>
                                                            <h6 className="mb-0 pl-3">Manage Content</h6>
                                                        </div>
                                                    </div></NavLink>
                                            </div>}
                                            {
            ( role == "Super Admin") &&
                                            <div className="col-lg-6 col-12 mb-4">
                                                <NavLink to="/app/adminusers">
                                                    <div className="card">
                                                        <div className="card-body d-flex  align-items-center">
                                                            <div className="glyph-icon simple-icon-people"></div>
                                                            <h6 className="mb-0 pl-3">Manage Admin Users</h6>
                                                        </div>
                                                    </div></NavLink>
                                            </div>}
                                           
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