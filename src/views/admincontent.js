import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import { Link,NavLink } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser'; 
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
    Dropdown,
} from 'reactstrap';
import Select from 'react-select';
//import ReactQuill, { Quill } from 'react-quill';

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6
import { RouteEditor } from 'react-yandex-maps';
class admincontent extends Component {
    constructor(props) {
        
        super(props);
        //console.log("generic", this.props)
        this.state = {
      baseurl:api,
      submittet: false,
      result: [],
      listPages: [],
      SelectPage: null,
      selectPage: [],
      pageid: '',
      maintitle: '',
      subtitle:'',
      pagecontent: '',
        pageDetails: {
           pageid:{_value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
        maintitle: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
        subtitle: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
        pagecontent: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
        selectPage: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." }, }
        }
        this.handletitleChange = this.handletitleChange.bind(this)
        this.handlecontentChange = this.handlecontentChange.bind(this)
        this.updateData = this.updateData.bind(this);
        this.getPages = this.getPages.bind(this);
    //    this.handleChange = this.handleChange.bind(this);
      //  this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }
    handleChangeSelect(e) { 
    ////    this.setState({ selectPage: e.target.value });
        this.setState(state => {
           // selectPage: e.id;
        var pageid = e.id;
       
        console.log('ddd',pageid)
        if (pageid) {
            this.setState({pageid: pageid});
           // this.state.pageid = pageid;
            var link = this.state.baseurl + `Generic/page/${pageid}`;
            axios.get(link)
                .then(res => {
                    let data = res.data[0];
                    console.log('mountdata',data,res.data);
                      this.setState(prevState => {
                          let pageDetails = Object.assign({}, this.state.pageDetails)
                          for (let key of Object.keys(pageDetails)) {
                            console.log('key',data[key]);
                              pageDetails[key]._value = data[key];
                              this.state.pageDetails.selectPage._value =data.maintitle;
                               }
                          pageDetails['pageid']._value = pageid;
                          return { pageDetails };
                      })
               
              
    });
      }
    })
}

onChange = (name, value) => {
    console.log('name',name,value)
   // this.setState({[name]: value});
  }

  handletitleChange(e){
   // this.setState({maintitle: e.target.value});
   // console.log("maintitle", this.state.maintitle);
    let { name, value } = e.target;
    this.setState(prevState => {
        let pageDetails = Object.assign({}, this.state.pageDetails);
        pageDetails[name]._value =value;
        pageDetails[name].touched = true;
        return pageDetails;
    })
    }
    handlecontentChange(e){
        // this.setState({maintitle: e.target.value});
        // console.log("maintitle", this.state.maintitle);
        // let { value } = e.target;
         this.setState(prevState => {
             let pageDetails = Object.assign({}, this.state.pageDetails);
             pageDetails['pagecontent']._value =e;
             pageDetails['pagecontent'].touched = true;
             return pageDetails;
         })
         }

    getPages()
    {
        var link = this.state.baseurl + `Generic/GetGenericPage/` ;
        axios.get(link)
        .then(res => {
          console.log('getPages',res.data);
            if (res) {
             //   this.setState(prevState => {
              //      let listPages = Object.assign({}, this.state.listPages);
              //      listPages = res.data;
               //     return { listPages }
               for (let i in res.data){
                let data = res.data[i];
           
                 this.state.listPages.push({
                    "id": res.data[i].id,
                    "label": res.data[i].maintitle,
                    "key": i
                })
            }
           //    const listPages = res.data;
             //   this.setState({ listPages });
             //   console.log('sdd', this.state.listPages);
               
            }
        })
    }
    componentWillMount() {
        //console.log('mount', this.state.result[0])
    }
    componentDidMount() {
        //console.log('prop', this.props.location.state.id)
        // this.loadData(this.props.location.state.id);
        this.getPages();
    }
    updateData() {

  this.setState({
    submittet: true
})
    if(this.state.submittet){
        let _result = [];
       // this.state._result.push({
        //   console.log("jane", this.state.pageDetails.maintitle)
     //   const {selectPage, maintitle, subtitle, pagecontent } = this.state;
       var id = this.state.pageDetails.pageid._value
    // var id = this.state
        let postdata= {
           //   "id": this.state.selectPage,
         //  "id": this.state.pageDetails.pageid._value,
            "maintitle": this.state.pageDetails.maintitle._value,
            "subtitle": this.state.pageDetails.subtitle._value,
            "pagecontent": this.state.pageDetails.pagecontent._value,
            "createdBy": "Admin"
          }
       // console.log('loadData', id)
        var link = this.state.baseurl + `Generic/Update/${id}` ;
        console.log('link', postdata)
        
      //  axios.post(this.state.baseurl + `Generic/Update/${id}`,postdata)
      axios.put(this.state.baseurl + `Generic/Update?id=${id}`,postdata)
            .then(res => {
              //  console.log('jane', res.data);
                if (res.data) {
                    
                    console.log(res.data);
                    this.props.action();
                 //    this.getPages();
                }
                  })
    }}
    componentDidUpdate(prevProps) {
        // if (this.props.location.pathname !== prevProps.location.pathname) {
        //     this.loadData(this.props.location.state.id);
        // }
    }
    
    render() {
       
    let optionItems =  this.state.listPages// && this.state.listPages.map((data, index) => 
       // [{id: data.id, maintitle: data.maintitle}] );
       //   const defaultOption = options[0];
      //    const {listPages}  = this.state;
             // set value for default selection
             const ReactQuill = require('react-quill'); // CommonJS
             const {Quill, Mixin, Toolbar} = ReactQuill;
              
        const SelectPage = [];
        let selectData = this.state.listPages && this.state.listPages.map((data, index) => [
            { label: data.maintitle, value: data.id, key: index },
            
        ]);
        const options = [
            'one', 'two', 'three'
          ];
          const defaultOption = options[0];
        return (
            <>
                    <div className="row">
                    <div className="col-12">
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

                {/* Content Stars here */}
                <div className="row">
                    <div className="col-12">

                    <div className="form-group">
                    <Select           
                    value={this.state.listPages.find(item => item.value === this.state.SelectPage)}
                                                            //value={this.state.SelectPage} 
                                       onChange={this.handleChangeSelect.bind(this)}
                                       options={this.state.listPages}
                                       id="selectPage"
                                       name="selectPage"
                                       className="react-select"
                                       placeholder = "Select a page"
                                       classNamePrefix="react-select" 
                                       />
                    {(this.state.submittet || this.state.pageDetails.selectPage.touched) && !this.state.pageDetails.selectPage._value && <span className="text-danger">{this.state.pageDetails.selectPage.errorMsg}</span>}

               {/*    <select 
                                       id="selectPage"
                                       className="react-select"
                                       placeholder = "Select a page"
                                       classNamePrefix="react-select"    
                                       value={this.state.selectPage} onChange={this.handleChange}
                                   //    value = {this.state.listPages.           
                                   //    value={this.state.listPages.find(item => item.value === this.state.SelectPage)}
                                                          
                                                        >
                    <option  value="">Select a Page</option>
                            {
                                this.state.listPages && this.state.listPages.map((data, index) => {
                                    return (<option key={data.id} value={data.id}>{data.maintitle}</option>)
                                })
                            }
                        </select>*/}
                    </div> 
               
                    <div className="form-group">
                        <Input
                            name="maintitle"
                            id="maintitle"
                            placeholder={"Page Title"}
                           // onChange ={ this.handleChange}
                             onChange={this.handletitleChange}
                            value={this.state.pageDetails.maintitle._value}
                        
                        />
                         {(this.state.submittet || this.state.pageDetails.maintitle.touched) && !this.state.pageDetails.maintitle._value && <span className="text-danger">{this.state.pageDetails.maintitle.errorMsg}</span>}

                        <Select
                            id="selectPage"
                            className="react-select"
                            placeholder = "Select a page"
                            classNamePrefix="react-select"
                        />
                    </div>
                   

                    <div className="form-group">
                        <Input
                            name="title"
                            id="title"
                            placeholder={"Page Title"}
                        />
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
                         //    onChange={(event) => this.handleChange(event)}
                            id="pagecontent"
                            placeholder={"Page Content Here"}
                            onChange={this.handlecontentChange}
                            value={this.state.pageDetails.pagecontent._value}
                    />
                        {(this.state.submittet || this.state.pageDetails.pagecontent.touched) && !this.state.pageDetails.pagecontent._value && <span className="text-danger">{this.state.pageDetails.pagecontent.errorMsg}</span>}  

                        />
                    </div>
                    <div className="form-group">
                    
                    <Input
                            name="contentEditor"
                            id="contentEditor"
                            placeholder={"Page Content (Editor - https://gogo-react.coloredstrategies.com/app/ui/components/editors)"}
                        />
                        
                       
                    </div>
                    
                    <div className="form-group">
                    <Button value="Send"
                            color="secondary"

                            onClick={this.updateData}

                            onClick={this.Submit}

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