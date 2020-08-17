import React, { Component } from "react";
import axios from 'axios';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
class TopnavEasyAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus:[]
        }

    }
    componentWillMount() {
        console.log('mount',this.state.menus.length)
    }
    componentDidMount() {
        let _menus =[];
  
      var link =`http://148.72.206.209:93/api/Menu/CN`;
      axios.get(link)
              .then(res => {
                  if (res.data) {
                      console.log('result',)
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
    <div className="position-relative d-none d-sm-inline-block">

      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
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
    <a href="/app/landingpage" className="">
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
this.state.menus?.length > 0 && this.state.menus.map((data, index) =>

        <a href={data.url} className="min_fied">
        <div className="links_with_icon">
        <i className={"glyph-icon "+ data.Thumbnail}></i>
          <span>{data.DirName}</span>
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
