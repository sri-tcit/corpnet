import axios from 'axios';
import React, { Component } from "react";
import { api } from './Shared/baseurl-api';
import { Link, NavLink } from 'react-router-dom';
import Parser from 'html-react-parser';
import * as Icon from 'react-bootstrap-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
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
const ReactDOMServer = require('react-dom/server');
class adminusers extends Component {
    constructor(props) {
        super(props);
        
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
       
     
        this.onSort = this.onSort.bind(this);
     
        this.handleChangeActive = this.handleChangeActive.bind(this);
        this.handleChangeLeft = this.handleChangeLeft.bind(this);
    
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
    
    
    }
    deleteUser(id) {
        axios.put(this.state.baseurl + `Admin/Delete?id=${id}`)
                .then(res => {
                      console.log('jane', res.data);
                                            
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
                            this.fetchUsers();
                        }
                  })
    }
    dontdeleteUser() { }
    DeleteUser(id) {
        confirmAlert({
            title: 'Are you to Delete this user?',
            message: '',
            buttons: [
                {
                    label: 'Yes',
                    style: 'color:orange',
                    onClick: () => this.deleteUser(id)
                },
                {
                    label: 'No',
                    onClick: () => this.dontdeleteUser()
                }
            ]
        });
    }
    handleChangeActive(index) {
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
                    this.DeleteUser(val.id);
                    
                }
               }
               return val;
    
            }),
          }))
        }
        
        console.log('index', this.state.checkedActive)
    }
    handleChangeSelect(e) {
        
        
        
        
        console.log("role", e.id)
        this.state.fk_RoleMaster_id = e.id;
        this.setState(prevState => {
            let userDetails = Object.assign({}, this.state.userDetails);
            
            userDetails["fk_RoleMaster_id"]._value = e.id;
            userDetails["fk_RoleMaster_id"].touched = true;
            this.state.userDetails.fk_RoleMaster_id._value = e.id;
            return userDetails;
        })
    }
    editData(id) {
        console.log('id', id);
        this.setState(state => {
            
            if (id) {
                
                
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
                            
                         
                          
                            this.fetchData();
                            window.scroll(0,0);
                            return { userDetails };
                            
                        })
                    })
                  
            }
        })
    }
    handleuserChange(e) {
        
        
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
                
                
                console.log('linkupdate', this.state.userid)
    
                
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
                              
                              
                              
                              
                              
                              
                                console.log('sampleid',datas);
                                  axios.post(this.state.baseurl + `Admin/AdminDirectory`, datas)
                                  
                                    .then(res => {
                                        console.log('results',res.data);
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
                                            
                                            
                                            window.location.assign('/app/adminusers');
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
                    })
                }  
           
            else if (this.state.userid === 0)
            {
            let postdata = {
                "ldapUser_id": this.state.userDetails.ldapUser_id._value,
                "fk_RoleMaster_id": this.state.userDetails.fk_RoleMaster_id._value,
                "createdBy": "Admin" 
            }
            
            
            console.log('link', postdata)
            
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
                          
                          
                          
                          
                          
                          
                            console.log('sampleid',datas);
                              axios.post(this.state.baseurl + `Admin/AdminDirectory`, datas)
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
                                        
                                        
                                        window.location.assign('/app/adminusers');
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
                })
            }  
        }
    }
    fetchData() {
        let _menus = [];
        let _checkedShowLeftNav = []
       
      
      var link = this.state.baseurl + `Admin/GetAdminDirectory?username=${this.state.userDetails.ldapUser_id._value}`;
        axios.get(link)
            .then(res => {
                if (res.data) {
                    console.log('result1', res.data)
                    res.data.map((data) => {
                        _menus.push(data)
                        _checkedShowLeftNav.push({
                            "id": data.ID,
                          "Selected": data.Selected 
                        })
                        this.setState(prev => ({
                            menus: _menus,
                            checkedShowLeftNav: _checkedShowLeftNav,
                             }
                        )
                        
                        );
                        console.log('result', this.state.checkedShowLeftNav)
                       
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
                        
                    })
                }
            })
    }
    getRoles() {
        var link = this.state.baseurl + `Roles/get/`;
        axios.get(link)
            .then(res => {
                if (res) {
                    
                    
                    
                    
                    for (let i in res.data) {
                        let data = res.data[i];
                        this.state.listRoles.push({
                            "id": res.data[i].id,
                            "value": res.data[i].id,
                            "label": res.data[i].roleName,
                            "key": i
                        })
                    }
                    
                    
                    
                }
            })
    }
    componentWillMount() {
        
    }
    componentDidMount() {
        
        
        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");
        if (role != "Super Admin")
        window.location.assign('/app/home');
        this.getRoles();
        this.fetchData();
        this.fetchUsers();
    }
    componentDidUpdate(prevProps) {
        
        
        
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
                                    <div className="col-md-2"><NavLink to="/app/adminmenus">
                                <div className="glyph-icon iconsminds-back back_home"> Back to Home</div>
                            </NavLink>
                            </div>
                                </div>
                                {/*this.state.userid*/}
                                {/* Content Stars here */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group has-top-label">
                                        <Label>User Name</Label>
                                            <Input
                                                name="ldapUser_id"
                                                id="ldapUser_id"
                                                onChange={this.handleuserChange}
                                                value={this.state.userDetails.ldapUser_id._value}
                                            />
                                           
                                        </div>
                                        {(this.state.submittet || this.state.userDetails.ldapUser_id.touched) && !this.state.userDetails.ldapUser_id._value && <span className="text-danger">{this.state.userDetails.ldapUser_id.errorMsg}</span>}
                                        <div className="form-group has-top-label">
                                        <Label>Select a Role</Label>
                                            <Select
                                                
                                                value={this.state.listRoles.find(item => item.value === this.state.fk_RoleMaster_id)}
                                                        
                                                   onChange={this.handleChangeSelect.bind(this)}
                                                options={this.state.listRoles}
                                                id="fk_RoleMaster_id"
                                                name="fk_RoleMaster_id"
                                                
                                                classNamePrefix="react-select"
                                            />
                                           
                                        </div>
                                        {(this.state.submittet || this.state.userDetails.fk_RoleMaster_id.touched) && !this.state.userDetails.fk_RoleMaster_id._value && <span className="text-danger">{this.state.userDetails.fk_RoleMaster_id.errorMsg}</span>}
                                     <div className="height_adjust_250">
                                        <PerfectScrollbar
                                    options={{  suppressScrollX: true, wheelPropagation: false }}
                                >
                                           <div >
                                        <table  className="table table-border  table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="is-sort">Category Name
                   
                                                    </th>
                                                    <th className="is-sort" >Access</th>
                                                </tr>
                                            </thead>
                                            <tbody class= "display: block; overflow: auto; table-layout: fixed; max-height: 250px;">
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
                                        </div></PerfectScrollbar></div>
                                        <div className="justify-center btn-n-r">
                                           
                                            <Button color="primary"
                                                onClick={() => this.addData()}
                                             
                                            >
                                                Submit 
                        </Button>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                               </div></div></div>
                                  
                <div className="row">
               
                    <div className="col-12">
                                    <div className="card dashboard-progress" style={{ width: '100%' }}>
                                   
<div className="card-body " >
<div className="col-md-10">
                                        <h2>Users list</h2>
                                    </div>
                                    <table className="table table-border table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="is-sort"> User Name
                   
                                                </th>
                                                <th className="is-sort">Role Name
                   
                                                </th>
                                                <th className="is-sort" >Edit
                    </th>
                                                <th className="is-sort" >Delete
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