import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import { Link,NavLink } from 'react-router-dom';
import Parser from 'html-react-parser'; 
class admincontent extends Component {
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

                            <div className="card-body" >
                            
                            <div className="row">
            <div className="col-md-10">
            <h1>Manage Content</h1>
            </div>
            <div className="col-md-2">

            <NavLink to="/app/adminmenus">
                                             <h4>Back to Home</h4>      </NavLink>
            </div>

          </div>
            
            </div></div>
</div>
            </>
        );
    };
}
admincontent.propTypes = {}
export default admincontent;