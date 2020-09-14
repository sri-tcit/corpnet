import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

// const Dashboards = React.lazy(() =>
//   import(/* webpackChunkName: "dashboards" */ './dashboards')
// );
// const Pages = React.lazy(() =>
//   import(/* webpackChunkName: "pages" */ './pages')
// );
const Category = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ '../../views/category')
);
const Home = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ '../../views/home')
);
const MenuSelection = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ '../../views/menuselection')
);
const Generic = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ '../../views/generic')
);
const CategoryAdmin = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ '../../views/categoryAdmin')
);
const ViewAdminMenus = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../../views/adminmenus')
);
const ViewAdminRoles = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../../views/adminroles')
);
const ViewAdminContent = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../../views/admincontent')
);
const ViewAdminUsers= React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../../views/adminusers')
);
const ViewAdminFiles= React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../../views/adminmanagefiles')
);
// const Applications = React.lazy(() =>
//   import(/* webpackChunkName: "applications" */ './applications')
// );
// const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
// const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
// const BlankPage = React.lazy(() =>
//   import(/* webpackChunkName: "blank-page" */ './blank-page')
// );

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            {/* <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            /> */}
            {/* <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            /> */}
            <Route
              path={`${match.url}/category`}
              render={(props) => <Category {...props} />}
            />
            <Route
              path={`${match.url}/home`}
              render={(props) => <Home {...props} />}
            />
            <Route
              path={`${match.url}/menuselection`}
              render={(props) => <MenuSelection {...props} />}
            />
            <Route
              path={`${match.url}/generic`}
              render={(props) => <Generic {...props} />}
            />
            <Route
              path={`${match.url}/categoryAdmin`}
              render={(props) => <CategoryAdmin {...props} />}
            />
            <Route
              path={`${match.url}/adminmenus`}
              render={(props) => <ViewAdminMenus {...props} />}
            />
            <Route
              path={`${match.url}/adminroles`}
              render={(props) => <ViewAdminRoles {...props} />}
            />
            <Route
              path={`${match.url}/admincontent`}
              render={(props) => <ViewAdminContent {...props} />}
            />
            <Route
              path={`${match.url}/adminusers`}
              render={(props) => <ViewAdminUsers {...props} />}
            />
            <Route
              path={`${match.url}/adminmanagefiles`}
              render={(props) => <ViewAdminFiles {...props} />}
            />
            {/* <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            /> */}
            {/* <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            /> */}
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
