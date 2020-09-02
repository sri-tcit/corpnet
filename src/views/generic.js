import axios from 'axios';
import React, { Component } from "react";
import { api } from '../views/Shared/baseurl-api';
import Parser from 'html-react-parser'; 
class generic extends Component {
    constructor(props) {
        super(props);
        //console.log("generic", this.props)
        this.state = {
      baseurl:api,
      result: []
        }
        this.loadData = this.loadData.bind(this)

    }

    componentWillMount() {
        //console.log('mount', this.state.result[0])
    }
    componentDidMount() {
        console.log('prop', this.props.location.pathname)
        let id=this.props.location.pathname;

        id = id.split("/");
        id = id[id.length - 1];
        this.loadData(id);
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
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.loadData(this.props.location.state.id);
        }
    }
    render() {

        return (
            <>
                {this.state.result?.length > 0 && this.state.result.map((data) =>
                    <div className="row">
                        <div className="card dashboard-progress">

                            <div className="card-body">
                                <h2 className="title_cn">{data.maintitle}</h2>
                                <p className="welcome_content">{Parser(data.pagecontent)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };
}
generic.propTypes = {}
export default generic;