import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './session.reducer';
import { ISession } from 'app/shared/model/conference/session.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISessionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SessionDetail extends React.Component<ISessionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sessionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Session [<b>{sessionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{sessionEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>
              {sessionEntity.description ? (
                <div>
                  <a onClick={openFile(sessionEntity.descriptionContentType, sessionEntity.description)}>Open&nbsp;</a>
                  <span>
                    {sessionEntity.descriptionContentType}, {byteSize(sessionEntity.description)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="startDateTime">Start Date Time</span>
            </dt>
            <dd>
              <TextFormat value={sessionEntity.startDateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDateTime">End Date Time</span>
            </dt>
            <dd>
              <TextFormat value={sessionEntity.endDateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/session" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/session/${sessionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ session }: IRootState) => ({
  sessionEntity: session.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionDetail);
