import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './blog.reducer';
import { IBlog } from 'app/shared/model/blog/blog.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBlogDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BlogDetail extends React.Component<IBlogDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { blogEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Blog [<b>{blogEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{blogEntity.title}</dd>
            <dt>
              <span id="author">Author</span>
            </dt>
            <dd>{blogEntity.author}</dd>
            <dt>
              <span id="post">Post</span>
            </dt>
            <dd>{blogEntity.post}</dd>
          </dl>
          <Button tag={Link} to="/entity/blog" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/blog/${blogEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ blog }: IRootState) => ({
  blogEntity: blog.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetail);
