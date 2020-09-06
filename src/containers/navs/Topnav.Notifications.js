import React, { Component } from "react";
import axios from 'axios';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Moment from 'moment';
import { api,mediaPath } from '../../views/Shared/baseurl-api';


class TopnavNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
      baseurl:api,
      docBaseUrl:mediaPath,
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
      
         _date =  " - " + hours + ":"+ minutes+" hours"
         return _date
         }
    componentWillMount() {
        
    }
    componentDidMount() {
        let _menus =[];
  
      var link =this.state.baseurl + `Document/GetNotification`;
      axios.get(link)
              .then(res => {
                  if (res.data) {
                      
                    res.data.map((data)=>{
                        _menus.push(data)
                        this.setState({menus:_menus});
                  })
                }
              })
}


  render() {
  return (
    
    
<>  
    <div className="position-relative d-inline-block">
       
       <UncontrolledDropdown className="dropdown-menu-right">
       
 <DropdownToggle
           className="header-icon notificationButton"
           color="empty" data-toggle="tooltip" title="Recent Uploaded"
         >
          <i className="simple-icon-bell"/>
  {/* <span className="count">{this.state.menus.length}</span> */}
           </DropdownToggle>
          
      <DropdownMenu
          className="position-absolute mt-3"
          right
           id="notificationDropdown"
        > 

<PerfectScrollbar
options={{ suppressScrollX: true, wheelPropagation: false  }}
>    
   {this.state.menus?.length > 0 && this.state.menus.map((data, index) =>
    <div key={data.id}  className="scroll ps ps--active-y">
                            <div className="d-flex flex-row mb-3 pb-3 border-bottom" key={data.id}>
                                <a href={`${this.state.docBaseUrl}${data.DocPath}`} target="_blank">
                                   <i className={"glyph-icon "+ data.Thumbnail}></i>
                                </a>
                                <div className="pl-3">
                                    <a href={`${this.state.docBaseUrl}${data.DocPath}`} target="_blank">
                                        <p className="font-weight-medium mb-1">{data.DocName}</p>
          <p className="text-muted mb-0 text-small">
   {Moment(data.ModifiedDate).format("ddd, MMM DD,yyyy")}{this.systemDateFormat(data.ModifiedDate)}</p>
                                    </a>
                                </div>
                            </div>
                        </div>
          )}
</PerfectScrollbar>
    
        </DropdownMenu>
  
    
</UncontrolledDropdown>

</div>
</> );
        
      };
  
};

export default TopnavNotifications;
