

import React, { Component } from "react";
// import {"Icon"} from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';
// import { ArrowRight } from 'react-bootstrap-icons';
import Switch from 'rc-switch';
import { Link,NavLink } from 'react-router-dom';

import 'rc-switch/assets/index.css';
// import { Checkbox } from 'react-bootstrap/Checkbox';
import {
    Button
  } from 'reactstrap';
import axios from 'axios';
// import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Pagination from '../views/Shared/pagination';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import { api } from '../views/Shared/baseurl-api';

// (int) The current year

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
            checkedShowQuickNav: [],
            checkedShowBottomNav: []
    //   info: [],
        }
        this.onSort = this.onSort.bind(this)
        this.handleChangeQuick = this.handleChangeQuick.bind(this);
        this.handleChangeLeft = this.handleChangeLeft.bind(this);
        this.handleChangeCont = this.handleChangeCont.bind(this);
        this.handleChangeBottom = this.handleChangeBottom.bind(this);
        // this.updateInputsArray = this.updateInputsArray.bind(this);
    }
    // handleChange(rowIndex,checked){
    //     var array = this.state.array;
    //     array[rowIndex][isChecked] = !array[rowIndex][isChecked];
    //     this.setState({array: array});
    //  }
   updateInputsArray(index, newValue) {
     console.log('array',index,newValue)
      //copy the array first
     const updatedArray = [...this.state.checkedShowLeftNav];
     updatedArray[newValue] = index;
    //  this.setState(prev => ({
    //   checkedShowLeftNav: updatedArray,
    //   checkedShowLeftNav: prev.checkedShowQuickNav.map((val, i) => !val && i === index ? true : val),

    //   }));

    if (!this.state.checkedShowLeftNav[index])
    {
      this.setState(prev => ({
        // checkedShowLeftNav: updatedArray,
        checkedShowLeftNav: updatedArray.map((val, i) => !val && i === index ? true : val),
      }))
    }
    else if (this.state.checkedShowLeftNav[index])
    {
      this.setState( prev => ({
        // checkedShowLeftNav: updatedArray,
        checkedShowLeftNav: updatedArray.map((val, i) => val && i === index ? false : val),
      }))
    }
  }
  handleChangeQuick(index)
  {
    if (!this.state.checkedShowQuickNav[index])
    {
      
      this.setState(prev => ({
        // prev.checkedShowLeftNav;
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
        // prev.checkedShowLeftNav;
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
        // prev.checkedShowLeftNav;
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
    // this.state.checkedShowLeftNav.push(this.state.Leftid);
     console.log('index',this.state.checkedShowLeftNav)
    
  }
  handleChangeCont(index)
  {
    if (!this.state.checkedShowContNav[index])
    {
      this.setState(prev => ({
        // prev.checkedShowLeftNav;
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
        // prev.checkedShowLeftNav;
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
        // prev.checkedShowLeftNav;
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
        // prev.checkedShowLeftNav;
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
    //     let _checkedShowLeftNav = []
    //     let _checkedShowContNav = []
    //     let _checkedShowQuickNav = []
    //     let _checkedShowBottomNav = []
    //     var link =this.state.baseurl + `Menu/ALL`;
    // axios.get(link)
    //         .then(res => {
    //             if (res.data) {
    //                 //console.log('result',)

    //               res.data.map((data)=>{
    //                 _checkedShowLeftNav.push({
    //                   "id":data.id,
    //                     "ShowLeftNav": data.ShowLeftNav
    //             })
    //             _checkedShowContNav.push({
    //               "id":data.id,
    //                 "ShowContNav": data.ShowContNav
    //         })
    //         _checkedShowQuickNav.push({
    //           "id":data.id,
    //             "ShowQuickLink": data.ShowQuickLink
    //     })
    //     _checkedShowBottomNav.push({
    //       "id":data.id,
    //         "ShowBottomNav": data.ShowBottomNav
    // })
    //                       //  posShowLeftNav.push(data.id,data.ShowLeftNav);
    //                         // posShowContNav.push(data.id,data.ShowContNav);
    //                         // posShowQuickNav.push(data.id,data.ShowQuickLink);
    //                         // posShowBottomNav.push(data.id,data.ShowBottomNav);
    //             })

    //             this.setState({
    //                  checkedShowLeftNav: _checkedShowLeftNav,
    //                  checkedShowContNav: _checkedShowContNav,
    //                  checkedShowQuickNav: _checkedShowQuickNav,
    //                  checkedShowBottomNav: _checkedShowBottomNav
    //               })
    //           }
    //         })
    this.fecthData();

    }
    componentDidMount() {
        console.log('data')
       this.fecthData();
}
fecthData(){

//   this.setState(prevState => {
//     let data = Object.assign({}, prevState.data);
//     data = [];
//     let loading = true;
//     return { data, loading };
// })

// axios.get(`http://zenerapi.tcit.ae/api/order/getOrder?search=${this.state.search}&start=${(this.state.pageNo - 1) * this.state.pageLimit}&end=${(this.state.pageLimit)}&orderby=${this.state.sort[0].field}&order=${this.state.sort[0].order}`)
// .then(res => {
//     if (res.data.status) {
//         this.setState(prevState => {
//             let data = Object.assign({}, prevState.data);
//             data = res.data.data;
//             let loading = false;
//             return { data, loading };
//         })
//     }
// })
    let _menus =[];
  
    let _checkedShowLeftNav = []
    let _checkedShowContNav = []
    let _checkedShowQuickNav = []
    let _checkedShowBottomNav = []
    var link =this.state.baseurl + `Menu/ALL`;
    axios.get(link)
            .then(res => {
                if (res.data) {
                    //console.log('result',)

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
                      // return { menus, checkedShowLeftNav,checkedShowContNav,checkedShowQuickNav,checkedShowBottomNav}

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
    // let datas = {
    //     "checkedShowLeftNav": this.state.checkedShowLeftNav,
    //     "checkedShowContNav": this.state.checkedShowContNav,
    //     "checkedShowBottomNav": this.state.checkedShowBottomNav,
    //     "checkedShowQuickNav": this.state.checkedShowQuickNav
    //   }
      console.log('sampleid',datas);
        axios.put(this.state.baseurl + `Directory/UpdateNav`, datas)
          .then(res => {
            if (res) {
              this.setState((prev) => {});
            }
        })
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
//  TopnavNotifications = () => {
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
            <div class="glyph-icon iconsminds-back back_home"> Back to Home</div>    </NavLink>
            </div>

          </div>
            

            {/* <div className="row">
                <div className="col-md-4">
                    <input type="text" name="search" max="20" onChange={(event) => this.handleChange(event)} placeholder="Search" className="form-control" />
                    </div>
                <div className="col-md-1">
                <Icon.Search className="input-search" onClick={() => this.searchClick()} size={20} />
                </div>
                <div className="col-md-7">
                <Icon.PlusCircleFill className="input-search" onClick={() => this.showModalFn(true)} size={50} />
                 </div>
            </div> */}
        </div>
        <table className="table table-border  table-striped admin_allign_center">
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
                    {/* <th className="is-sort" onClick={e => this.onSort(e, 'EditForm')}>Edit
                    {this.state.sort[0].field == "EditForm" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "EditForm" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        }</th>
                        <th className="is-sort" onClick={e => this.onSort(e, 'DeleteForm')}>Delete
                    {this.state.sort[0].field == "DeleteForm" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "DeleteForm" && this.state.sort[0].order == "desc" &&
                            <Icon.ArrowDown />
                        }</th>
                         <th className="is-sort" onClick={e => this.onSort(e, 'PrintForm')}>Print
                    {this.state.sort[0].field == "PrintForm" && this.state.sort[0].order == "asc" &&
                            <Icon.ArrowUp />
                        }
                        {this.state.sort[0].field == "PrintForm" && this.state.sort[0].order == "desc" &&
                            <Icon.CheckAll />
                        }</th> */}
                    {/* <th>Action</th> */}
                </tr>
            </thead>
            <tbody>
                {this.state.menus &&
                    this.state.menus.map((data, index) => {
                        return (<tr key={index}>
                            {/* <td>{index + 1}</td>
                            <td>{data.id}</td> */}
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
                             {/* <td>{this.props.inputs.map((input, index) => <input type = "text" key={input}  placeholder='Enter something here' onChange={e => this.props.onChange(index, e.target.value)}/>)}</td> */}
                             <td> {
                                   <Switch
                                   id="tooltip_switch"
                                   className="custom-switch custom-switch-primary custom-switch-small"
                                   checked={this.state.checkedShowQuickNav[index].ShowQuickLink}
                                   onChange={ () => this.handleChangeQuick(index)}/>
                                 
                        }

                             </td>

                            {/* <td>{data.EditForm  &&
                            <Icon.CheckBox  size={30} />}</td>
                            <td>{data.DeleteForm  &&
                            <Icon.CheckBox  size={30} />}</td>
                            <td>{data.PrintForm  &&
                            <Icon.CheckBox  size={30} />}</td> */}
                            {/* <td className="action">
                                <span onClick={() => this.editData(data.id)}><Icon.Pencil size={20} /></span>
                            </td> */}
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
        <Button  className="cta-contact" onClick={() => this.submitForm()}>Submit</Button>
   
    </div>
    <div className="col-md-12">
        <div className="float-right">
            {/* <Pagination ref="pagination" currentPage={this.state.pageNo == 0 ? 1 : this.state.pageNo} handlePaginationAction={this.handlePagination} count={this.state.totalCount} perpage={this.state.pageLimit} /> */}
        </div>
    </div>
</div>
</div>
</> );
        
      };
  // }
};

export default menuselection;