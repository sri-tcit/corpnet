import React, { Component, Suspense, useRef } from "react";
import { getAnimationType } from "react-scroll/modules/mixins/animate-scroll";
import axios from 'axios';
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
// import { toast } from 'react-toastify'; 
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, NavLink } from 'react-router-dom';

import DropzoneComponent from 'react-dropzone-component';
import { api } from '../views/Shared/baseurl-api';
import 'dropzone/dist/min/dropzone.min.css';
const ReactDOMServer = require('react-dom/server');
// const handleSubmit = (files, allFiles) => {
//     console.log(files.map(f => f.meta))
//     allFiles.forEach(f => f.remove())
//   }
// toast.configure();

class category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SubCategoryName: [],
            loader: false,
            // subDirName: null,
            // subDirDesc: null,
            // subDirID: null,
            // UpdateDirID: null,
            // UpdateDirName: null,
            // UpdateDirDesc: null,
            // fileName: null,
            // fileDesc: null,
      submitdetcreatedir: false,
      submitdetupdatedir: false,
      submitdetfiles: false,
      baseurl: api,
            files:null,
            myfiles:null,
            UpdateDetails: {
                updateDirID:{_value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                updateDirName: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                updateDirDesc: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            },
            //  pagecontent: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            //  selectPage: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." }, 
             CreateDetails: {
                subDirName:{_value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                subDirDesc: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                subDirID: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            //  pagecontent: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            //  selectPage: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." }, 
             },
             FileDetails: {
                fileName:{_value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                fileDesc: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            //  subtitle: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            //  pagecontent: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            //  selectPage: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." }, }
              },
            document:[],
            subCategoryName: null,
            // options: ['A', 'B', 'C']
        }

        this.SubmitCreateDirectory = this.SubmitCreateDirectory.bind(this);
        this.ResetCreateDirectory = this.ResetCreateDirectory.bind(this);
        this.SubmitUpdateDirectory = this.SubmitUpdateDirectory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFiles = this.handleChangeFiles.bind(this);
        this.handleChangeUpdate = this.handleChangeUpdate.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    // this.componentConfig = this.componentConfig.bind(this);
    // this.djsConfig = this.djsConfig.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.props.history.listen((location, action) => {
            this.getCategoryList(location.pathname)
            console.log("TEST")
        });
    }
    componentDidMount() {
        this.getCategoryList(this.props.location.pathname);
        // this.getFileList(this.props.location.pathname);
        
        console.log('test', this.props.location.pathname)
    }

    SubmitUpdateDirectory() {

  this.setState({
    submitdetupdatedir: true
})

console.log('submitdetfiles',this.state.submitdetupdatedir)
if(this.state.UpdateDetails.updateDirName._value && this.state.UpdateDetails.updateDirDesc._value){
console.log('submitdetfiles2',this.state.submitdetupdatedir)
let datas = {
            "dirName": this.state.UpdateDetails.updateDirName._value,
            "dirDescription": this.state.UpdateDetails.updateDirDesc._value,
            "thumbnail": "iconminds-folder",
            "parent_id": this.state.UpdateDetails.updateDirName._value,
            "createdBy": "Admin"
        }
        console.log('data', datas)
        axios.post(this.state.baseurl + `Directory/Add`, datas)
            .then(res => {
                if (res) {
                    this.setState((prev) => { });
                }
            })
        }
        // console.log('event', this.state.subDirName, this.state.subDirDesc, this.state.subCategoryName)
    }
    // ResetCreateDirectory(){
    //     this.state.CreateDetails.subDirID._value="";
    //     this.state.CreateDetails.subDirName._value="";
    //     this.state.CreateDetails.subDirDesc._value="";
    //     // this.state.CreateDetails.subDirID._value="";
        
    // }
    ResetCreateDirectory = () => {
        // Array.from(document.querySelectorAll("input")).forEach(
            
        //   input => (input.value = "")
        //   console.log('test',input.value)
        // );
        this.setState({
          CreateDetails: [{}]
        });
      };
    SubmitCreateDirectory() {

  this.setState({
    submitdetcreatedir: true
})

console.log('submitdetfiles',this.state.submitdetcreatedir,this.state.CreateDetails.subDirName._value)
    if(this.state.CreateDetails.subDirName._value && this.state.CreateDetails.subDirDesc._value){
console.log('submitdetfiles2',this.state.submitdetcreatedir)
// toast.configure();

let datas = {
            "dirName": this.state.CreateDetails.subDirName._value,
            "dirDescription": this.state.CreateDetails.subDirDesc._value,
            "thumbnail": "iconminds-folder",
            "parent_id": this.state.CreateDetails.subDirID._value,
            "createdBy": "Admin"
        }
        console.log('data', datas)
        axios.post(this.state.baseurl + `Directory/Add`, datas)
            .then(res => {
                //     console.log('sucess',response.message,response.data)
                //     // this works fine because response.message is a string
                //     toast.sucess(response.data)
                //     toast.dismiss();

                //  })
                // .catch((error) => {
                //     // this will fail to renter because error is an object, not a string
                //     toast.error(error)
                //     toast.dismiss();
                //  })
            if (res.data != "Category added successfully") {
                this.setState(prev => {
                    let error = true;
                    let errorMsg = res.data;
                    let variant = 'danger';
                    return { errorMsg, error, variant };
                    console.log('sucess',res.data.status,res.data)
                })
                toast.error(res.data, {
                    position: toast.POSITION.TOP_RIGHT
                });

            } else {
                console.log('sucess2',res.data.status,res.data)

                this.setState((prev) => {
                    let errorMsg = res.data;
                    let error = true;
                    let variant = 'success'
                    return { error, errorMsg, variant };
                    console.log('sucess',res.data.status,res.data)
                })
                toast.success(res.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
        //         // this.props.action();
            

            }
        })
                }
        // console.log('event',this.state.subDirID, this.state.subDirName, this.state.subDirDesc, this.state.subCategoryName)
    }
    getFileList(id) {
        // id = id.split("/");
        // id = id[id.length - 1];
        console.log();
        this.setState({ document: [], loader: true });
        if (id) {
            var link = this.state.baseurl+`Document/GetFiles?id=${id}`;
            axios.get(link)
                .then(res => {
                    if (res.status == 200) {
                        
                        
                        this.setState({  document:res.data, loader: false });
                        
                        }
                        console.log('state',this.state);
                    
                })
        }

    }
    getCategoryList(id) {
        this.setState({  result: [], loader: true });
        if (id) {
            var link = this.state.baseurl+`Directory/GetDirListAdmin`;
            axios.get(link)
                .then(res => {
                    if (res.status == 200) {
                        let _res = [];
                       
                        for (var i = 0; i < res.data.length; i++) {

                            if (res.data[i].hasOwnProperty('directory')) {
                                _res.push(res.data[i]?.directory[0]);
                            }

                        }
                        this.setState({  result: _res, loader: false });
                        console.log(this.state);
                    }
                })
        }

    }
    changeHandler = (value, state) => {
        this.setState({ [state]: value });
        console.log('name', value)

        // this.setState(prev => ({ subCategoryName: prev.SubCategoryName }));
        if (value.length)
            this.state.SubCategoryName.push(value[0].value);

        console.log('name', this.state.SubCategoryName[0])
        this.state.subCategoryName = this.state.SubCategoryName;

    };
    hasFileOrDir(data) {

        if (data) {
            return data.map((data, key) => <li key={key} className="tree-item ">
                <span className={"tree-item-label " + data.show ? "iconsminds-folder" : "iconsminds-folder-open" +"show-on-hover"}><a onClick={() => this.showSubTree(data.ID,data.DirName)} className="expand">{data.DirName} {data.show}</a></span>
                {data.Dir && data.show && this.hasFileOrDir(data.Dir)}
            </li >

            )
        }
    }

    onChange = (name, value) => {
        console.log('name', name, value)
        this.setState({ [name]: value });
    }
    // handleChange({ target }) {
    //     console.log('target', target)
    //     this.setState({
    //         [target.name]: target ? target.value : ''
    //     });
        
    // }
    handleChangeUpdate(e){
        // this.setState({maintitle: e.target.value});
        // console.log("maintitle", this.state.maintitle);
         let { name, value } = e.target;
         this.setState(prevState => {
             let updateDetails = Object.assign({}, this.state.UpdateDetails);
             updateDetails[name]._value =value;
             updateDetails[name].touched = true;
             return updateDetails;
         })
         }
    handleChange(e){
    // this.setState({maintitle: e.target.value});
    // console.log("maintitle", this.state.maintitle);
     let { name, value } = e.target;
     this.setState(prevState => {
         let createDetails = Object.assign({}, this.state.CreateDetails);
         createDetails[name]._value =value;
         createDetails[name].touched = true;
         return createDetails;
     })
     }
     handleChangeFiles(e){
        // this.setState({maintitle: e.target.value});
        // console.log("maintitle", this.state.maintitle);
         let { name, value } = e.target;
         this.setState(prevState => {
             let fileDetails = Object.assign({}, this.state.FileDetails);
             fileDetails[name]._value =value;
             fileDetails[name].touched = true;
             return fileDetails;
         })
         }
    showSubTree(id,DirName) {

        let _result = this.state.result.map((data) => {
            if (data.ID == id) {
                data.show = !data.show;
            }
            if (data.Dir) {
                let _res = this.getSubTreeDetails(data.Dir, id,DirName);
                this.getFileList(id)
                data.Dir = _res;
                return data;
            } else
                return data;
        })
        this.setState({
            result: _result
        }, () => {
        })

    }

    appendFiles(id) {
        let FileName='',FileDesc='';
        let _document = this.state.document.map((data) => {
            if (data.id == id) {
                data.show = !data.show;

            FileName= data.DocName;
            FileDesc=data.DocDescription;
            console.log('show',data.show)
            }
        })
       
        this.setState(prevState => {
            let fileDetails = Object.assign({}, this.state.FileDetails);
            fileDetails['fileName']._value =FileName;
            fileDetails['fileName'].touched = FileName;
            fileDetails['fileDesc']._value =FileDesc;
            fileDetails['fileDesc'].touched = FileDesc;
            return fileDetails;
        }, () => {
        })
console.log('setstate',this.state)
    }
    getSubTreeDetails(data, id,DirName) {

        if (data) {
            data.map((_data) => {
                if (_data.ID == id) {
                    console.log('DirName',_data.DirName,_data.ID)
                this.state.CreateDetails.subDirID._value = _data.ID;
                this.state.UpdateDetails.updateDirID._value = _data.ID;
                this.state.UpdateDetails.updateDirName._value = _data.DirName;
                this.state.UpdateDetails.updateDirDesc._value = _data.DirDescription;
                _data.show = !_data.show;
                } else {
                    console.log('DirName',_data,_data.Dir)
                    this.getSubTreeDetails(_data.Dir, id,DirName)
                    this.state.CreateDetails.subDirID._value = id;
                    this.state.UpdateDetails.updateDirID._value = id;
                    this.state.UpdateDetails.updateDirName._value = DirName;
                    this.state.UpdateDetails.updateDirDesc._value = DirName;

                }
            }
            )
        }

        return data;
    }

    buildForm() {
        const formData = new FormData();
    
        formData.append("DocName", this.state.FileDetails.fileName._value);
        formData.append("DocDescription", this.state.FileDetails.fileDesc._value);
        formData.append("Parent_id", this.state.CreateDetails.subDirID._value);
        formData.append("CreatedBy","Admin");
        // formData.append("portfolio_item[position]", this.state.position);
        // this.state.myfiles.push(this.state.files.files[0]);
    
         formData.append("files", this.state.files.files[0]);
        return formData;
      }
    handleSubmit(event) {

  this.setState({
    submitdetfiles: true
})
console.log('submitdetfiles',this.state.submitdetfiles)
    if(this.state.FileDetails.fileName._value && this.state.FileDetails.fileDesc._value){
        // toast.configure();
        axios
          .post(
            this.state.baseurl+"DocumentUpload",
            this.buildForm(),
            { withCredentials: true },

            toast.success("Directory Added", {
                position: toast.POSITION.TOP_RIGHT
            })
            
          )
          .then(response => {
              console.log('response',response)
            //this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
          })
          .catch(error => {

                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            
            console.log(" form handleSubmit error", error);
          });
    
        event.preventDefault();
      }
    }
    render() {

        const selectData = [
            { label: 'O&T', value: 'O&T', key: 0 },
            { label: 'RBG', value: 'RBG', key: 1 },
            { label: 'CIBG', value: 'CIBG', key: 2 },
            { label: 'CAF', value: 'CAF', key: 3 },
        ];


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
                                {/*  eslint-disable-next-line jsx-a11y/alt-text */}
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
                    <div className="col-md-10">
                        <h1>Manage Files</h1>
                    </div>
                    <div className="col-md-2">

                        <NavLink to="/app/adminmenus">
                            <h4>Back to Home</h4>      </NavLink>
                    </div>

                </div>

                {this.state.loader && <div className="loading" />}
                {!this.state.loader &&



                    <div className="row">
                        <div className="col-md-12 row">
                            <div className="col-md-3">
                                <div style={{ height: '71.5vh', backgroundColor: '#fff', borderRadius: '12px' }} className="sidebar1">
                                    <PerfectScrollbar
                                        options={{ suppressScrollX: true, wheelPropagation: false }}
                                    >
                                        <div className="panel">
                                            <div className="panel-body">
                                                <ul className="tree-group">
                                                    <li className="tree-item ">
                                                        <span className="tree-item-label iconsminds-folder-open">  <a className="expand" >Home</a></span>
                                                        <ul className="tree-group">
                                                            {this.state.result && this.state.result.map((data, key) =>
                                                                <li key={key} className="tree-item ">
                                                                    <span className={"tree-item-label " + data.show ? "iconsminds-folder" : "iconsminds-folder-open" + "show-on-hover"}>
                                                                        <a onClick={() => this.showSubTree(data.ID,data.DirName)} className="expand">{data.DirName}</a>
                                                                    </span>
                                                                    {data.show && this.hasFileOrDir(data.Dir)}
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </PerfectScrollbar>
                                </div>
                            </div>

                            <div className="col-md-9 row-remove">

                                <PerfectScrollbar
                                    options={{ suppressScrollX: true, wheelPropagation: false }}
                                >
                                    <div style={{ height: '70vh', borderRadius: '12px' }} >

                                        <div className="col-md-12 row-remove row">
                                            <div className="col-md-6 action-div">
                                                <div >
                                                    <PerfectScrollbar
                                                        options={{ suppressScrollX: true, wheelPropagation: false }}
                                                    >
                                                        <div  key={'0'}  className="card-body">

                                                            <div className="card-title">Update Directory</div>

                                                            <div className="form-group">
                                                                <Input
                                                                    name="UpdateDirName"
                                                                    id="UpdateDirName"
                                                                    onChange={this.handleChangeUpdate}
                                                                    autoComplete={'off'}
                                                                    label="Directory Name"
                                                                    placeholder={"Directory Name"}
                                                                    value={this.state.UpdateDetails.updateDirName._value}
                                                                />
                         {(this.state.submitdetupdatedir || this.state.UpdateDetails.updateDirName.touched) && !this.state.UpdateDetails.updateDirName._value && <span className="text-danger">{this.state.UpdateDetails.updateDirName.errorMsg}</span>}
                                                            </div>
                                                            <div className="form-group">
                                                                <Input
                                                                    name="UpdateDirDesc"
                                                                    id="UpdateDirDesc"
                                                                    onChange={this.handleChangeUpdate}
                                                                    autoComplete={'off'}
                                                                    label="Directory Description"
                                                                    placeholder={"Directory Description"}                                                                    
                                                                    value={this.state.UpdateDetails.updateDirDesc._value}

                                                                />
                         {(this.state.submitdetupdatedir || this.state.UpdateDetails.updateDirDesc.touched) && !this.state.UpdateDetails.updateDirDesc._value && <span className="text-danger">{this.state.UpdateDetails.updateDirDesc.errorMsg}</span>}
                                                            </div>
                                                            {/* <div className="form-group">
                                                                <Select

                                                                    className="react-select"
                                                                    placeholder = "Select Group"
                                                                    classNamePrefix="react-select"
                                                                    isMulti
                                                                    name="form-field-name"
                                                                    options={selectData}
                                                                />
                                                            </div> */}
                                                            <div className="justify-center">
                                                                <Button
                                                                    color="primary"
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    color="secondary"
                                                                    onClick={this.SubmitUpdateDirectory}

                                                                >
                                                                    Update
                                                                </Button>
                                                            </div>
                                                        </div>
                                                             </PerfectScrollbar>
                                                </div>

                                            </div>


                                            <div className="col-md-6 action-div">

                                                <div  >
                                                    <PerfectScrollbar
                                                        options={{ suppressScrollX: true, wheelPropagation: false }}
                                                    >
                                                        <div className="card-body"><div className="card-title">Add Sub Directory</div>

                                                            <div className="form-group">
                                                                <Input
                                                                    name="subDirName"
                                                                    id="subDirName"
                                                                    value={this.state.CreateDetails.subDirName._value}
                                                                    onChange={this.handleChange}


                                                                    autoComplete={'off'}
                                                                    label="Directory Name"
                                                                    placeholder={"Directory Name"}
                                                                />
                         {(this.state.submitdetcreatedir || this.state.CreateDetails.subDirName.touched) && !this.state.CreateDetails.subDirName._value && <span className="text-danger">{this.state.CreateDetails.subDirName.errorMsg}</span>}
                                                            </div>
                                                            <div className="form-group">
                                                                <Input
                                                                    name="subDirDesc"
                                                                    id="subDirDesc"
                                                                    value={this.state.CreateDetails.subDirDesc._value}
                                                                    onChange={this.handleChange}


                                                                    autoComplete={'off'}
                                                                    label="Directory Description"
                                                                    placeholder={"Directory Description"}
                                                                />
                         {(this.state.submitdetcreatedir || this.state.CreateDetails.subDirDesc.touched) && !this.state.CreateDetails.subDirDesc._value && <span className="text-danger">{this.state.CreateDetails.subDirDesc.errorMsg}</span>}
                                                            </div>
                                                            {/* <div>
                                                            <Select
                                                            label="subCategoryName"
                                                            name={'select'}
                                                            value={this.state.subCategoryName}
                                                            onChange={(value) => this.handleChange(value, "firstValue")}
       
                                                            options={selectData}
                                                            onChange={this.onChange}
                                                            />
 
                                                            </div> */}
                                                            {/* <div className="form-group">
                                                                <Input
                                                                    name="subCategoryName"
                                                                    id="subDirDesc"
                                                                    value={ this.state.subDirDesc }
                                                                    onChange={ this.handleChange } 
                                                                    autoComplete={'off'}
                                                                    label="Directory Desc"
                                                                    placeholder={"Directory Desc"}
                                                                />
                                                            </div> */}
                                                            {/* <div className="form-group">
                                                            <Select
                                                            isMulti
                                                                    id="subCategoryName"
                                                                    name="subCategoryName"
                                                            value={selectData.find(item => item.value === this.state.SubCategoryName)}
                                                            onChange={(value) => this.changeHandler(value, "firstValue")}
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            placeholder = "Select Group"

                                                            options={selectData}
                                                        />
                                                                
                                                            </div> */}
                                                            {/* <Select

                                                                    value={selectData.filter(item => this.state.subCategoryName.includes(item.value))}
                                                                    name="subCategoryName"
                                                                    id="subCategoryName"
                                                                    value={ this.state.subCategoryName }                                                                
                                                                    onChange={ this.handleChange } 

                                                                    className="react-select"
                                                                    placeholder = "Select Group"
                                                                    classNamePrefix="react-select"
                                                                    isMulti
                                                                    options={selectData}
                                                                /> */}
                                                            <div className="justify-center">
                                                                <Button
                                                                    color="primary" onClick={this.ResetCreateDirectory}
                                                                >
                                                                    Reset
                                                                </Button>
                                                                <Button value="Send"
                                                                    color="secondary"
                                                                    onClick={this.SubmitCreateDirectory}
                                                                >
                                                                    Add
                                                                </Button>
                                                            </div>

                                                        </div>
                                                    </PerfectScrollbar>
                                                </div>

                                            </div>

                                            <div className="col-md-6 action-div">
                                                <PerfectScrollbar
                                                    options={{ suppressScrollX: true, wheelPropagation: false }}
                                                >
                                                    
                                                    <div   key={'0'} className="card-body"><div className="card-title">File List</div>

                                                        <ul className="admin list-unstyled inner-level-menu-new">
                                                        {this.state.document && this.state.document.map((data, key) =>

                                                            <li  key={key} className="list_acc second_level">
                                                                <a target="_blank">
                                                                    <i className="simple-icon-doc"></i>
                                                                    <span
                                                                        className="d-inline-block">{data.DocName}</span>
                                                                        {/* <a onClick={() => this.showSubTree(data.ID)}  className="simple-icon-note show-on-hover">{data.DirName}</a> */}

                                                                    <i data-brackets-id="15856" onClick={() => this.appendFiles(data.id)} className="simple-icon-note show-on-hover"></i>
                                                                </a>
                                                                
                                                            </li>
                                                        )}
                                                            {/* <li className="list_acc second_level">
                                                                <a target="_blank">
                                                                    <i className="simple-icon-doc"></i>
                                                                    <span
                                                                        className="d-inline-block">Enhance Due Diligence-734</span>
                                                                    <i data-brackets-id="15856" className="simple-icon-note show-on-hover"></i>
                                                                </a>
                                                            </li>

                                                            <li className="list_acc second_level">
                                                                <a target="_blank">
                                                                    <i className="simple-icon-doc"></i>
                                                                    <span
                                                                        className="d-inline-block">Enhance Due Diligence-734</span>
                                                                    <i data-brackets-id="15856" className="simple-icon-note show-on-hover"></i>
                                                                </a>
                                                            </li>

                                                            <li className="list_acc second_level">
                                                                <a target="_blank">
                                                                    <i className="simple-icon-doc"></i>
                                                                    <span
                                                                        className="d-inline-block">Enhance Due Diligence-734</span>
                                                                    <i data-brackets-id="15856" className="simple-icon-note show-on-hover"></i>
                                                                </a>
                                                            </li>

                                                            <li className="list_acc second_level">
                                                                <a target="_blank">
                                                                    <i className="simple-icon-doc"></i>
                                                                    <span
                                                                        className="d-inline-block">Enhance Due Diligence-734</span>
                                                                    <i data-brackets-id="15856" className="simple-icon-note show-on-hover"></i>
                                                                </a>
                                                            </li> */}
                                                        </ul>

                                                    </div>
                                                    
                                                </PerfectScrollbar>
                                            </div>

                                            <div className="col-md-6 action-div">
                                            {/* <form onSubmit={this.handleSubmit}> */}
                                                <div>
                                                    <PerfectScrollbar
                                                        options={{ suppressScrollX: true, wheelPropagation: false }}
                                                    >
                                                        
                                                        <div  key={'0'} className="card-body">
                                                            <div className="card-title">Upload Files</div>

                                                            <>
                                                                <DropzoneComponent
                                                                    config={dropzoneComponentConfig}
                                                                    djsConfig={dropzoneConfig}
                                                                    eventHandlers={{
                                                                        init: (dropzone) => {
                                                                            this.state.files = dropzone;
                                                                        },
                                                                    }}
                                                                />


                                                                {/* 
                                                                <div className="form-group" style={{ paddingTop: '10px' }}>
                                                                    <Input
                                                                        name="File"
                                                                        id="DirName"
                                                                        autoComplete={'off'}
                                                                        label="File"
                                                                        placeholder={"File"}
                                                                    />
                                                                </div> */}
                                                                <div className="form-group" style={{ paddingTop: '10px' }}>
                                                                    <Input
                                                                        name="fileName"
                                                                        id="fileName"
                                                                    onChange={this.handleChangeFiles}
                                                                    autoComplete={'off'}
                                                                    value={this.state.FileDetails.fileName._value}
                                                                    label="File Name "
                                                                        placeholder={"File Name"}
                                                                    />
                         {(this.state.submitdetfiles || this.state.FileDetails.fileName.touched) && !this.state.FileDetails.fileName._value && <span className="text-danger">{this.state.FileDetails.fileName.errorMsg}</span>}
                                                                </div>
                                                                <div className="form-group">
                                                                    <Input
                                                                        name="fileDesc"
                                                                    onChange={this.handleChangeFiles}
                                                                    id="fileDesc"
                                                                        autoComplete={'off'}
                                                                        label="File Desc"
                                                                    value={this.state.FileDetails.fileDesc._value}
                                                                    placeholder={"File Desc"}
                                                                    />
                         {(this.state.submitdetfiles || this.state.FileDetails.fileDesc.touched) && !this.state.FileDetails.fileDesc._value && <span className="text-danger">{this.state.FileDetails.fileDesc.errorMsg}</span>}
                                                                </div>
                                                                <div className="justify-center">
                                                              <Button
                                                                    color="primary"
                                                                >
                                                                    Reset
                                                                </Button>
                                                                <Button value="Send"
                                                                    color="secondary"
                                                                    onClick={this.handleSubmit}
                                                                >
                                                                    Upload
                                                                </Button>
                                                            </div>
                                                            </>

                                                        </div>
                                                        
                                                    </PerfectScrollbar>
                                                </div>
                                           {/* </form>  */}
                                           </div>
                                        </div>
                                    </div>
                                </PerfectScrollbar>
                            </div>
                        </div>
                    </div>
                }


            </>

        );
    };
}
category.propTypes = {}
export default category;