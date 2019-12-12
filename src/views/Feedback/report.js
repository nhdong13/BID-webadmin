import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
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
    Api.get('feedback').then(res => {this.setState({feedbacks: res});console.log(this.state.feedbacks)});
    
  }

  solveReport = (id) => {
    let body = {
      status: 'Solved',
    }
    Api.put('feedback/' + id.toString(), body).then(res => window.location.reload(false));
  }

  parentFeedback(){
    let result = [];
    this.state.feedbacks.map(item => 
      {if (item.isReport && item.reporter) result.push(item);}
    )
    return result;
  }

  bsitterFeedback(){
    let result = [];
    this.state.feedbacks.map(item => 
      {if (item.isReport && !item.reporter) result.push(item);}
    )
    return result;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <h1>from Parents</h1>
            <Card>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>RequestId</th>
                    <th>Reporter</th>
                    <th>Report date</th>
                    {/* <th>Description</th> */}
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.parentFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No feedback yet.</td></tr> 
                  : this.state.feedbacks.map(item => 
                    item.isReport && item.reporter &&
                    <React.Fragment key={item.id}><tr >
                    <td>{item.requestId}</td>
                    <td><b>{item.sitting.user.nickname}</b></td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    {/* <td>{item.description}</td> */}
                    <td><b style={{color: item.status == 'Unsolve' ? 'red' : 'green'}}>{item.status}</b></td>
                  </tr>
                  <tr>
                    <td><b>Description:</b></td>
                    <td colSpan="2">{item.description.split('\n').map((des, index) => 
                      <p key={index}>{des}</p>
                    )}</td>
                    <td>
                      {item.status == 'Unsolve' && <Button type="submit" size="xs" color="success"
                      onClick={() => this.solveReport(item.id)}>Sovle</Button>}
                    </td>
                  </tr></React.Fragment>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" lg="6">
            <h1>from Babysitters</h1>
            <Card>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>RequestId</th>
                    <th>Reporter</th>
                    <th>Report date</th>
                    {/* <th>Description</th> */}
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.bsitterFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No feedback yet.</td></tr> 
                  : this.state.feedbacks.map(item => 
                    item.isReport && !item.reporter && item.sitting.bsitter && 
                    <React.Fragment key={item.id}><tr>
                    <td>{item.requestId}</td>
                    <td><b>{item.sitting.bsitter.nickname}</b></td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    {/* <td>{item.description}</td> */}
                    <td><b style={{color: item.status == 'Unsolve' ? 'red' : 'green'}}>{item.status}</b></td>
                  </tr><tr>
                    <td><b>Description:</b></td>
                    <td colSpan="2">{item.description.split('\n').map((des, index) => 
                      <p key={index}>{des}</p>
                    )}</td>
                    <td>
                      {item.status == 'Unsolve' && <Button type="submit" size="xs" color="success"
                      onClick={() => this.solveReport(item.id)}>Sovle</Button>}
                    </td>
                  </tr></React.Fragment>
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
