
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from '../../redux/actions';

import {
  menuHiddenBreakpoint,
  searchPath,
  adminRoot,
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';
import { getDirection, setDirection } from '../../helpers/Utils';
import { api,mediaPath } from '../../views/Shared/baseurl-api';
import {Baseurl} from '../../constants/defaultValues';

const TopNav = ({
  

  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  changeLocaleAction,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setsearchResult] = useState([]);
  const [showSearchResult, setshowSearchResult] = useState(false);

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const handleChangeLocale = (_locale, direction) => {
    changeLocaleAction(_locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        search();
        elem.classList.remove('mobile-view');
        removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        addEventsSearch();
      }
    } else {
      search();
    }
    e.stopPropagation();
  };

  const showDocType = (DocType) => {
    if (DocType != null && (DocType === "pdf" || DocType === "txt" || DocType === "doc" || DocType === "docx" || DocType === "xls" || DocType === "xlsx" || DocType === "pptx" || DocType === "ppt" || DocType === "jpg" || DocType === "png"  || DocType === "zip" || DocType === "bmp")) 
   {return(true)
  
  }
  else
  {
      return(false)
         
  }
};
  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;

    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const addEventsSearch = () => {

    document.addEventListener('click', handleDocumentClickSearch, true);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    history.push(`${adminRoot}/adminmenus`);

    // history.push(`${adminRoot}/categoryAdmin');
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  const { messages } = intl;

  /* Search Function */
  const fetchSearchResult = (query) => {
    if (query) {
      var link = api + `Document/search/${query}`;
      axios.get(link)
        .then(res => {
          if (res.status == 200) {
            if (res.data.length > 0) {
              setshowSearchResult(true);
            }
            setsearchResult(res.data)
          }
        })
    }
  };

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains("search-item") && !e.target.classList.contains("form-control") && !e.target.classList.contains("scrollbar-container")) {
     setshowSearchResult(false)
    }
  }, true);

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>
        <UncontrolledDropdown>
          <div className="search">
            <Input
            autoComplete = {'off'}
              name="searchKeyword"
              id="searchKeyword"
              placeholder={messages['menu.search']}
              value={searchKeyword}
              onChange={(e) => { setSearchKeyword(e.target.value); fetchSearchResult(e.target.value) }}
              onKeyPress={(e) => handleSearchInputKeyPress(e)}

            />
            <span
              className="search-icon"
              onClick={(e) => handleSearchIconClick(e)}
            >
              <i className="simple-icon-magnifier" />
            </span>
            {/* top: "24px", left: "0px",  */}
            {showSearchResult &&
              <div role="menu" id="iconMenuDropdown" aria-hidden="false" className="position-absolute mt-3 dropdown-menu dropdown-menu-right show" x-placement="bottom-end" style={{ position: "absolute", willChange: "transform", width: "100%",  overflowY: 'auto' }}>
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  {searchResult.map((data, index) => {
                     return <div className="row"><div className="col-2">
                     {showDocType(data.DocType) &&
                     <span class='small_icon'>
                     <img src={Baseurl+"/assets/img/"+data.DocType+".png"} />
                     </span>}
 
                     {!showDocType(data.DocType) &&
                      <span class='small_icon'>
                      <img src={Baseurl+"/assets/img/file.png"} />
                      </span>
                     }
                     </div><div className="col-8"><a key={data.id} className="search-item" target="_blank" href={Baseurl+data.DocPath}>
                         {data.DocName}
                       <span className="search-item-desc">
                         {data.DocDescription}
                          
                         
                     </span>
                     </a></div><div className="col-2">
                     <a key={data.id} className="search-item"  href={Baseurl+"/app/category/"+data.Fk_Directory_id}>
                     <span className="search-item-desc">  <i className="iconsminds-folder"></i>                 
                     </span> </a></div></div>
                  })}
                </PerfectScrollbar>
              </div>
            }

          </div>
        </UncontrolledDropdown>
      </div>
      <NavLink className="navbar-logo" to="/app/home">
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        <div className="header-icons d-inline-block align-middle">
          <TopnavEasyAccess />
          <TopnavNotifications />
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">{username}</span>
              <span>
                <img alt="Profile" src={Baseurl+"/assets/img/l-1.jpg"} />
              </span>
            </DropdownToggle>
            {
            ( role && (role == "Admin" || role == "Super Admin")) &&
            
            <DropdownMenu className="mt-3" right>
              <DropdownItem onClick={() => handleLogout()}>
                Admin Panel
              </DropdownItem>
            </DropdownMenu>}
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
      changeLocaleAction: changeLocale,
    
  })(TopNav)
);