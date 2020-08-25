import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive, isDemo, adminRoot } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
// import AppLayout from '../src/layout/AppLayout';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewCategory = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/category')
);
const ViewGeneric = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/generic')
);
const ViewLanding = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/landingpage')
);
const ViewMenuSelection = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/menuselection')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser || isDemo ? (
          // authUser || isDemo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              // pathname: '/app/applications/survey',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    console.log('props',this.props);
    // this.props.user ='bzebm5ZQnhepuRBYAAZBbWxa1lm2';
    // console.log('props',this.props);
    const { locale, loginUser } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>
            {/* <AppLayout> */}
                <Switch>
                  <AuthRoute
                    path={adminRoot}
                    authUser={loginUser}
                    component={ViewApp}
                  />
                  <Route
                    path="/user"
                    render={(props) => <ViewUser {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                    <Route
                    path="/app/category/:id"
                    render={(props) => <ViewCategory {...props} />}
                  />
                  <Route
                  path="/app/generic/:id"
                  render={(props) => <ViewGeneric {...props} />}
                />
                <Route
                path="/app/menuselection/"
                render={(props) => <ViewMenuSelection {...props} />}
              />
                  <Route
                    path="/"
                    exact
                    render={(props) => <Redirect to="/app/home"/>}
                  />
                  {/* <Route
                    path="/"
                    exact
                    render={(props) => <ViewHome {...props} />}
                  /> */}
                  <Redirect to="/error" />
                </Switch>
            {/* </AppLayout> */}
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
