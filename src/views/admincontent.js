import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import {  NavLink } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import {
    Button,
    Input,
} from 'reactstrap';
import Select from 'react-select';
class admincontent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            baseurl: api,
            submittet: false,
            result: [],
            listPages: [],
            SelectPage: null,
            selectPage: [],
            pageid: '',
            maintitle: '',
            subtitle: '',
            pagecontent: '',
            pageDetails: {
                pageid: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                maintitle: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                subtitle: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                pagecontent: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                selectPage: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            }
        }
        this.handletitleChange = this.handletitleChange.bind(this)
        this.handlecontentChange = this.handlecontentChange.bind(this)
        this.updateData = this.updateData.bind(this);
        this.getPages = this.getPages.bind(this);
        
        
    }
    handleChangeSelect(e) {
        
        this.setState(state => {
            
            var pageid = e.id;
            console.log('ddd', pageid)
            if (pageid) {
                this.setState({ pageid: pageid });
                
                var link = this.state.baseurl + `Generic/page/${pageid}`;
                axios.get(link)
                    .then(res => {
                        let data = res.data[0];
                        console.log('mountdata', data, res.data);
                        this.setState(prevState => {
                            let pageDetails = Object.assign({}, this.state.pageDetails)
                            for (let key of Object.keys(pageDetails)) {
                                console.log('key', data[key]);
                                pageDetails[key]._value = data[key];
                                this.state.pageDetails.selectPage._value = data.maintitle;
                            }
                            pageDetails['pageid']._value = pageid;
                            return { pageDetails };
                        })
                    });
            }
        })
    }
    onChange = (name, value) => {
        console.log('name', name, value)
        
    }
    handletitleChange(e) {
        
        
        let { name, value } = e.target;
        this.setState(prevState => {
            let pageDetails = Object.assign({}, this.state.pageDetails);
            pageDetails[name]._value = value;
            pageDetails[name].touched = true;
            return pageDetails;
        })
    }
    handlecontentChange(e) {
        
        
        
        this.setState(prevState => {
            let pageDetails = Object.assign({}, this.state.pageDetails);
            pageDetails['pagecontent']._value = e;
            pageDetails['pagecontent'].touched = true;
            return pageDetails;
        })
    }
    getPages() {
        var link = this.state.baseurl + `Generic/GetGenericPage/`;
        axios.get(link)
            .then(res => {
                console.log('getPages', res.data);
                if (res) {
                    
                    
                    
                    
                    for (let i in res.data) {
                        let data = res.data[i];
                        this.state.listPages.push({
                            "id": res.data[i].id,
                            "label": res.data[i].maintitle,
                            "key": i
                        })
                    }
                    
                    
                    
                }
            })
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        
        
        this.getPages();
    }
    handleValidations() {
        let error = false;
        let order = this.state.pageDetails;
        for (var i in order) {
            if (order[i].required && !order[i]._value) {
                console.log('error', order[i].required, !order[i]._value)
                error = true;
            }
            if (error)
                return error;
            
            
            
            
            
            
            
            
        }
        return error;
    }
    updateData() {
        this.setState({
            submittet: true
        })
        if (this.handleValidations())
            return;
            
        if (this.state.submittet) {
            let _result = [];
            
            
            
            var id = this.state.pageDetails.pageid._value
            
            let postdata = {
                
                
                "maintitle": this.state.pageDetails.maintitle._value,
                "subtitle": this.state.pageDetails.subtitle._value,
                "pagecontent": this.state.pageDetails.pagecontent._value,
                "createdBy": "Admin"
            }
            
            var link = this.state.baseurl + `Generic/Update/${id}`;
            console.log('link', postdata)
            
            axios.put(this.state.baseurl + `Generic/Update?id=${id}`, postdata)
                .then(res => {
                    
                    if (res.data) {
                        console.log(res.data);
                        this.props.action();
                        
                    }
                })
        }
    }
    componentDidUpdate(prevProps) {
        
        
        
    }
    render() {
        let optionItems = this.state.listPages
        
        
        
        
        const ReactQuill = require('react-quill'); 
        const { Quill, Mixin, Toolbar } = ReactQuill;
        const SelectPage = [];
        let selectData = this.state.listPages && this.state.listPages.map((data, index) => [
            { label: data.maintitle, value: data.id, key: index },
        ]);
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card dashboard-progress" style={{ width: '100%' }}>
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
                                {/* Content Stars here */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <Select 
                                                value={this.state.listPages.find(item => item.value === this.state.SelectPage)}
                                                
                                                onChange={this.handleChangeSelect.bind(this)}
                                                options={this.state.listPages}
                                                id="selectPage"
                                                name="selectPage"
                                                className="react-select"
                                                placeholder="Select a page"
                                                classNamePrefix="react-select"
                                            />
                                            {(this.state.submittet || this.state.pageDetails.selectPage.touched) && !this.state.pageDetails.selectPage._value && <span className="text-danger">{this.state.pageDetails.selectPage.errorMsg}</span>}
                                           
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                name="maintitle"
                                                id="maintitle"
                                                placeholder={"Page Title"}
                                                
                                                onChange={this.handletitleChange}
                                                value={this.state.pageDetails.maintitle._value}
                                            />
                                            {(this.state.submittet || this.state.pageDetails.maintitle.touched) && !this.state.pageDetails.maintitle._value && <span className="text-danger">{this.state.pageDetails.maintitle.errorMsg}</span>}
                                        </div>
                                        <div className="form-group">
                                            <Input
                                                name="subtitle"
                                                id="subtitle"
                                                placeholder={"Page Sub Title"}
                                                onChange={this.handletitleChange}
                                                value={this.state.pageDetails.subtitle._value}
                                            />
                                            {(this.state.submittet || this.state.pageDetails.subtitle.touched) && !this.state.pageDetails.subtitle._value && <span className="text-danger">{this.state.pageDetails.subtitle.errorMsg}</span>}
                                        </div>
                                        <div className="form-group">
                                            <ReactQuill theme="snow"
                                                name="pagecontent"
                                                
                                                id="pagecontent"
                                                placeholder={"Page Content Here"}
                                                onChange={this.handlecontentChange}
                                                value={this.state.pageDetails.pagecontent._value}
                                            />
                                            {(this.state.submittet || this.state.pageDetails.pagecontent.touched) && !this.state.pageDetails.pagecontent._value && <span className="text-danger">{this.state.pageDetails.pagecontent.errorMsg}</span>}
                                        </div>
                                        <div className="form-group">
                                            <Button value="Send"
                                                color="secondary"
                                                onClick={this.updateData}
                                            >
                                                Update
                        </Button>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                    </div>
                </div>
            </>
        );
    };
}
admincontent.propTypes = {}
export default admincontent;
