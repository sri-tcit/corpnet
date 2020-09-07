import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import {  NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

import {
    Button,
    Input,
    Label
} from 'reactstrap';
import Select from 'react-select';
import 'dropzone/dist/min/dropzone.min.css';
const ReactDOMServer = require('react-dom/server');
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
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handletitleChange = this.handletitleChange.bind(this);
        
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
        this.state.submittet = true;
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
                    
                    if (res.status != 200) {
                        this.setState(prev => {
                            let error = true;
                            let errorMsg = res.statusText;
                            let variant = 'danger';
                            return { errorMsg, error, variant };
                        })
                        toast.error(res.data, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        console.log('sucess2', res.data.status, res.data)
                       
                      //  window.location.assign('/app/admincontent');
                        this.setState((prev) => {
                            let errorMsg = res.statusText;
                            let error = true;
                            let variant = 'success'
                            return { error, errorMsg, variant };
                            console.log('sucess', res.data.status, res.data)
                        })
                        toast.success(res.data, {
                            position: toast.POSITION.TOP_RIGHT
                        });
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
        const dropzoneComponentConfig = {
            postUrl: 'https://httpbin.org/post',
        };
        const dropzoneConfig = {
            thumbnailHeight: 160,
            maxFilesize: 1,
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dz-preview dz-file-preview mb-3">
                    <div className="d-flex flex-row ">
                        <div className="p-0 w-30 position-relative">
                            <div className="dz-error-mark">
                                <span>
                                    <i />{' '}
                                </span>
                            </div>
                            <div className="dz-success-mark">
                                <span>
                                    <i />
                                </span>
                            </div>
                            <div className="preview-container">
                                <img data-dz-thumbnail className="img-thumbnail border-0" />
                                <i className="simple-icon-doc preview-icon" />
                            </div>
                        </div>
                        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                            <div>
                                {' '}
                                <span data-dz-name />{' '}
                            </div>
                            <div className="text-primary text-extra-small" data-dz-size />
                            <div className="dz-progress">
                                <span className="dz-upload" data-dz-uploadprogress />
                            </div>
                            <div className="dz-error-message">
                                <span data-dz-errormessage />
                            </div>
                        </div>
                    </div>
                    <a href="#/" className="remove" data-dz-remove>
                        {' '}
                        <i className="glyph-icon simple-icon-trash" />{' '}
                    </a>
                </div>
            ),
            headers: { 'My-Awesome-Header': 'header value' },
        };
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
                                    <div className="col-md-2"><NavLink to="/app/adminmenus">
                                <div className="glyph-icon iconsminds-back back_home"> Back to Home</div>
                            </NavLink>
                            </div>
                                </div>
                                {/* Content Stars here */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group has-top-label">
                                        <Label>Select a page</Label>
                                            <Select 
                                                value={this.state.listPages.find(item => item.value === this.state.SelectPage)}
 
                                                onChange={this.handleChangeSelect.bind(this)}
                                                options={this.state.listPages}
                                                id="selectPage"
                                                name="selectPage"
                                                className="react-select"
                                                classNamePrefix="react-select"
                                            />
                                        </div>
                                        {(this.state.submittet || this.state.pageDetails.selectPage.touched) && !this.state.pageDetails.selectPage._value && <span className="text-danger">{this.state.pageDetails.selectPage.errorMsg}</span>}
                                        <div className="form-group has-top-label">
                                        <Label>Page Title</Label>
                                            <Input
                                                name="maintitle"
                                                id="maintitle"
                                                onChange={this.handletitleChange}
                                                value={this.state.pageDetails.maintitle._value}
                                                autoComplete={'off'}
                                            />
                                        </div>
                                        {(this.state.submittet || this.state.pageDetails.maintitle.touched) && !this.state.pageDetails.maintitle._value && <span className="text-danger">{this.state.pageDetails.maintitle.errorMsg}</span>}
                                        <div className="form-group has-top-label">
                                        <Label>Page Sub Title</Label>
                                            <Input
                                                name="subtitle"
                                                id="subtitle"
                                                onChange={this.handletitleChange}
                                                value={this.state.pageDetails.subtitle._value}
                                                autoComplete={'off'}
                                            />
                                        </div>
                                        {(this.state.submittet || this.state.pageDetails.subtitle.touched) && !this.state.pageDetails.subtitle._value && <span className="text-danger">{this.state.pageDetails.subtitle.errorMsg}</span>}
                                        <div className="form-group has-top-label">
                                        <Label>Page Content</Label>
                                            <ReactQuill theme="snow"
                                                name="pagecontent"
                                                id="pagecontent"
                                                onChange={this.handlecontentChange}
                                                value={this.state.pageDetails.pagecontent._value}
                                               
                                            />
                                        </div>
                                        {(this.state.submittet || this.state.pageDetails.pagecontent.touched) && !this.state.pageDetails.pagecontent._value && <span className="text-danger">{this.state.pageDetails.pagecontent.errorMsg}</span>}
                                        <div className="justify-center btn-n-r">
                                            <Button value="Send"
                                                color="primary"
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
