import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';

import IntlMessages from '../../helpers/IntlMessages';

import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
} from '../../redux/actions';

// import this.state.menuItems from '../../constants/menu';
class Sidebar extends Component {
  state = {
    menuItems :[]
  };
  
  constructor(props) {
    super(props);
   
    this.state = {
      selectedParentMenu: '',
      menuItems : [],
      viewingParentMenu: '',
      collapsedMenus: []
    };
    
  }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.props.selectedMenuHasSubItems
    );
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: '',
    });
    this.toggle();
  };

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(' ').filter((x) => x !== '');
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  };

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : '';
    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0;
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2;
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0;
    }
    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      );
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector('.sub-menu  li.active');
    if (oldli != null) {
      oldli.classList.remove('active');
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active');
    if (oldliSub != null) {
      oldliSub.classList.remove('active');
    }

    /* set selected parent menu */
    const selectedSublink = document.querySelector(
      '.third-level-menu  a.active'
    );
    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add('active');
    }

    const selectedlink = document.querySelector('.sub-menu  a.active');
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active');
      this.setState(
        {
          selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
            'data-parent'
          ),
        },
        callback
      );
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active'
      );
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu: selectedParentNoSubItem.getAttribute(
              'data-flag'
            ),
          },
          callback
        );
      } else if (this.state.selectedParentMenu === '') {
       

        this.setState(
          {
            selectedParentMenu: this.state.menuItems.length > 0 ? this.state.menuItems[0].DirName : "",
          },
          callback
        );
      }
    }
  };

  setHasSubItemStatus = () => {
    // if(this.state.menuItems)
    const hasSubmenu = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu } = this.state;
     //console.log('menuItem2',this.state.menuItems)

    const Submenus=[];
    Submenus.push(this.state.menuItems);
    const menuItem = Submenus[0].find((x) => x.DirName === selectedParentMenu);
    // //console.log('menuItem2',menuItem,Submenus[0])
    if (menuItem)
      return !!(menuItem && menuItem.SubMenu && menuItem.SubMenu.length > 0);
    return false;
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);

      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    let _menuItems =[];
    var link =`http://148.72.206.209:93/api/Menu/ALL`;
    axios.get(link)
      .then(res => {  
        res.data.map((data)=>{
          _menuItems.push(data)
          this.setState({menuItems:_menuItems});
          window.addEventListener('resize', this.handleWindowResize);
          this.handleWindowResize();
          this.handleProps();
          this.setSelectedLiActive(this.setHasSubItemStatus);
          //console.log('menuItems',this.state.menuItems,res.data);
        })
        
      })
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  openSubMenu = (e, menuItem) => {
    const Submenus=[];
    Submenus.push(menuItem);
    //console.log('menuItem',menuItem,Submenus?.length,Submenus[0]?.SubMenu?.length)
    //console.log('menuItem',Submenus.length,Submenus[0].SubMenu.length)
    const selectedParent = menuItem.DirName;
    const hasSubMenu = Submenus.length && Submenus[0].SubMenu.length > 0;
    // const hasSubMenu =  menuItem.length > 0 ? menuItem.SubMenu:;
      //console.log('hasSubMenu',hasSubMenu,menuItem.SubMenu)
      this.props.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      //console.log('hasSubMenu',hasSubMenu)
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        this.props.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        );
      }
      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
  };

  toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();

    const { collapsedMenus } = this.state;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  render() {
    const {
      selectedParentMenu,
      viewingParentMenu,
      collapsedMenus,
    } = this.state;
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {this.state.menuItems && 
                  this.state.menuItems.map((item) => {
                    return (
                      item.ShowLeftNav &&
                      <NavItem
                        key={item.DirName}
                        className={classnames({
                          active:
                            (selectedParentMenu === item.DirName &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.DirName,
                        })}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.Thumbnail} />{' '}
                           {item.DirName} 
                          </a>
                        ) : (
                          <NavLink
                            to={item.url}
                            onClick={(e) => this.openSubMenu(e, item)}
                            data-flag={item.DirName}
                          >
                            <i className={item.Thumbnail} />{' '}
                           {item.DirName}
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {this.state.menuItems &&
                this.state.menuItems.map((item) => 
                {
                  
                  return (
                    item.ShowLeftNav &&
                    <Nav vertical className="list-unstyled"
                      key={item.DirName}
                      className={classnames({
                          'd-block':
                            (selectedParentMenu === item.DirName &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.DirName,
                        })}
                       
                      data-parent={item.DirName}
                    >
                      {item.SubMenu &&
                        item.SubMenu.map((sub, index) => {
                          return (
                            <NavItem
                              key={`${item.DirName}_${index}`}
                              className={`${
                                sub.SubMenu && sub.SubMenu.length > 0
                                  ? 'has-sub-item'
                                  : ''
                              }`}
                            >
                              {sub.newWindow ? (
                                <a
                                  href={sub.url}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <i className={sub.Thumbnail} />{' '}
                                 {sub.DirName} 
                                </a>
                              ) : sub.SubMenu && sub.SubMenu.length > 0 ? (
                                <>
                                  <NavLink
                                    className={`rotate-arrow-icon opacity-50 ${
                                      collapsedMenus.indexOf(
                                        `${item.DirName}_${index}`
                                      ) === -1
                                        ? ''
                                        : 'collapsed'
                                    }`}
                                    to={sub.url}
                                    id={`${item.DirName}_${index}`}
                                    onClick={(e) =>
                                      this.toggleMenuCollapse(
                                        e,
                                        `${item.DirName}_${index}`
                                      )
                                    }
                                  >
                                    <i className="simple-icon-arrow-down" />{' '}
                                   {sub.DirName}
                                  </NavLink>

                                  <Collapse
                                    isOpen={
                                      collapsedMenus.indexOf(
                                        `${item.DirName}_${index}`
                                      ) === -1
                                    }
                                  >
                                    <Nav className="third-level-menu">
                                      {sub.SubMenu.map((thirdSub, thirdIndex) => {
                                        return (
                                          <NavItem
                                            key={`${item.DirName}${index}${thirdIndex}`}
                                          >
                                            {thirdSub.newWindow ? (
                                              <a
                                                href={thirdSub.url}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                              >
                                                <i className={thirdSub.Thumbnail} />{' '}
                                               {thirdSub.DirName}
                                                
                                              </a>
                                            ) : (
                                              <NavLink to={thirdSub.url}>
                                                <i className={thirdSub.Thumbnail} />{' '}
                                               {thirdSub.DirName}
                                               
                                              </NavLink>
                                            )}
                                          </NavItem>
                                        );
                                      })}
                                    </Nav>
                                  </Collapse>
                                </>
                              ) : (
                                <NavLink to={sub.url}>
                                  <i className={sub.Thumbnail} />{' '}
                                  {sub.DirName}
                                </NavLink>
                              )}
                            </NavItem>
                          );
                        })}
                          </Nav>                
                  );
                })}
               
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  } = menu;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames,
    changeSelectedMenuHasSubItems,
  })(Sidebar)
);