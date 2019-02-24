import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './speaker.reducer';
import { ISpeaker } from 'app/shared/model/conference/speaker.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISpeakerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SpeakerDetail extends React.Component<ISpeakerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { speakerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Speaker [<b>{speakerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">First Name</span>
            </dt>
            <dd>{speakerEntity.firstName}</dd>
            <dt>
              <span id="lastName">Last Name</span>
            </dt>
            <dd>{speakerEntity.lastName}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{speakerEntity.email}</dd>
            <dt>
              <span id="twitter">Twitter</span>
            </dt>
            <dd>{speakerEntity.twitter}</dd>
            <dt>
              <span id="bio">Bio</span>
            </dt>
            <dd>
              {speakerEntity.bio ? (
                <div>
                  <a onClick={openFile(speakerEntity.bioContentType, speakerEntity.bio)}>Open&nbsp;</a>
                  <span>
                    {speakerEntity.bioContentType}, {byteSize(speakerEntity.bio)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>Sessions</dt>
            <dd>
              {speakerEntity.sessions
                ? speakerEntity.sessions.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === speakerEntity.sessions.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/speaker" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/speaker/${speakerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ speaker }: IRootState) => ({
  speakerEntity: speaker.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakerDetail);
