import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './speaker.reducer';
import { ISpeaker } from 'app/shared/model/conference/speaker.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISpeakerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Speaker extends React.Component<ISpeakerProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { speakerList, match } = this.props;
    return (
      <div>
        <h2 id="speaker-heading">
          Speakers
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Speaker
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Twitter</th>
                <th>Bio</th>
                <th>Sessions</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {speakerList.map((speaker, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${speaker.id}`} color="link" size="sm">
                      {speaker.id}
                    </Button>
                  </td>
                  <td>{speaker.firstName}</td>
                  <td>{speaker.lastName}</td>
                  <td>{speaker.email}</td>
                  <td>{speaker.twitter}</td>
                  <td>
                    {speaker.bio ? (
                      <div>
                        <a onClick={openFile(speaker.bioContentType, speaker.bio)}>Open &nbsp;</a>
                        <span>
                          {speaker.bioContentType}, {byteSize(speaker.bio)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {speaker.sessions
                      ? speaker.sessions.map((val, j) => (
                          <span key={j}>
                            <Link to={`session/${val.id}`}>{val.id}</Link>
                            {j === speaker.sessions.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${speaker.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${speaker.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${speaker.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ speaker }: IRootState) => ({
  speakerList: speaker.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Speaker);
