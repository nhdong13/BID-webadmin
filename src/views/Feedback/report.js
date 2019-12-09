import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      headers: [],
    };
  }

  componentWillMount(){
    Api.get('feedback').then(res => this.setState({feedbacks: res}));
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <h1>Feedback from Parents</h1>
            <Card>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>RequestId</th>
                    <th>Reporter</th>
                    <th>Report date</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.feedbacks.map(item => 
                    item.isReport && item.reporter && <tr key={item.requestId}>
                    <td>{item.requestId}</td>
                    <td><b>{item.sitting.user.nickname}</b></td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.description}</td>
                    <td><b style={{color: item.status == 'Unsolve' ? 'red' : 'green'}}>{item.status}</b></td>
                  </tr>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" lg="6">
            <h1>Feedback from Babysitters</h1>
            <Card>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>RequestId</th>
                    <th>Reporter</th>
                    <th>Report date</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.feedbacks.map(item => 
                    item.isReport && !item.reporter && item.sitting.bsitter && 
                    <tr key={item.requestId}>
                    <td>{item.requestId}</td>
                    <td><b>{item.sitting.bsitter.nickname}</b></td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.description}</td>
                    <td><b style={{color: item.status == 'Unsolve' ? 'red' : 'green'}}>{item.status}</b></td>
                  </tr>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Tables;
