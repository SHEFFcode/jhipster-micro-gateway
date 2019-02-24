import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Speaker from './speaker';
import SpeakerDetail from './speaker-detail';
import SpeakerUpdate from './speaker-update';
import SpeakerDeleteDialog from './speaker-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SpeakerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SpeakerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SpeakerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Speaker} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SpeakerDeleteDialog} />
  </>
);

export default Routes;
