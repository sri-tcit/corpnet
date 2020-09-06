import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import { Link, NavLink } from 'react-router-dom';
import Parser from 'html-react-parser';
import * as Icon from 'react-bootstrap-icons';
// import { ArrowRight } from 'react-bootstrap-icons';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
// import { Checkbox } from 'react-bootstrap/Checkbox';
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

import { RouteEditor } from 'react-yandex-maps';

class adminusers extends Component {
    constructor(props) {

        super(props);
        //console.log("generic", this.props)
        this.state = {
            baseurl: api,
            result: [],
            submittet: false,
            menus: [],
            users: [],
            listRoles: [],
            SelectRole: null,
            selectRoles: [],
            checkedShowLeftNav: [],
            showLeftNav: false,
            userid: 0,
            maintitle: '',
            fk_RoleMaster_id: 0,
            subtitle: '',
            sort: [{ field: "id", order: "desc" }],
            sort1: [{ field: "id", order: "desc" }],
            pagecontent: '',
            userDetails: {
                ldapUser_id: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },
                fk_RoleMaster_id: { _value: "", touched: false, required: true, error: "", errorMsg: "This field is required." },

            }
        }
        this.handleuserChange = this.handleuserChange.bind(this)
       
     //   this.getRoles = this.getRoles.bind(this);
        this.onSort = this.onSort.bind(this);
     //   this.editData = this.editData.bind(this);
        this.handleChangeActive = this.handleChangeActive.bind(this);
        this.handleChangeLeft = this.handleChangeLeft.bind(this);
    //    this.fetchData = this.fetchData.bind(this);
          this.handleChangeSelect = this.handleChangeSelect.bind(this);
          this.addData = this.addData.bind(this);
    }

    handleChangeLeft(index) {
        this.state.checkedShowLeftNav.map((data,i)=>{
            console.log('left',data,i)
          })
    if (!this.state.checkedShowLeftNav[index])
    {
      this.setState(prev => ({
        // prev.checkedShowLeftNav;
        checkedShowLeftNav: prev.checkedShowLeftNav.map((val, i) => {
          if(val){
           if(i === index)
            val.Selected = !val.Selected 
          }
          return val;
        }),
      }))
    }
    else if (this.state.checkedShowLeftNav[index])
    {
      this.setState( prev => ({
        checkedShowLeftNav: prev.checkedShowLeftNav.map((val, i) => {
          if(val){
            if(i === index)
             val.Selected = !val.Selected
           }
           console.log('index',val)
          return val;

        }),
      }))
    }
    // this.state.checkedShowLeftNav.push(this.state.Leftid);
    
    }

    handleChangeActive(index) {


     //   this.setState(prevState => {
     //       let user = Object.assign({}, this.state.users);
            
     //       user = user.map((data, i) => {
     //           console.log("janec", data.id)
     //           if (data[i].id === index) {
                    
     //               data[i].IsActive = !data[i].IsActive;
     //           }
     //       })
     //       return user;

     //   })

        console.log('jane',this.state.checkedActive[index])
        if (!this.state.checkedActive[index])
        {
          this.setState(prev => ({
    
            checkedActive: prev.checkedActive.map((val, i) => {
              if(val){
               if(i === index)
                val.IsActive = !val.IsActive
                
              }
              return val;
            }),
          }))
        }
        else if (this.state.checkedActive[index])
        {
          this.setState( prev => ({
            checkedActive: prev.checkedActive.map((val, i) => {
              if(val){
                if(i === index)
                {
                val.IsActive = !val.IsActive
                axios.put(this.state.baseurl + `Admin/Delete?id=${val.id}`)
                .then(res => {
                      console.log('jane', res.data);
                      if (res) {
                        this.fetchUsers();
                        console.log(res.data);
                     //  this.props.action();
                    //   val.IsActive = !val.IsActive
               }
                  })
                
                }
               }
               return val;
    
            }),
          }))
        }
        //this.fetchUsers();
        console.log('index', this.state.checkedActive)

    }
    handleChangeSelect(e) {
        ////    this.setState({ selectRoles: e.target.value });
        // let {  value } = e.target;
        //console.log(name,value)
        //this.state.userDetails.ldapUser_id._value =e.value;
        console.log("role", e.id)
        this.state.fk_RoleMaster_id = e.id;
        this.setState(prevState => {
            let userDetails = Object.assign({}, this.state.userDetails);
            //     userDetails[name]._value = value;
            userDetails["fk_RoleMaster_id"]._value = e.id;
            userDetails["fk_RoleMaster_id"].touched = true;
            this.state.userDetails.fk_RoleMaster_id._value = e.id;
            return userDetails;
        })
    }

    editData(id) {
        console.log('id', id);
        this.setState(state => {
            // selectPage: e.id;

            if (id) {
                //  this.setState({ pageid: pageid });
                // this.state.pageid = pageid;
                var link = this.state.baseurl + `Admin/GetAdminUsers?id=${id}`;
                console.log("link", link);
                axios.get(link)
                    .then(res => {
                        let data = res.data[0];

                        this.state.userid = data.id;
                        this.setState(prevState => {
                            let userDetails = Object.assign({}, this.state.userDetails)

                            userDetails["ldapUser_id"]._value = data.LDAPUser_id
                            userDetails["fk_RoleMaster_id"]._value = data.fk_RoleMaster_id
                            this.state.fk_RoleMaster_id= data.fk_RoleMaster_id
                            userDetails["fk_RoleMaster_id"].touched = true;
                            console.log('mountdata', data);
                            // pageDetails['pageid']._value = pageid;
                         //   this.handleChangeSelect = this.handleChangeSelect.bind(this);
                          //  this.fetchData = this.fetchData.bind(this);
                            this.fetchData();
                            return { userDetails };
                        })
                    })
                  
            }
        })
    }


    handleuserChange(e) {
        // this.setState({maintitle: e.target.value});
        // console.log("maintitle", this.state.maintitle);
        let { name, value } = e.target;
        this.setState(prevState => {
            let userDetails = Object.assign({}, this.state.userDetails);
            userDetails[name]._value = value;
            userDetails[name].touched = true;
            return userDetails;
        })
    }
    resetValues()
    {
        
            this.state.userid = 0;
            
            this.state.userDetails.ldapUser_id.touched = false;
            this.state.userDetails.ldapUser_id._value = "";
            this.state.fk_RoleMaster_id = "";
            this.state.userDetails.fk_RoleMaster_id._value = "";
        
          //  this.handleChangeSelect = this.handleChangeSelect.bind(this);
            this.fetchData();
            this.fetchUsers();
    }
    handleValidations() {
        
        let error = false;
       
        let order = this.state.userDetails;
        for (var i in order) {
            if (order[i].required && !order[i]._value) {
                console.log('error', order[i].required, !order[i]._value)
                error = true;
            }
            if (error)
                return error;



            ///      if (!this.checkDuplicate(error)) {
            // console.log('test3');
            // error = false;
            //    }
            //     else {
            // console.log('test4');
            //  error = true;
            //     }
        }
        return error;

    }
    addData ()
        {
           
            this.setState({
            submittet: true
        })
        this.state.submittet = true;
            if (this.handleValidations())
            return;
        

        
console.log("carol",this.state.submittet)
        if (this.state.submittet) {
            let _result = [];
            console.log("user", this.state.userid)
            if (this.state.userid !== 0)
            {
                let postdata = {
                    "ldapUser_id": this.state.userDetails.ldapUser_id._value,
                    "fk_RoleMaster_id": this.state.userDetails.fk_RoleMaster_id._value,
                    "createdBy": "Admin" 
                }
                // console.log('loadData', id)
                //    var link = this.state.baseurl + `Generic/Update/${id}` ;
                console.log('linkupdate', this.state.userid)
    
                //  axios.post(this.state.baseurl + `Generic/Update/${id}`,postdata)
                axios.put(this.state.baseurl + `Admin/Update?id=${this.state.userid}`, postdata)
                    .then(res => {
                        console.log('sampleid',res);
                        if (res) {
                            
                            let id = 0;
                            let Selected='';
                           
                            let data1 = [];
                            let datas = [];
                            console.log('sampleid', "jane", this.state.checkedShowLeftNav );
                          let checkedShowLeftNavDetails = Object.assign({}, this.state.checkedShowLeftNav);
                          console.log('sampleid',checkedShowLeftNavDetails );
                                  for (var i in checkedShowLeftNavDetails) {
                                    id = checkedShowLeftNavDetails[i].id
                                    Selected=checkedShowLeftNavDetails[i].Selected
                                  
                                    data1 = {
                                      "fk_Directory_id": id,
                                      "isActive":Selected,
                                      "ldapUser_id": this.state.userDetails.ldapUser_id._value,
                                      "createdBy":"Admin"
                                    }
                                    datas.push(data1);
                                  }
                              // let datas = {
                              //     "checkedShowLeftNav": this.state.checkedShowLeftNav,
                              //     "checkedShowContNav": this.state.checkedShowContNav,
                              //     "checkedShowBottomNav": this.state.checkedShowBottomNav,
                              //     "checkedShowQuickNav": this.state.checkedShowQuickNav
                              //   }
                                console.log('sampleid',datas);
                                  axios.post(this.state.baseurl + `Admin/AdminDirectory`, datas)
                                  
                                    .then(res => {
                                        console.log('results',res.data);
                                      if (res) {
                                          
                                       // this.setState((prev) => {});
                                        console.log('results',"DSfsdf");
                                        this.fetchUsers();
                                        this.resetValues();
                                      }
                                  })
    
                           
                            
                        }
                    })
                }  
           
            else if (this.state.userid === 0)
            {
            let postdata = {
                "ldapUser_id": this.state.userDetails.ldapUser_id._value,
                "fk_RoleMaster_id": this.state.userDetails.fk_RoleMaster_id._value,
                "createdBy": "Admin" 
            }
            // console.log('loadData', id)
            //    var link = this.state.baseurl + `Generic/Update/${id}` ;
            console.log('link', postdata)

            //  axios.post(this.state.baseurl + `Generic/Update/${id}`,postdata)
            axios.post(this.state.baseurl + `Admin/Add/`, postdata)
                .then(res => {
                   
                    if (res) {
                        
                        let id = 0;
                        let Selected='';
                       
                        let data1 = [];
                        let datas = [];
                        console.log('sampleid', "jane", this.state.checkedShowLeftNav );
                      let checkedShowLeftNavDetails = Object.assign({}, this.state.checkedShowLeftNav);
                      console.log('sampleid',checkedShowLeftNavDetails );
                              for (var i in checkedShowLeftNavDetails) {
                                id = checkedShowLeftNavDetails[i].id
                                Selected=checkedShowLeftNavDetails[i].Selected
                              
                                data1 = {
                                  "fk_Directory_id": id,
                                  "isActive":Selected,
                                  "ldapUser_id": this.state.userDetails.ldapUser_id._value,
                                  "createdBy":"Admin"
                                }
                                datas.push(data1);
                              }
                          // let datas = {
                          //     "checkedShowLeftNav": this.state.checkedShowLeftNav,
                          //     "checkedShowContNav": this.state.checkedShowContNav,
                          //     "checkedShowBottomNav": this.state.checkedShowBottomNav,
                          //     "checkedShowQuickNav": this.state.checkedShowQuickNav
                          //   }
                            console.log('sampleid',datas);
                              axios.post(this.state.baseurl + `Admin/AdminDirectory`, datas)
                                .then(res => {
                                //  if (res) {
                                    console.log('results',res);
                                    this.fetchUsers();
                                    this.resetValues();
                                //  }
                              })
                    }
                })
            }  
        }
    }
    fetchData() {


        let _menus = [];

        let _checkedShowLeftNav = []
       
      //  var link = this.state.baseurl + `Menu/All`;
      var link = this.state.baseurl + `Admin/GetAdminDirectory?username=${this.state.userDetails.ldapUser_id._value}`;
        axios.get(link)
            .then(res => {
                if (res.data) {
                    console.log('result1', res.data)

                    res.data.map((data) => {
                        _menus.push(data)
                        _checkedShowLeftNav.push({
                            "id": data.ID,
                          "Selected": data.Selected // == 0 ? false : true
                        })

                        this.setState(prev => ({
                            menus: _menus,
                            checkedShowLeftNav: _checkedShowLeftNav,
                             }

                        )
                        
                        );
                        console.log('result', this.state.checkedShowLeftNav)
                       // return { menus, checkedShowLeftNav}

                    })
                }
            })
    }
    fetchUsers() {

        let _users = [];

        let _checkedActive = []

        var link = this.state.baseurl + `Admin/GetAdminUsers`;
        axios.get(link)
            .then(res => {
                if (res.data) {
                    //console.log('result',)

                    res.data.map((data) => {
                        _users.push(data)
                        _checkedActive.push({
                            "id": data.id,
                            "LDAPUser_id": data.LDAPUser_id,
                            "IsActive": data.IsActive
                        })

                        this.setState(prev => ({
                            users: _users,
                            checkedActive: _checkedActive,
                        }
                        )
                        );
                        // return { menus, checkedShowLeftNav,checkedShowContNav,checkedShowQuickNav,checkedShowBottomNav}

                    })
                }
            })
    }
    getRoles() {
        var link = this.state.baseurl + `Roles/get/`;
        axios.get(link)
            .then(res => {

                if (res) {
                    //   this.setState(prevState => {
                    //      let listRoles = Object.assign({}, this.state.listRoles);
                    //      listRoles = res.data;
                    //     return { listRoles }
                    for (let i in res.data) {
                        let data = res.data[i];

                        this.state.listRoles.push({
                            "id": res.data[i].id,
                            "value": res.data[i].id,
                            "label": res.data[i].roleName,
                            "key": i
                        })
                    }
                    //    const listRoles = res.data;
                    //   this.setState({ listRoles });
                    //   console.log('sdd', this.state.listRoles);

                }
            })
    }
    componentWillMount() {
        //console.log('mount', this.state.result[0])
    }
    componentDidMount() {
        //console.log('prop', this.props.location.state.id)
        // this.loadData(this.props.location.state.id);
        this.getRoles();
        this.fetchData();
        this.fetchUsers();
    }

    componentDidUpdate(prevProps) {
        // if (this.props.location.pathname !== prevProps.location.pathname) {
        //     this.loadData(this.props.location.state.id);
        // }
    }
   
    onSort(event, sortKey) {
        console.log('onSort');
        this.setState(prevState => {
            let sort = Object.assign({}, this.state.sort);
            let order = prevState.sort[0].field == sortKey ? prevState.sort[0].order == "asc" ? "desc" : "asc" : "asc";
            let field = sortKey;
            sort[0] = { field: field, order: order };
            return { sort };
        }, () => {
            this.fetchData();
        })
    }
    
    onSort1(event, sortKey) {
        console.log('onSort');
        this.setState(prevState => {
            let sort = Object.assign({}, this.state.sort);
            let order = prevState.sort[0].field == sortKey ? prevState.sort[0].order == "asc" ? "desc" : "asc" : "asc";
            let field = sortKey;
            sort[0] = { field: field, order: order };
            return { sort };
        }, () => {
            this.fetchUsers();
        })
    }
    render() {

        let optionItems = this.state.listRoles// && this.state.listRoles.map((data, index) => 
        // [{id: data.id, maintitle: data.maintitle}] );
        //   const defaultOption = options[0];
        //    const {listRoles}  = this.state;
        // set value for default selection


       
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card dashboard-progress" style={{ width: '100%' }}>

                            <div className="card-body" >

                                <div className="row">
                                    <div className="col-md-10">
                                        <h1>Manage Users</h1>
                                    </div>
                                    <div className="col-md-2">

                                        <NavLink to="/app/adminmenus">
                                            <h4>Back to Home</h4>      </NavLink>
                                    </div>

                                </div>
                                {/*this.state.userid*/}
                                {/* Content Stars here */}
                                <div className="row">
                                    <div className="col-12">

                                        <div className="form-group">
                                            <Input
                                                name="ldapUser_id"
                                                id="ldapUser_id"
                                                placeholder={"User Name"}
                                                onChange={this.handleuserChange}
                                                value={this.state.userDetails.ldapUser_id._value}

                                            />
                                            {(this.state.submittet || this.state.userDetails.ldapUser_id.touched) && !this.state.userDetails.ldapUser_id._value && <span className="text-danger">{this.state.userDetails.ldapUser_id.errorMsg}</span>}
                                        </div>

                                        <div className="form-group">
                                            <Select
                                                //value={this.state.userDetails.fk_RoleMaster_id._value}
                                                value={this.state.listRoles.find(item => item.value === this.state.fk_RoleMaster_id)}
                                                        // onChange={(event) => this.handleChangeSelect(event)}
                                                   onChange={this.handleChangeSelect.bind(this)}
                                                options={this.state.listRoles}
                                                id="fk_RoleMaster_id"
                                                name="fk_RoleMaster_id"
                                                //    className="react-select"
                                                placeholder="Select a Role"
                                                classNamePrefix="react-select"
                                            />
                                            {(this.state.submittet || this.state.userDetails.fk_RoleMaster_id.touched) && !this.state.userDetails.fk_RoleMaster_id._value && <span className="text-danger">{this.state.userDetails.fk_RoleMaster_id.errorMsg}</span>}

                                        </div>
                                        
                                        <table className="table table-border  table-striped">
                                            <thead>
                                                <tr>
                                                    {/* <th>S.No </th>
                    <th className="is-sort" onClick={e => this.onSort(e, 'id')}> ID
                    {this.state.sort[0].field == "id" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "id" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        } 
                    </th> */}
                                                    <th className="is-sort" onClick={e => this.onSort(e, 'DirName')}>Category Name
                    {this.state.sort[0].field == "DirName" && this.state.sort[0].order == "asc" &&
                                                            <Icon.ArrowUp />
                                                        }
                                                        {this.state.sort[0].field == "DirName" && this.state.sort[0].order == "desc" &&
                                                            <Icon.ArrowDown />
                                                        }
                                                    </th>
                                                    <th className="is-sort" >Access</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.menus &&
                                                    this.state.menus.map((data, index) => {
                                                        return (<tr key={index}>
                                                            
                                                            <td>{data.DirName}</td>

                                                            <td>{
                                                                
                                                                <Switch
                                                                    id="tooltip_switch"
                                                                    className="custom-switch custom-switch-primary custom-switch-small"
                                                                    checked={this.state.checkedShowLeftNav[index].Selected}
                                                                    onChange={ () => this.handleChangeLeft(index)}/>
                                                                    
                                                            }

                                                            </td>


                                                        </tr>
                                                        )
                                                    })
                                                }

                                                {
                                                    this.state.menus.length == 0 && !this.state.loading &&
                                                    <tr><td colSpan="5" className="text-center" >No Result Found</td></tr>
                                                }

                                                {
                                                    this.state.loading &&
                                                    <tr><td colSpan="5" className="text-center" >Loading</td></tr>
                                                }
                                            </tbody>
                                        </table>

                                        <div className="form-group">
                                           
                                            <Button color="secondary"
                                                onClick={() => this.addData()}
                                             
                                            >
                                                Add 
                        </Button>
                        <Button value="Send"
                                                color="secondary"
                                                onClick={() => this.resetValues()}
                                             
                                            >
                                                Reset 
                        </Button>
                                        </div>

                                    </div>
                                    </div>
                                    </div>
                               </div></div></div>
                                  
                <div className="row">
                    <div className="col-12">
                                    <div className="card dashboard-progress" style={{ width: '100%' }}>

<div className="card-body" >
                                    <table className="table table-border  table-striped">
                                        <thead>
                                            <tr>
                                                <th className="is-sort"> User Name
                   
                                                </th>
                                                <th className="is-sort">Role Name
                   
                                                </th>
                                                <th className="is-sort" >Edit
                    </th>
                                                <th className="is-sort" >Disable
                   </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.users &&
                                                this.state.users.map((data, index) => {
                                                    return (<tr key={index}>
                                                       
                                                        <td>{data.LDAPUser_id}</td>
                                                        <td>{data.RoleName}</td>
                                                        <td className="action">
                                                            <span onClick={() => this.editData(data.id)}><Icon.Pencil size={20} /></span>
                                                            {/* <span onClick={() => this.deleteData(data.savedformID)}> <Icon.Trash size={20} /></span> */}
                                                        </td>
                                                        <td> {
                                                            <>
                                                                
                                                                <Switch
                                                                    id="tooltip_switch"
                                                                    className="custom-switch custom-switch-primary custom-switch-small"
                                                                    checked={this.state.checkedActive[index].IsActive}
                                                                    onChange={() => this.handleChangeActive(index)} />
                                                            </>
                                                        }

                                                        </td>


                                                    </tr>
                                                    )
                                                })
                                            }

                                            {
                                                this.state.users.length == 0 && !this.state.loading &&
                                                <tr><td colSpan="5" className="text-center" >No Result Found</td></tr>
                                            }

                                            {
                                                this.state.loading &&
                                                <tr><td colSpan="5" className="text-center" >Loading</td></tr>
                                            }
                                        </tbody>
                                    </table>

                                </div>


                            </div></div>
                    </div>
               
            </>
        );
    };
}
adminusers.propTypes = {}
export default adminusers;