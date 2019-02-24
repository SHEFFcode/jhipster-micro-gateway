import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Speaker from './conference/speaker';
import Session from './conference/session';
import Blog from './blog/blog';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/speaker`} component={Speaker} />
      <ErrorBoundaryRoute path={`${match.url}/session`} component={Session} />
      <ErrorBoundaryRoute path={`${match.url}/blog`} component={Blog} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
