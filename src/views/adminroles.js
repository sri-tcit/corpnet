import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import { NavLink } from 'react-router-dom';
class adminroles extends Component {
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
        return (
            <>
                    <div className="row">
                        <div className="card dashboard-progress" style={{ width : '100%' }}>
                            <div className="card-body">
                            <div className="row">
            <div className="col-md-10">
            <h1>Manage Roles</h1>
            </div>
            <div className="col-md-2">
            <NavLink to="/app/adminmenus">
                                             <h4>Back to Home</h4>      </NavLink>
            </div>
          </div></div></div></div>
            </>
        );
    };
}
adminroles.propTypes = {}
export default adminroles;