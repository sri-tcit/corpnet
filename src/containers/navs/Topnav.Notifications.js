import React, { Component,useState } from "react";
import axios from 'axios';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Moment from 'moment';
import { api,mediaPath } from '../../views/Shared/baseurl-api';

import DatePicker from 'react-datepicker';
// (int) The current year
class TopnavNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
      baseurl:api,docBaseUrl:mediaPath,
      menus:[]
        }
        
    }
   systemDateFormat(date){
      let   _date = new Date(date)
      let minutes = "",hours="";
      if(_date.getHours()<10){
        hours="0"+_date.getHours();
        }
      else{
        hours =_date.getHours();
      }
      if(_date.getMinutes()<10){
      minutes="0"+_date.getMinutes();
      }
      else{
        minutes = _date.getMinutes();
      }
      //console.log('minutes',_date.getMinutes())
         _date =  " - " + hours + ":"+ minutes+" hours"
         return _date
         }
    componentWillMount() {
        //console.log('mount',this.state.menus.length)
    }
    componentDidMount() {
        let _menus =[];
  
      var link =this.state.baseurl + `Document/GetNotification`;
      axios.get(link)
              .then(res => {
                  if (res.data) {
                      //console.log('result',)
                    res.data.map((data)=>{
                        _menus.push(data)
                        this.setState({menus:_menus});
                  })
                }
              })
}

//  TopnavNotifications = () => {
  render() {
  return (
    // <span>test</span>
    // <div className="dropdown-menu dropdown-menu-right mt-3  position-absolute " id="iconMenuDropdown">
<>  
    <div className="position-relative d-inline-block">
         {/* <i className="simple-icon-bell" /> */}
       
       <UncontrolledDropdown className="dropdown-menu-right">
       
 <DropdownToggle
           className="header-icon notificationButton"
           color="empty"
         >
          <i className="simple-icon-bell" />
  <span className="count">{this.state.menus.length}</span>
           </DropdownToggle>
          
          {/* <span className="count">3</span> */}

      <DropdownMenu
          className="position-absolute mt-3"
          right
           id="notificationDropdown"
        > 

<PerfectScrollbar
options={{ suppressScrollX: true, wheelPropagation: false  }}
>    
   {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>
    <div  className="scroll ps ps--active-y">
                            <div className="d-flex flex-row mb-3 pb-3 border-bottom" key={data.id}>
                                <a href={`${this.state.docBaseUrl}${data.DocPath}`} target="_blank">
                                   <i className={"glyph-icon "+ data.Thumbnail}></i>
                                </a>
                                <div className="pl-3">
                                    <a href={`${this.state.docBaseUrl}${data.DocPath}`} target="_blank">
                                        <p className="font-weight-medium mb-1">{data.DocName}</p>
          <p className="text-muted mb-0 text-small">
              {/* <DatePicker selected={startDate} dateFormat="MMMM eeee d,yyyy h:mm aa"></DatePicker> */}
   {Moment(data.ModifiedDate).format("ddd, MMM DD,yyyy")}{this.systemDateFormat(data.ModifiedDate)}</p>
                                    </a>
                                </div>
                            </div>
                            {/* <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                                <a href="#">
                                   <i className="glyph-icon iconsminds-library"></i>
                                </a>
                                <div className="pl-3">
                                    <a href="#">
                                        <p className="font-weight-medium mb-1">Foreign Trade Centre-Hong Kong</p>
                                        <p className="text-muted mb-0 text-small">09.04.2018 - 12:45</p>
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                                <a href="#">
                                    <i className="glyph-icon simple-icon-doc"></i>
                                </a>
                                <div className="pl-3">
                                    <a href="#">
                                        <p className="font-weight-medium mb-1">AML Due Diligence-Complaince-DDC-531</p>
                                        <p className="text-muted mb-0 text-small">09.04.2018 - 12:45</p>
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex flex-row mb-3 pb-3 ">
                                <a href="#">
                                    <i className="glyph-icon simple-icon-doc"></i>
                                </a>
                                <div className="pl-3">
                                    <a href="#">
                                        <p className="font-weight-medium mb-1">Enhance Due Diligence
                                        </p>
                                        <p className="text-muted mb-0 text-small">09.04.2018 - 12:45</p>
                                    </a>
                                </div>
                            </div> */}
                        </div>
          )}
</PerfectScrollbar>
    
        </DropdownMenu>
  
    
</UncontrolledDropdown>

</div>
</> );
        
      };
  // }
};

export default TopnavNotifications;
