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
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link,NavLink } from 'react-router-dom';

import DropzoneComponent from 'react-dropzone-component';
import { api } from '../views/Shared/baseurl-api';
import 'dropzone/dist/min/dropzone.min.css';
const ReactDOMServer = require('react-dom/server');


class category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SubCategoryName:[],
            loader: false,
            subDirName: null,
            subDirDesc: null,
      baseurl:api,
      subCategoryName: null,
            // options: ['A', 'B', 'C']
        }

        this.Submit = this.Submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.onChange = this.onChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.props.history.listen((location, action) => {
            this.getCategoryList(location.pathname)
            console.log("TEST")
        });
    }
    componentDidMount() {
        this.getCategoryList(this.props.location.pathname);
        console.log('test',this.props.location.pathname)
    }

 Submit(){
  let  datas = {
        "dirName":this.state.subDirName,
        "dirDescription": this.state.subDirDesc,
        "thumbnail": "iconminds-folder",
        "parent_id": 2,
        "createdBy":"Admin"
      }
      console.log('data',datas)
      axios.post(this.state.baseurl + `Directory/Add`, datas)
          .then(res => {
            if (res) {
              this.setState((prev) => {});
            }
        })
    console.log('event',this.state.subDirName,this.state.subDirDesc,this.state.subCategoryName)
    }
    getCategoryList(id) {
        id = id.split("/");
        id = id[id.length - 1];
        console.log();
        this.setState({ document: [], result: [], loader: true });
        if (id) {
            var link = `http://148.72.206.209:93/api/directory/${id}`;
            axios.get(link)
                .then(res => {
                    if (res.status == 200) {
                        let _res = [];
                        if (res.data[1].hasOwnProperty('Content')) {
                            if (res.data[1].Content[0].hasOwnProperty('Dir'))
                                _res = res.data[1]?.Content[0]?.Dir;
                            if (res.data[1].Content[0].hasOwnProperty('files')) {
                                _res = [{
                                    ID: res.data[0][0].Title[0].ID,
                                    DirName: res.data[0][0].Title[0].DirName,
                                    ShowFavourite: 0,
                                    files: res.data[1].Content[0].files
                                }]
                            }
                            if (res.data[1].Content[0].hasOwnProperty('files')) {
                                _res = [{
                                    ID: res.data[0][0].Title[0].ID,
                                    DirName: res.data[0][0].Title[0].DirName,
                                    ShowFavourite: 0,
                                    files: res.data[1].Content[0].files
                                }]
                            }
                        }

                        this.setState({ document: res.data[0][0].Title[0], result: _res, loader: false });
                        console.log(this.state);
                    }
                })
        }

    }
    // handleChange = selectedValue => {
    //     const { name, onChange } = this.props;
    //     onChange({ name, selectedValue });
    //   }
    changeHandler = (value, state) => {
        this.setState({ [state]: value });
        console.log('name',value)

        // this.setState(prev => ({ subCategoryName: prev.SubCategoryName }));
        if(value.length)
        this.state.SubCategoryName.push(value[0].value);

        console.log('name',this.state.SubCategoryName[0])
        this.state.subCategoryName = this.state.SubCategoryName;

      };
    hasFileOrDir(data) {

        if (data) {
            return data.map((data, key) => <li key={key} className="tree-item ">
                <span className={"tree-item-label " + data.show ? "iconsminds-folder" : "iconsminds-folder-open"}><a onClick={() => this.showSubTree(data.ID)} className="expand">{data.DirName} {data.show}</a></span>
                {data.Dir && data.show && this.hasFileOrDir(data.Dir)}
            </li >

            )
        }
    }

    onChange = (name, value) => {
        console.log('name',name,value)
        this.setState({[name]: value});
      }
    handleChange({ target }) {
        console.log('target',target)
        this.setState({
          [target.name]:target? target.value:''
        });
      }
    //   changeHandler = e => {
    //     console.log('target',e)
    //     if(e.length){
    //     this.setState(prev => ({ subCategoryName: prev.SubCategoryName }));
    //     this.state.SubCategoryName.push(e);
    //     }
    //     console.log('target',this.state.subCategoryName)

    //   }
    showSubTree(id) {

        let _result = this.state.result.map((data) => {
            if (data.ID == id) {
                data.show = !data.show;
            }
            if (data.Dir) {
                let _res = this.getSubTreeDetails(data.Dir, id);
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

    getSubTreeDetails(data, id) {

        if (data) {
            data.map((_data) => {
                if (_data.ID == id) {
                    _data.show = !_data.show;
                } else {
                    this.getSubTreeDetails(_data.Dir, id)
                }
            }
            )
        }

        return data;
    }

    render() {

        const selectData = [
            { label: 'O&T', value: 'O&T', key: 0 },
            { label: 'RBG', value: 'RBG',key: 1 },
            { label: 'CIBG', value: 'CIBG', key: 2 },
            { label: 'CAF', value: 'CAF', key: 3 },
        ];


        const dropzoneComponentConfig = {
            postUrl: 'https://httpbin.org/post',
        };
        const dropzoneConfig = {
            thumbnailHeight: 160,
            maxFilesize: 2,
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
                                                        <span className="tree-item-label iconsminds-folder-open">  <a className="expand">SOP</a></span>
                                                        <ul className="tree-group">
                                                            {this.state.result && this.state.result.map((data, key) =>
                                                                <li key={key} className="tree-item ">
                                                                    <span className={"tree-item-label " + data.show ? "iconsminds-folder" : "iconsminds-folder-open"}>
                                                                        <a onClick={() => this.showSubTree(data.ID)} className="expand">{data.DirName}</a>
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
                                                        <div className="card-body">

                                                            <div className="card-title">Update Directory</div>

                                                            <div className="form-group">
                                                                <Input
                                                                    name="DirName"
                                                                    id="DirName"
                                                                    autoComplete={'off'}
                                                                    label="Directory Name"
                                                                    placeholder={"Directory Name"}
                                                                    value="Complince OPC"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <Input
                                                                    name="DirDesc"
                                                                    id="DirDesc"
                                                                    autoComplete={'off'}
                                                                    label="Directory Desc"
                                                                    placeholder={"Directory Desc"}
                                                                    value="Complince OPC"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <Select

                                                                    className="react-select"
                                                                    placeholder = "Select Group"
                                                                    classNamePrefix="react-select"
                                                                    isMulti
                                                                    name="form-field-name"
                                                                    options={selectData}
                                                                />
                                                            </div>
                                                            <div className="justify-center">
                                                                <Button
                                                                    color="primary"
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    color="secondary"
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
                                                                    value={ this.state.subDirName }
                                                                    onChange={ this.handleChange } 

                                                             
                                                                    autoComplete={'off'}
                                                                    label="Directory Name"
                                                                    placeholder={"Directory Name"}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <Input
                                                                    name="subDirDesc"
                                                                    id="subDirDesc"
                                                                    value={ this.state.subDirDesc }
                                                                    onChange={ this.handleChange } 

                                                            
                                                                    autoComplete={'off'}
                                                                    label="Directory Desc"
                                                                    placeholder={"Directory Desc"}
                                                                />
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
                                                            <div className="form-group">
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
                                                                
                                                            </div>
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
                                                                    color="primary"
                                                                >
                                                                    Reset
                                                                </Button>
                                                                <Button value="Send"
                                                                    color="secondary"
                                                                    onClick={this.Submit}
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
                                                    <div className="card-body"><div className="card-title">File List</div>

                                                        <ul className="admin list-unstyled inner-level-menu-new">
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
                                                        </ul>

                                                    </div>
                                                </PerfectScrollbar>
                                            </div>

                                            <div className="col-md-6 action-div">
                                                <div>
                                                    <PerfectScrollbar
                                                        options={{ suppressScrollX: true, wheelPropagation: false }}
                                                    >
                                                        <div className="card-body"><div className="card-title">Upload Files</div>

                                                            <>
                                                                <DropzoneComponent
                                                                    config={dropzoneComponentConfig}
                                                                    djsConfig={dropzoneConfig}
                                                                    eventHandlers={{
                                                                        init: (dropzone) => {
                                                                            this.myDropzone = dropzone;
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
                                                                        name="FileName"
                                                                        id="FileName"
                                                                        autoComplete={'off'}
                                                                        label="File Name "
                                                                        placeholder={"File Name"}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <Input
                                                                        name="FileName"
                                                                        id="FileName"
                                                                        autoComplete={'off'}
                                                                        label="File Desc "
                                                                        placeholder={"File Desc"}
                                                                    />
                                                                </div>
                                                            </>

                                                        </div>
                                                    </PerfectScrollbar>
                                                </div>
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