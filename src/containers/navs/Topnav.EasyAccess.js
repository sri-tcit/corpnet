import React, { Component } from "react";
import axios from 'axios';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { api,mediaPath } from '../../views/Shared/baseurl-api';
import PerfectScrollbar from 'react-perfect-scrollbar';
class TopnavEasyAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docBaseUrl: mediaPath,
            baseurl:api,
      menus:[]
        }
    }
    componentWillMount() {
    }
    componentDidUpdate(){
    }
    componentDidMount() {
        this.fetchData();
}
  fetchData(){
    let _menus =[];
  
      var link =this.state.baseurl + `Favourite/admin`;
      axios.get(link)
              .then(res => {
                  if (res.data) {
                    res.data.map((data)=>{
                        _menus.push(data)
    console.log('test1',_menus)

                        this.setState({menus:_menus});
                  })
                }
              })

  }


  render() {
    return (
    
    <>
    <div className="position-relative d-none d-sm-inline-block" onClick={() => (this.fetchData())}>
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty"  data-toggle="tooltip" title="Favorite Links">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
    <PerfectScrollbar
options={{ suppressScrollX: true, wheelPropagation: false }}
> 
          <div className="al_line">
    <a href="/app/home" className="">
        <i className="iconsminds-left-1 d-block"></i>
        <span>Mashreq Intranet</span>
    </a>
        <div className="separator ">
        </div>
</div>
    <div className="al_line fav">
        <i className="simple-icon-star"></i>
        <span>Favorites</span>
    </div>
   
{
this.state.menus?.length > 0 && this.state.menus.map((data) =>
        data.DocDirType === '1' &&
        <a key={data.id} href={data.DocPath} target="_blank" className="min_fied">
        <div key={data.id} className="links_with_icon  row col-lg-12">
        <i className="simple-icon-star  col-lg-2"></i>
          <span  className="col-lg-10">{data.FavName}</span>
        </div>
        </a> 
    )}
{
this.state.menus?.length > 0 && this.state.menus.map((data) =>
        data.DocDirType === '2' &&
        <a key={data.id} href={`${this.state.docBaseUrl}${data.DocPath}`} target="_blank" className="min_fied">
        <div key={data.id} className="links_with_icon  row col-lg-12">
        <i className="simple-icon-star  col-lg-2"></i>
          <span  className="col-lg-10">{data.FavName}</span>
        </div>
        </a>
    )}
 </PerfectScrollbar>
         </DropdownMenu>
   
     
 </UncontrolledDropdown>
 
 </div>
 </> );
         
       };
   // }
 };
export default TopnavEasyAccess;
