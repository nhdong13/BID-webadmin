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

  componentDidMount(){
    Api.get('feedback').then(res => this.setState({feedbacks: res}));
  }

  parentFeedback(){
    let result = [];
    this.state.feedbacks.map(item => 
      {if (!item.isReport && item.reporter) result.push(item);}
    )
    return result;
  }

  bsitterFeedback(){
    let result = [];
    this.state.feedbacks.map(item => 
      {if (!item.isReport && !item.reporter) result.push(item);}
    )
    return result;
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
                    <th>Rating</th>
                    <th>Report date</th>
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.parentFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No feedback yet.</td></tr> 
                  : this.state.feedbacks.map(item => 
                    !item.isReport && item.reporter && <tr key={item.requestId}>
                    <td>{item.requestId}</td>
                    <td><b>{item.sitting.user.nickname}</b></td>
                    <td>{item.rating}</td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.description}</td>
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
                    <th>Rating</th>
                    <th>Report date</th>
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.bsitterFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No feedback yet.</td></tr> 
                  : this.state.feedbacks.map(item => 
                    !item.isReport && !item.reporter && item.sitting.bsitter && 
                    <tr key={item.requestId}>
                    <td>{item.requestId}</td>
                    <td><b>{item.sitting.bsitter.nickname}</b></td>
                    <td>{item.rating}</td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.description}</td>
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
