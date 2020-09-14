import React, { Component } from "react";
import axios from 'axios';
import {
    Button,
    Input,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DropzoneComponent from 'react-dropzone-component';
import { Baseurl } from '../constants/defaultValues';
import { api, mediaPath } from '../views/Shared/baseurl-api';
import 'dropzone/dist/min/dropzone.min.css';
const ReactDOMServer = require('react-dom/server');
class category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SubCategoryName: [],
            loader: false,
            submitdetcreatedir: false,
            submitdetupdatedir: false,
            submitdetfiles: false,
            baseurl: api, docBaseUrl: mediaPath,
            files: null,
            dirID: '0',
            addAction: false,
            editAction: false,
            uploadAction: false,
            filesAction: true,
            isHome: false,
            selectedId: 0,
            myfiles: null,
            UpdateDetails: {
                updateDirID: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                updateDirName: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                updateDirDesc: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            },
            CreateDetails: {
                subDirName: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                subDirDesc: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                subDirID: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            },
            FileDetails: {
                fileID: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },

                fileName: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                fileDesc: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
            },
            document: [],
            subCategoryName: null,
        }
        this.SubmitCreateDirectory = this.SubmitCreateDirectory.bind(this);
        this.ResetCreateDirectory = this.ResetCreateDirectory.bind(this);
        this.ResetUpdateDirectory = this.ResetUpdateDirectory.bind(this);
        this.SubmitUpdateDirectory = this.SubmitUpdateDirectory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFiles = this.handleChangeFiles.bind(this);
        this.handleChangeUpdate = this.handleChangeUpdate.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.parentDirectory = this.parentDirectory.bind(this);
        this.SubmitFileDirectory = this.SubmitFileDirectory.bind(this);
        this.deleteDirectory = this.deleteDirectory.bind(this);
        this.DeleteDirectory = this.DeleteDirectory.bind(this);
        this.dontdeleteDirectory = this.dontdeleteDirectory.bind(this);
        this.ResetFileDirectory = this.ResetFileDirectory.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    addAction = () => {
        this.setState({ addAction: !this.state.addAction, editAction: false, uploadAction: false })
    }
    editAction = () => {
        if (this.state.selectedId == 0)
            this.setState({ isHome: true, msg: "Sorry!! You are in Home directory, so you are not allowed to do this action." })
        else
            this.setState({ editAction: !this.state.editAction, addAction: false, uploadAction: false })
    }
    uploadAction = () => {
        if (this.state.selectedId == 0)
            this.setState({ isHome: true, msg: "Sorry!! You are in Home directory, so you are not allowed to do this action." })
        else
            this.setState({ uploadAction: !this.state.uploadAction, addAction: false, editAction: false })
    }
    hideHome = () => {
        this.setState({ isHome: false })
    }
    deleteAction = (data) => {
        if (this.state.selectedId == 0)
            this.setState({ isDelete: false, isHome: true, msg: "Sorry!! You are in Home directory, so you are not allowed to do this action." })
        else
            this.setState({ isDelete: data })
    }
    visibleAction = (data) => {
        if (this.state.selectedId == 0)
            this.setState({ isVisible: false,isHome : true ,msg: "Sorry!! You are in Home directory, so you are not allowed to do this action." })
        else
            this.setState({ isVisible: data })
    }

    componentDidMount() {
        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");
        if (role == "Super Admin" || role == "Admin") { }
        else {
            window.location.assign(Baseurl + '/app/home');
        }
        this.getCategoryList();
    }
    SubmitUpdateDirectory() {
        this.setState({
            submitdetupdatedir: true
        })
        console.log('submitdetfiles', this.state.submitdetupdatedir)
        if (this.state.UpdateDetails.updateDirName._value && this.state.UpdateDetails.updateDirDesc._value) {
            console.log('submitdetfiles2', this.state.submitdetupdatedir)
            let datas = {
                "dirName": this.state.UpdateDetails.updateDirName._value,
                "dirDescription": this.state.UpdateDetails.updateDirDesc._value,
                "thumbnail": "simple",
                "parent_id": 0,
                "createdBy": "Admin"
            }
            console.log('data', datas)
            axios.put(this.state.baseurl + `Directory/Update?id=${this.state.UpdateDetails.updateDirID._value}`, datas)
                .then(res => {
                    if (res) {
                        // this.getCategoryList();
                        window.location.assign(Baseurl + '/app/categoryAdmin');
                        // this.ResetUpdateDirectory();
                        if (res.status != 200) {
                            console.log('sucess21', res.data.status, res)
                            this.setState(prev => {
                                let error = true;
                                let errorMsg = res.data;
                                let variant = 'danger';
                                return { errorMsg, error, variant };
                                console.log('sucess', res.data.status, res.data)
                            })
                            toast.error(res.data, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        } else {
                            console.log('sucess2', res.data.status, res)
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
                        this.setState((prev) => { });
                    }
                })
        }
    }
    parentDirectory() {
        this.state.CreateDetails.subDirID._value = "";
        let createDetails = Object.assign({}, this.state.CreateDetails);
        this.setState({
            CreateDetails: createDetails,
            selectedId: 0,
            addAction: false,
            editAction: false,
            uploadAction: false,
            document: []

        })


    }
    deleteDirectory() {
        console.log('submitdetfiles', this.state.submitdetupdatedir)
        this.setState({
            submitdetupdatedir: true,
            isDelete: false,
        })
        console.log('submitdetfiles', this.state.submitdetupdatedir)
        if (this.state.UpdateDetails.updateDirName._value && this.state.UpdateDetails.updateDirDesc._value) {
            let datas = {
                "id": this.state.UpdateDetails.updateDirID._value,
                "username": "Admin"
            }
            console.log('data', datas)
            axios.post(this.state.baseurl + `Directory/Delete?id=${this.state.UpdateDetails.updateDirID._value}&username=${'Admin'}`)
                .then(res => {
                    console.log('sucess', res, res.data)
                    if (res.status != 200) {
                        this.setState(prev => {
                            let error = true;
                            let errorMsg = res.data;
                            let variant = 'danger';
                            return { errorMsg, error, variant };
                            console.log('sucess', res.data.status, res.data)
                        })
                        toast.error(res.data, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        console.log('sucess2', res.data.status, res.data)
                        this.setState((prev) => {
                            let errorMsg = res.data;
                            let error = true;
                            let variant = 'success'
                            return { error, errorMsg, variant };
                            console.log('sucess', res.data.status, res.data)
                        })
                        toast.success(res.data, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    this.getCategoryList();
                    this.ResetUpdateDirectory();
                })
        }
    }
    dontdeleteDirectory() { }
    DeleteDirectory() {
        confirmAlert({
            title: 'Confirm to Delete?',
            message: '',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteDirectory()
                },
                {
                    label: 'No',
                    onClick: () => this.dontdeleteDirectory()
                }
            ]
        });
    }
    ResetCreateDirectory() {
        this.state.CreateDetails.subDirName._value = "";
        this.state.CreateDetails.subDirDesc._value = "";
        let _subDirName = this.state.CreateDetails.subDirName._value;
        let _subDirDesc = this.state.CreateDetails.subDirDesc._value;
        this.setState({
            subDirName: _subDirName,
            subDirDesc: _subDirDesc
        });
    }
    ResetUpdateDirectory() {
        this.state.UpdateDetails.updateDirName._value = "";
        this.state.UpdateDetails.updateDirDesc._value = "";
        let _updateDirName = this.state.UpdateDetails.updateDirName._value;
        let _updateDirDesc = this.state.UpdateDetails.updateDirDesc._value;
        this.setState({
            updateDirName: _updateDirName,
            updateDirDesc: _updateDirDesc
        });
    }
    ResetFileDirectory() {
        this.state.FileDetails.fileName._value = "";
        this.state.FileDetails.fileDesc._value = "";
        let _fileName = this.state.FileDetails.fileName._value;
        let _fileDesc = this.state.FileDetails.fileDesc._value;
        this.setState({
            fileName: _fileName,
            fileDesc: _fileDesc
        });
    }
    SubmitCreateDirectory() {
        this.setState({
            submitdetcreatedir: true
        })
        let create = Object.assign({}, this.state.CreateDetails);
        console.log('create', this.state)
        let datas = [];
        console.log('dirID', this.state.CreateDetails.subDirID._value)
        if (this.state.CreateDetails.subDirName._value && this.state.CreateDetails.subDirDesc._value) {
            // let dirID = '0';
            if (this.state.CreateDetails.subDirID._value !== "") {
                datas = {
                    "dirName": this.state.CreateDetails.subDirName._value,
                    "dirDescription": this.state.CreateDetails.subDirDesc._value,
                    "thumbnail": "iconminds-folder",

                    "parent_id": this.state.CreateDetails.subDirID._value,
                    "createdBy": "Admin"
                }
            }
            else {
                datas = {
                    "dirName": this.state.CreateDetails.subDirName._value,
                    "dirDescription": this.state.CreateDetails.subDirDesc._value,
                    "thumbnail": "iconminds-folder",

                    "parent_id": 0,
                    "createdBy": "Admin"
                }
            }
            console.log('data', datas, this.state.CreateDetails.subDirID._value, this.state.dirID + 'test')
            axios.post(this.state.baseurl + `Directory/Add`, datas)
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
                        // this.getCategoryList();
                        // this.ResetCreateDirectory();
                        window.location.assign(Baseurl + '/app/categoryAdmin');
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
    getFileList(id) {
        this.setState({ document: [], loader: true, selectedId: id });
        console.log('filelist', id)

        if (id) {
            var link = this.state.baseurl + `Document/GetFiles?id=${id}`;
            axios.get(link)
                .then(res => {
                    if (res.status == 200) {
                        this.setState({ document: res.data, loader: false });
                    }
                })
        }
    }
    getCategoryList() {
        this.setState({ result: [], loader: true });
        var link = this.state.baseurl + `Directory/GetDirListAdmin`;
        axios.get(link)
            .then(res => {
                if (res.status == 200) {
                    let _res = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].hasOwnProperty('directory')) {
                            _res.push(res.data[i]?.directory[0]);
                        }
                    }
                    this.setState({ result: _res, loader: false });
                    console.log(this.state);
                }
            })
    }
    changeHandler = (value, state) => {
        this.setState({ [state]: value });
        if (value.length)
            this.state.SubCategoryName.push(value[0].value);
        this.state.subCategoryName = this.state.SubCategoryName;
    };
    hasFileOrDir(data) {
        if (data) {
            return data.map((data, key) => <li key={key} className="tree-item ">
                <span className={"tree-item-label " + data.show ? "iconsminds-folder" : "iconsminds-folder-open" + "show-on-hover"}><a onClick={() => this.showSubTree(data.id, data.DirName)} className={this.state.selectedId == data.id ? "expand active" : "expand"}>{data.DirName} {data.show}</a></span>
                {data.Dir && data.show && this.hasFileOrDir(data.Dir)}
            </li >
            )
        }
    }
    onChange = (name, value) => {
        console.log('name', name, value)
        this.setState({ [name]: value });
    }
    handleChangeUpdate(e) {
        let { name, value } = e.target;
        this.setState(prevState => {
            let updateDetails = Object.assign({}, this.state.UpdateDetails);
            updateDetails[name]._value = value;
            updateDetails[name].touched = true;
            return updateDetails;
        })
    }
    handleChange(e) {
        let { name, value } = e.target;
        this.setState(prevState => {
            let createDetails = Object.assign({}, this.state.CreateDetails);
            createDetails[name]._value = value;
            createDetails[name].touched = true;
            return createDetails;
        })
    }
    handleChangeFiles(e) {
        let { name, value } = e.target;
        this.setState(prevState => {
            let fileDetails = Object.assign({}, this.state.FileDetails);
            fileDetails[name]._value = value;
            fileDetails[name].touched = true;
            return fileDetails;
        })
    }
    showSubTree(id, DirName) {
        let _result = this.state.result.map((data) => {
            if (data.id == id) {
                data.show = !data.show;
            }
            if (data.Dir) {
                let _res = this.getSubTreeDetails(data.Dir, id, DirName);
                this.getFileList(id);
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
        let FileName = '', FileDesc = '', FileID = '';
        // this.setState({document:[]})
        let _document = this.state.document.map((data) => {
            if (data.id == id) {
                data.show = !data.show;
                FileID = data.id;

                FileName = data.DocName;
                FileDesc = data.DocDescription;
                console.log('show', data)
            }
        })
        this.setState(prevState => {
            let fileDetails = Object.assign({}, this.state.FileDetails);
            fileDetails['fileID']._value = FileID;
            fileDetails['fileID'].touched = FileID;
            fileDetails['fileName']._value = FileName;
            fileDetails['fileName'].touched = FileName;
            fileDetails['fileDesc']._value = FileDesc;
            fileDetails['fileDesc'].touched = FileDesc;
            let uploadAction = true;
            return { fileDetails, uploadAction };
        }, () => {
        })
    }
    getSubTreeDetails(data, id, DirName) {
        if (data) {
            data.map((_data) => {
                if (_data.id == id) {
                    this.state.CreateDetails.subDirID._value = _data.id;
                    this.state.UpdateDetails.updateDirID._value = _data.id;
                    this.state.UpdateDetails.updateDirName._value = _data.DirName;
                    this.state.UpdateDetails.updateDirDesc._value = _data.DirDescription;
                    _data.show = !_data.show;
                } else {
                    this.getSubTreeDetails(_data.Dir, id, DirName)
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
        formData.append("id", this.state.FileDetails.fileID._value);

        formData.append("CreatedBy", "Admin");
        if (this.state.files)
            formData.append("files", this.state.files.files[0]);
        else
            formData.append("files", '');
        console.log('formdata', formData)
        return formData;
    }
    SubmitFileDirectory() {
        this.setState({
            submitdetfiles: true
        })
        console.log('submitdetfiles', this.state)
        if (this.state.FileDetails.fileName._value && this.state.FileDetails.fileDesc._value) {
            axios
                .post(
                    this.state.baseurl + "DocumentUpload",
                    this.buildForm(),
                    {
                        withCredentials: true,
                        // headers: new HttpHeaders({
                        //      'Content-Type':  'application/json',
                        //    })
                    },
                    toast.success("File Uploaded", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                )
                .then(response => {
                    // this.getFileList();
                    // this.ResetFileDirectory();
                })
                .catch(error => {
                    toast.error(error, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    console.log("form SubmitFileDirectory error", error);
                });
            console.log('file', this.state.CreateDetails.subDirID._value)
            this.getFileList(this.state.CreateDetails.subDirID._value);
            this.showSubTree(this.state.CreateDetails.subDirID._value, '')
            //  this.appendFiles(this.state.CreateDetails.subDirID._value)
            this.ResetFileDirectory();

            // window.location.assign(Baseurl+'/app/categoryAdmin');

            // event.preventDefault();
        }
        // this.getCategoryList();

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
                <div className="card dashboard-progress height-auto">


                    <div className="card-body ">
                        <div className="row">
                            <div className="col-md-10">
                                <h1>Manage Files</h1>
                            </div>
                            <div className="col-md-2"><a href="/app/adminmenus">
                                <div className="glyph-icon iconsminds-back back_home"> Back to Home</div>
                            </a></div>
                        </div>


                        <div className="row col-lg-12">
                            <div className="col-md-5">
                                <div className="sidebar1">
                                    <PerfectScrollbar
                                        options={{ suppressScrollX: true, wheelPropagation: false }}
                                    >
                                        <div className="panel">
                                            <div className="panel-body">
                                                <ul className="tree-group">
                                                    <li className="tree-item ">
                                                        <span className="tree-item-label iconsminds-folder-open">
                                                            <a className={this.state.selectedId == 0 ? "expand active" : 'expand'} onClick={() => this.parentDirectory()}>Home</a>
                                                        </span>
                                                        <ul className="tree-group">
                                                            {this.state.result && this.state.result.map((data, key) =>
                                                                <li key={key} className="tree-item ">
                                                                    <span className={"tree-item-label " + data.show ? "iconsminds-folder" : "iconsminds-folder-open" + "show-on-hover"}>
                                                                        <a onClick={() => this.showSubTree(data.id, data.DirName)} className={this.state.selectedId == data.id ? "expand active" : "expand"}>{data.DirName}</a>
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
                            <div className="col-md-7">
                                <div className="right_section">
                                    <div className="heading-part row">
                                                            <h3 className="col-lg-7">{this.state.selectedId == 0 ? 'Home' : this.state.UpdateDetails.updateDirDesc._value}</h3>
                                        <div className="icons-part col-lg-5 text-right">
                                            <a className="cust_icon" onClick={() => this.addAction()} id="btn_add" data-toggle="tooltip"
                                                data-placement="top" title="Add Directory"><i className="glyph-icon simple-icon-plus"></i></a>
                                            <a className="cust_icon green_icon" id="btn_edit" onClick={() => this.editAction()} data-toggle="tooltip"
                                                data-placement="top" title="Edit Directory"><i className="glyph-icon simple-icon-pencil"></i></a>
                                            <a data-toggle="modal" data-target="#hide_folder" className="cust_icon hide_btn" data-tooltip="tooltip"
                                                data-placement="top" onClick={() => this.visibleAction(true)} title="Show/Hide Directory"><i className="glyph-icon simple-icon-eye "></i></a>
                                            <a data-toggle="modal" onClick={() => this.deleteAction(true)} data-target="#exampleModal" className="cust_icon red_icon" data-tooltip="tooltip"
                                                data-placement="top" title="Delete Directory"><i className="glyph-icon simple-icon-trash"></i></a>



                                        </div>

                                    </div>
                                    <div className="row">
                                        <nav className="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">
                                            <ol className="breadcrumb pt-0">
                                                <li className="breadcrumb-item">
                                                    <a href="./index.html">Home</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <a href="./index.html">SOP's</a>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">O &amp; T</li>
                                            </ol>
                                        </nav>
                                    </div>

                                    <div className="box-part">
                                        {this.state.addAction &&
                                            <div className="add-category" id="add_new">
                                                <div className="bk-grey">
                                                    <div className="topic-head">
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <h2>Add Directory</h2></div>
                                                            <i onClick={() => this.addAction()} className="glyph-icon iconsminds-close col-2 no-padding text-right" id="close_add"></i>
                                                        </div>
                                                    </div>

                                                    <div className="add_dir">
                                                        <div className="row">
                                                            <div className="form-group has-top-label col-5" >

                                                                <Label>Directory Name</Label>
                                                                <Input
                                                                    name="subDirName"
                                                                    id="subDirName"
                                                                    value={this.state.CreateDetails.subDirName._value}
                                                                    onChange={this.handleChange}
                                                                    autoComplete={'off'}
                                                                />
                                                                {(this.state.submitdetcreatedir || this.state.CreateDetails.subDirName.touched) && !this.state.CreateDetails.subDirName._value && <span className="text-danger">{this.state.CreateDetails.subDirName.errorMsg}</span>}
                                                            </div>

                                                            <div className="form-group has-top-label col-5" >
                                                                <Label>Directory Description</Label>
                                                                <Input
                                                                    name="subDirDesc"
                                                                    id="subDirDesc"
                                                                    value={this.state.CreateDetails.subDirDesc._value}
                                                                    onChange={this.handleChange}
                                                                    autoComplete={'off'}
                                                                />
                                                                {(this.state.submitdetcreatedir || this.state.CreateDetails.subDirDesc.touched) && !this.state.CreateDetails.subDirDesc._value && <span className="text-danger">{this.state.CreateDetails.subDirDesc.errorMsg}</span>}
                                                            </div>
                                                            <div className="col-2 w_allign no-padding">
                                                                <Button value="Send"
                                                                    color="primary"
                                                                    onClick={() => (this.SubmitCreateDirectory())} >
                                                                    Add
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {this.state.editAction &&
                                            <div className="add-category" id="edit_update">
                                                <div className="bk-grey">
                                                    <div className="topic-head">
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <h2>Edit / Update Directory</h2></div>
                                                            <i onClick={() => this.editAction()} className="glyph-icon iconsminds-close col-2 no-padding text-right" id="close_add"></i>
                                                        </div>
                                                    </div>


                                                    <div key={'0'} className="add_dir">

                                                        <div className="row">
                                                            <div className="form-group has-top-label col-5" >
                                                                <Label>Directory Name</Label>
                                                                <Input
                                                                    name="updateDirName"
                                                                    id="updateDirName"
                                                                    autoComplete={'off'}
                                                                    value={this.state.UpdateDetails.updateDirName._value}
                                                                    onChange={this.handleChangeUpdate}
                                                                />
                                                                {(this.state.submitdetupdatedir || this.state.UpdateDetails.updateDirName.touched) && !this.state.UpdateDetails.updateDirName._value && <span className="text-danger">{this.state.UpdateDetails.updateDirName.errorMsg}</span>}
                                                            </div>

                                                            <div className="form-group has-top-label col-5" >
                                                                <Label>Directory Description</Label>
                                                                <Input
                                                                    name="updateDirDesc"
                                                                    id="updateDirDesc"
                                                                    autoComplete={'off'}
                                                                    value={this.state.UpdateDetails.updateDirDesc._value}
                                                                    onChange={this.handleChangeUpdate}
                                                                />
                                                                {(this.state.submitdetupdatedir || this.state.UpdateDetails.updateDirDesc.touched) && !this.state.UpdateDetails.updateDirDesc._value && <span className="text-danger">{this.state.UpdateDetails.updateDirDesc.errorMsg}</span>}
                                                            </div>

                                                            <div className="col-2 w_allign no-padding">

                                                                <Button
                                                                    color="primary"
                                                                    onClick={() => (this.SubmitUpdateDirectory())} >
                                                                    Update
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {this.state.uploadAction &&
                                            <div className="add-category" id="upload_file">
                                                <div className="bk-grey">
                                                    <div className="topic-head">
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <h2>Upload Files</h2></div>
                                                            <i onClick={() => this.uploadAction()} className="glyph-icon iconsminds-close col-2 no-padding text-right" id="close_add"></i>
                                                        </div>
                                                    </div>


                                                    <div className="add_dir">
                                                        <>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <DropzoneComponent
                                                                        id="fileID"
                                                                        config={dropzoneComponentConfig}
                                                                        djsConfig={dropzoneConfig}
                                                                        eventHandlers={{
                                                                            init: (dropzone) => {
                                                                                this.state.files = dropzone;
                                                                            },
                                                                        }}
                                                                    />

                                                                </div>
                                                                <div className="col-6 no-padding">

                                                                    <div className="form-group has-top-label col-12">
                                                                        <Label>File Name</Label>
                                                                        <Input
                                                                            name="fileName"
                                                                            id="fileName"
                                                                            onChange={this.handleChangeFiles}
                                                                            autoComplete={'off'}
                                                                            value={this.state.FileDetails.fileName._value}
                                                                        />

                                                                    </div>
                                                                    {(this.state.submitdetfiles || this.state.FileDetails.fileName.touched) && !this.state.FileDetails.fileName._value && <span className="text-danger">{this.state.FileDetails.fileName.errorMsg}</span>}
                                                                    <div className="form-group has-top-label col-12" >
                                                                        <Label>File Description</Label>
                                                                        <Input
                                                                            name="fileDesc"
                                                                            onChange={this.handleChangeFiles}
                                                                            id="fileDesc"
                                                                            autoComplete={'off'}
                                                                            value={this.state.FileDetails.fileDesc._value}
                                                                        />

                                                                    </div>
                                                                    {(this.state.submitdetfiles || this.state.FileDetails.fileDesc.touched) && !this.state.FileDetails.fileDesc._value && <span className="text-danger">{this.state.FileDetails.fileDesc.errorMsg}</span>}
                                                                    <div className="justify-center w_allign">
                                                                        <Button
                                                                            outline color="primary"
                                                                            onClick={() => (this.ResetFileDirectory())}>
                                                                            Reset
                                                                </Button>
                                                                        <Button value="Send"
                                                                            color="primary"
                                                                            onClick={() => (this.SubmitFileDirectory())} >
                                                                            Upload
                                                                </Button>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </>
                                                    </div>

                                                </div>
                                            </div>
                                        }
                                        {this.state.filesAction &&
                                            <div className="bk-grey mar-t-30">
                                                <div className="top-part row">
                                                    <div className="topic-head col-lg-8">
                                                        <h2>Files</h2>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <button onClick={() => this.uploadAction()} className="btn btn-primary btn-custm " id="_add_file" type="submit"><i className="glyph-icon simple-icon-plus"></i> Add File</button></div>
                                                </div>
                                                <ul className="admin list-unstyled inner-level-menu-new mar-t-20">
                                                    {this.state.document && this.state.document.map((data, key) =>
                                                        <li key={key} className="list_acc second_level">
                                                            <a target="_blank" className="row col-lg-12 list_acc_filelink">
                                                                <i className="simple-icon-doc col-lg-2"></i>
                                                                <span
                                                                    className="d-inline-block col-lg-8">
                                                                    <a href={`${this.state.docBaseUrl}${data.DocPath}`} target="_blank" className="filelink">{data.DocName}</a>
                                                                </span>
                                                                <i data-brackets-id="15856" onClick={() => this.appendFiles(data.id)} className="simple-icon-note show-on-hover col-lg-2"></i>
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        }
                                    </div>


                                </div>
                            </div>
                        </div>



                    </div>
                </div>

                {
                    <Modal
                        isOpen={this.state.isHome}
                        className={'alert-modal'}
                        centered
                    >
                        <div className={'col-md-12  modal-header'}>
                            <div className={'col-md-6'}>
                                {/* <span className="iconsminds-danger icon-red"></span> */}
                                <h4 className="">Warning</h4>
                            </div>
                            <div className={'col-md-6 text-right'}>
                                <i style={{ fontSize: '1.15rem' }} onClick={() => this.hideHome()} className="glyph-icon iconsminds-close col-2 no-padding text-right" id="close_add"></i>
                            </div>
                        </div>
                        <ModalBody className={'text-center'}>
                            <p> {this.state.msg} </p>
                        </ModalBody>
                        <ModalFooter >
                            <Button
                                color="btn btn-primary btn-custm"
                                onClick={() => this.hideHome()}
                            >
                                Ok
                                {/* <b>{this.state.action.DirName} {this.state.action.DocName}</b>? */}
                            </Button>

                        </ModalFooter>
                    </Modal>
                }



                <Modal
                    isOpen={this.state.isDelete}
                    className={'alert-modal'}
                    centered
                >
                    <div className={'col-md-12  modal-header'}>
                        <div className={'col-md-6'}>
                            {/* <span className="iconsminds-danger icon-red"></span> */}
                            <h4 className="">Alert</h4>
                        </div>
                        <div className={'col-md-6 text-right'}>
                            <i style={{ fontSize: '1.15rem' }} onClick={() => this.deleteAction(false)} className="glyph-icon iconsminds-close col-2 no-padding text-right" id="close_add"></i>
                        </div>
                    </div>
                    <ModalBody className={'text-center'}>
                        <p>Are you do you want to delete <b> {this.state.UpdateDetails.updateDirDesc._value}</b>? </p>
                    </ModalBody>
                    <ModalFooter >
                        <Button
                            color="btn btn-primary btn-custm"
                            onClick={() => this.deleteDirectory()}
                        >
                            Ok
                                {/* <b>{this.state.action.DirName} {this.state.action.DocName}</b>? */}
                        </Button>

                        <Button
                            color="btn btn-secondary btn-custm"
                            onClick={() => this.deleteAction(false)}
                        >
                            Cancel
                            </Button>

                    </ModalFooter>
                </Modal>

                <Modal
                    isOpen={this.state.isVisible}
                    className={'alert-modal'}
                    centered
                >
                    <div className={'col-md-12  modal-header'}>
                        <div className={'col-md-6'}>
                            {/* <span className="iconsminds-danger icon-red"></span> */}
                            <h4 className="">Alert</h4>
                        </div>
                        <div className={'col-md-6 text-right'}>
                            <i style={{ fontSize: '1.15rem' }} onClick={() => this.visibleAction(false)} className="glyph-icon iconsminds-close col-2 no-padding text-right" id="close_add"></i>
                        </div>
                    </div>
                    <ModalBody className={'text-center'}>
                        <p>Are you do you want to hide <b> {this.state.UpdateDetails.updateDirDesc._value}</b>? </p>
                    </ModalBody>
                    <ModalFooter >
                        <Button
                            color="btn btn-primary btn-custm"
                            onClick={() => this.deleteDirectory()}
                        >
                            Ok
                                {/* <b>{this.state.action.DirName} {this.state.action.DocName}</b>? */}
                        </Button>

                        <Button
                            color="btn btn-secondary btn-custm"
                            onClick={() => this.visibleAction(false)}
                        >
                            Cancel
                            </Button>

                    </ModalFooter>
                </Modal>


            </>
        );
    };
}
category.propTypes = {}
export default category;