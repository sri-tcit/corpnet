
import React, { Component } from "react";
import * as Icon from 'react-bootstrap-icons';
import Switch from 'rc-switch';
import { Link,NavLink } from 'react-router-dom';
import 'rc-switch/assets/index.css';
import {
    Button
  } from 'reactstrap';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Pagination from '../views/Shared/pagination';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import { api } from '../views/Shared/baseurl-api';

class menuselection extends Component {
    constructor(props) {
        super(props);
        this.state = {
      baseurl:api,
      menus:[],
            sort: [{ field: "id", order: "desc" }],
            showLeftNav: false,
            Leftid:[],
            checkedShowLeftNav: [],
            checkedShowContNav: [],
            loader: false,
            checkedShowQuickNav: [],
            checkedShowBottomNav: []
    
        }
        this.onSort = this.onSort.bind(this)
        this.handleChangeQuick = this.handleChangeQuick.bind(this);
        this.handleChangeLeft = this.handleChangeLeft.bind(this);
        this.handleChangeCont = this.handleChangeCont.bind(this);
        this.handleChangeBottom = this.handleChangeBottom.bind(this);
        
    }
  handleChangeQuick(index)
  {
    if (!this.state.checkedShowQuickNav[index])
    {
      
      this.setState(prev => ({
        
        checkedShowQuickNav: prev.checkedShowQuickNav.map((val, i) => {
          if(val){
           if(i === index)
            val.ShowQuickLink = !val.ShowQuickLink  
          }
          return val;
        }),
      }))
    }
    else if (this.state.checkedShowQuickNav[index])
    {
      
      this.setState(prev => ({
        
        checkedShowQuickNav: prev.checkedShowQuickNav.map((val, i) => {
          if(val){
           if(i === index)
            val.ShowQuickLink = !val.ShowQuickLink  
          }
          return val;
        }),
      }))
    }
  }
  handleChangeLeft(index)
  {
    console.log('left',this.state.checkedShowLeftNav[index].ShowLeftNav)
    this.state.checkedShowLeftNav.map((data,i)=>{
      console.log('left',data,i)
    })
   
    console.log(this.state)
    if (!this.state.checkedShowLeftNav[index])
    {
      this.setState(prev => ({
        
        checkedShowLeftNav: prev.checkedShowLeftNav.map((val, i) => {
          if(val){
           if(i === index)
            val.ShowLeftNav = !val.ShowLeftNav  
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
             val.ShowLeftNav = !val.ShowLeftNav 
           }
          return val;
        }),
      }))
    }
    
     console.log('index',this.state.checkedShowLeftNav)
    
  }
  handleChangeCont(index)
  {
    if (!this.state.checkedShowContNav[index])
    {
      this.setState(prev => ({
        
        checkedShowContNav: prev.checkedShowContNav.map((val, i) => {
          if(val){
           if(i === index)
            val.ShowContNav = !val.ShowContNav  
          }
          return val;
        }),
      }))
    }
    else if (this.state.checkedShowContNav[index])
    {
      this.setState(prev => ({
        
        checkedShowContNav: prev.checkedShowContNav.map((val, i) => {
          if(val){
           if(i === index)
            val.ShowContNav = !val.ShowContNav  
          }
          return val;
        }),
      }))
    }
    console.log('index',this.state.checkedShowContNav)
  }
  handleChangeBottom(index)
  {
    if (!this.state.checkedShowBottomNav[index])
    {
      
      this.setState(prev => ({
        
        checkedShowBottomNav: prev.checkedShowBottomNav.map((val, i) => {
          if(val){
           if(i === index)
            val.ShowBottomNav = !val.ShowBottomNav  
          }
          return val;
        }),
      }))
    }
    else if (this.state.checkedShowBottomNav[index])
    {
      
      this.setState(prev => ({
        
        checkedShowBottomNav: prev.checkedShowBottomNav.map((val, i) => {
          if(val){
           if(i === index)
            val.ShowBottomNav = !val.ShowBottomNav  
          }
          return val;
        }),
      }))
    }
  }
    componentWillMount() {
    this.fecthData();
    }
    componentDidMount() {
        console.log('data')
       this.fecthData();
}
fecthData(){
    let _menus =[];
  
    let _checkedShowLeftNav = []
    let _checkedShowContNav = []
    let _checkedShowQuickNav = []
    let _checkedShowBottomNav = []
    var link =this.state.baseurl + `Menu/ALL`;
    axios.get(link)
            .then(res => {
                if (res.data) {
                    
                  res.data.map((data)=>{
                      _menus.push(data)
                      _checkedShowLeftNav.push({
                        "id":data.id,
                          "ShowLeftNav": data.ShowLeftNav
                  })
                  _checkedShowContNav.push({
                    "id":data.id,
                      "ShowContNav": data.ShowContNav
              })
              _checkedShowQuickNav.push({
                "id":data.id,
                  "ShowQuickLink": data.ShowQuickLink
          })
          _checkedShowBottomNav.push({
            "id":data.id,
              "ShowBottomNav": data.ShowBottomNav
      })
                      this.setState(prev => ({menus:_menus,
                        checkedShowLeftNav: _checkedShowLeftNav,
                        checkedShowContNav: _checkedShowContNav,
                        checkedShowQuickNav: _checkedShowQuickNav,
                        checkedShowBottomNav: _checkedShowBottomNav,
                      }
                      )
                      );
                      
                })
              }
            })
}
submitForm(){
  let id = 0;
  let ShowLeftNav='';
  let ShowContNav='';
  let ShowQuickLink='';
  let ShowBottomNav='';
  let data = [];
  let datas = [];
console.log('submit',this.state.checkedShowQuickNav)
let checkedShowLeftNavDetails = Object.assign({}, this.state.checkedShowLeftNav);
let checkedShowContNavDetails = Object.assign({}, this.state.checkedShowContNav);
let checkedShowBottomNavDetails = Object.assign({}, this.state.checkedShowBottomNav);
let checkedShowQuickNavDetails = Object.assign({}, this.state.checkedShowQuickNav);
        for (var i in checkedShowLeftNavDetails) {
          id = checkedShowLeftNavDetails[i].id
          ShowLeftNav=checkedShowLeftNavDetails[i].ShowLeftNav
        for (var j in checkedShowContNavDetails) {
          if(checkedShowLeftNavDetails[i].id == checkedShowContNavDetails[j].id)
          ShowContNav = checkedShowContNavDetails[j].ShowContNav
        }
          for (var k in checkedShowBottomNavDetails) {
            if(checkedShowLeftNavDetails[i].id == checkedShowBottomNavDetails[k].id)
            ShowBottomNav = checkedShowBottomNavDetails[k].ShowBottomNav;
          }  
          for (var x in checkedShowQuickNavDetails) {
            if(checkedShowLeftNavDetails[i].id == checkedShowQuickNavDetails[x].id)
            ShowQuickLink = checkedShowQuickNavDetails[x].ShowQuickLink;
          }  
          data = {
            "id": id,
            "showLeftNav":ShowLeftNav,
            "showContNav": ShowContNav,
            "showBottomNav": ShowBottomNav,
            "showQuickLink": ShowQuickLink,
            "createdBy":"Admin"
          }
          datas.push(data);
        }
    
    
    
    
    
    
      console.log('sampleid',datas);
        axios.put(this.state.baseurl + `Directory/UpdateNav`, datas)
          .then(res => {
            if (res) {
              this.setState((prev) => {});
            }
        })
       this.fecthData();
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
        this.fecthData();
    })
}
  render() {
  return (
  <>
   <div className="row">
                        <div className="card dashboard-progress"   style={{ width : '100%' }}>
                            <div className="card-body">
        <div className="table-caption">
          <div className="row">
            <div className="col-md-10">
            <h1>Manage Navigation</h1>
            </div>
            <div className="col-md-2">
            <NavLink to="/app/adminmenus">
            <div className="glyph-icon iconsminds-back back_home"> Back to Home</div>    </NavLink>
            </div>
          </div>
        </div>
        <table className="table table-border  table-striped admin_allign_center">
            <thead>
                <tr>
                    <th className="is-sort" onClick={e => this.onSort(e, 'DirName')}>Category Name
                    {this.state.sort[0].field == "DirName" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "DirName" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        } 
                    </th>
                    <th className="is-sort" onClick={e => this.onSort(e, 'ShowLeftNav')}>Left Navigation
                    {this.state.sort[0].field == "ShowLeftNav" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "ShowLeftNav" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        }</th>
                    <th className="is-sort" onClick={e => this.onSort(e, 'ShowContNav')}>Content Navigation
                    {this.state.sort[0].field == "ShowContNav" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "ShowContNav" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        }</th>
                    <th className="is-sort" onClick={e => this.onSort(e, 'ShowBottomNav')}>
                        Bottom Navigation {this.state.sort[0].field == "ShowBottomNav" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "ShowBottomNav" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        }</th>
                    <th className="is-sort" onClick={e => this.onSort(e, 'ShowQuickLink')}>
                        Quick Links {this.state.sort[0].field == "ShowQuickLink" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "ShowQuickLink" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        }</th>
                </tr>
            </thead>
            <tbody>
                {this.state.menus &&
                    this.state.menus.map((data, index) => {
                        return (<tr key={index}>
                            <td>{data.DirName}</td>
                            
                            <td> {
                                   <Switch
                                   id="tooltip_switch"
                                   className="custom-switch custom-switch-primary custom-switch-small"
                                   checked={this.state.checkedShowLeftNav[index].ShowLeftNav}
                                   onChange={ () => this.handleChangeLeft(index)}/>
                        }
                             </td>
                             
                             <td> {
                                   <Switch
                                   id="tooltip_switch"
                                   className="custom-switch custom-switch-primary custom-switch-small"
                                   checked={this.state.checkedShowContNav[index].ShowContNav}
                                   onChange={ () => this.handleChangeCont(index)}/>
                                 
                        }
                             </td> 
                             <td> {
                                   <Switch
                                   id="tooltip_switch"
                                   className="custom-switch custom-switch-primary custom-switch-small"
                                   checked={this.state.checkedShowBottomNav[index].ShowBottomNav}
                                   onChange={ () => this.handleChangeBottom(index)}/>
                                 
                        }
                             </td> 
                             <td> {
                                   <Switch
                                   id="tooltip_switch"
                                   className="custom-switch custom-switch-primary custom-switch-small"
                                   checked={this.state.checkedShowQuickNav[index].ShowQuickLink}
                                   onChange={ () => this.handleChangeQuick(index)}/>
                                 
                        }
                             </td>
                        </tr>
                        )
                    })
                }
                {
                    this.state.menus.length == 0 && !this.state.loader &&
                    <tr><td colSpan="5" className="text-center" >Loading</td></tr>
                }
                {
                    this.state.loader &&
                    <tr><td colSpan="5" className="text-center" >Loading</td></tr>
                }
            </tbody>
        </table>
        <Button  className="cta-contact" onClick={() => this.submitForm()}>Submit</Button>
   
    </div>
    <div className="col-md-12">
        <div className="float-right">
           </div>
    </div>
</div>
</div>
</> );
        
      };
  
};
export default menuselection;