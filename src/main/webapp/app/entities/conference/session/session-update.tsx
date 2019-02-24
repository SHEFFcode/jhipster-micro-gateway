import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISpeaker } from 'app/shared/model/conference/speaker.model';
import { getEntities as getSpeakers } from 'app/entities/conference/speaker/speaker.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './session.reducer';
import { ISession } from 'app/shared/model/conference/session.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISessionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISessionUpdateState {
  isNew: boolean;
  speakersId: string;
}

export class SessionUpdate extends React.Component<ISessionUpdateProps, ISessionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      speakersId: '0',
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

    this.props.getSpeakers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.startDateTime = convertDateTimeToServer(values.startDateTime);
    values.endDateTime = convertDateTimeToServer(values.endDateTime);

    if (errors.length === 0) {
      const { sessionEntity } = this.props;
      const entity = {
        ...sessionEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/session');
  };

  render() {
    const { sessionEntity, speakers, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description, descriptionContentType } = sessionEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.conferenceSession.home.createOrEditLabel">Create or edit a Session</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : sessionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="session-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField
                    id="session-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="descriptionLabel" for="description">
                      Description
                    </Label>
                    <br />
                    {description ? (
                      <div>
                        <a onClick={openFile(descriptionContentType, description)}>Open</a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {descriptionContentType}, {byteSize(description)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('description')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_description" type="file" onChange={this.onBlobChange(false, 'description')} />
                    <AvInput
                      type="hidden"
                      name="description"
                      value={description}
                      validate={{
                        required: { value: true, errorMessage: 'This field is required.' }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="startDateTimeLabel" for="startDateTime">
                    Start Date Time
                  </Label>
                  <AvInput
                    id="session-startDateTime"
                    type="datetime-local"
                    className="form-control"
                    name="startDateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.sessionEntity.startDateTime)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateTimeLabel" for="endDateTime">
                    End Date Time
                  </Label>
                  <AvInput
                    id="session-endDateTime"
                    type="datetime-local"
                    className="form-control"
                    name="endDateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.sessionEntity.endDateTime)}
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/session" replace color="info">
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
  speakers: storeState.speaker.entities,
  sessionEntity: storeState.session.entity,
  loading: storeState.session.loading,
  updating: storeState.session.updating,
  updateSuccess: storeState.session.updateSuccess
});

const mapDispatchToProps = {
  getSpeakers,
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
)(SessionUpdate);
