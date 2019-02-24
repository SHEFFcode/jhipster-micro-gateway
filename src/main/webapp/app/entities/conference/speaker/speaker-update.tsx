import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISession } from 'app/shared/model/conference/session.model';
import { getEntities as getSessions } from 'app/entities/conference/session/session.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './speaker.reducer';
import { ISpeaker } from 'app/shared/model/conference/speaker.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISpeakerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISpeakerUpdateState {
  isNew: boolean;
  idssessions: any[];
}

export class SpeakerUpdate extends React.Component<ISpeakerUpdateProps, ISpeakerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idssessions: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getSessions();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { speakerEntity } = this.props;
      const entity = {
        ...speakerEntity,
        ...values,
        sessions: mapIdList(values.sessions)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/speaker');
  };

  render() {
    const { speakerEntity, sessions, loading, updating } = this.props;
    const { isNew } = this.state;

    const { bio, bioContentType } = speakerEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.conferenceSpeaker.home.createOrEditLabel">Create or edit a Speaker</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : speakerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="speaker-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    First Name
                  </Label>
                  <AvField
                    id="speaker-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    Last Name
                  </Label>
                  <AvField
                    id="speaker-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    Email
                  </Label>
                  <AvField
                    id="speaker-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="twitterLabel" for="twitter">
                    Twitter
                  </Label>
                  <AvField
                    id="speaker-twitter"
                    type="text"
                    name="twitter"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="bioLabel" for="bio">
                      Bio
                    </Label>
                    <br />
                    {bio ? (
                      <div>
                        <a onClick={openFile(bioContentType, bio)}>Open</a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {bioContentType}, {byteSize(bio)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('bio')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_bio" type="file" onChange={this.onBlobChange(false, 'bio')} />
                    <AvInput
                      type="hidden"
                      name="bio"
                      value={bio}
                      validate={{
                        required: { value: true, errorMessage: 'This field is required.' }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="sessions">Sessions</Label>
                  <AvInput
                    id="speaker-sessions"
                    type="select"
                    multiple
                    className="form-control"
                    name="sessions"
                    value={speakerEntity.sessions && speakerEntity.sessions.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {sessions
                      ? sessions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/speaker" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  sessions: storeState.session.entities,
  speakerEntity: storeState.speaker.entity,
  loading: storeState.speaker.loading,
  updating: storeState.speaker.updating,
  updateSuccess: storeState.speaker.updateSuccess
});

const mapDispatchToProps = {
  getSessions,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakerUpdate);
