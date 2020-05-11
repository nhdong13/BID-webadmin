import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import Select from 'react-select';
import Detail from '../User/babysitter/detail';
import ParentDetail from '../User/parent/detail';

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      headers: [],
      options: [],
      rate1: 'Unsolve',
      rate2: 'Unsolve',
      openInfo: false,
      openInfoUser: null,
      openParent: false,
      openInfoParent: null,
    };
  }

  componentDidMount(){
    Api.get('feedback').then(res => this.setState({feedbacks: res}));
    const options = [
      { value: '0', label: 'Unsolve'},
      { value: '1', label: 'Solved'},
      { value: '2', label: 'All'},
    ]
    this.setState({options: options});
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
      { 
        if (item.isReport && item.reporter) {
          if (item.status == this.state.rate1 || this.state.rate1 == 'All') result.push(item);
        }
      }
    )
    return result;
  }

  bsitterFeedback(){
    let result = [];
    this.state.feedbacks.map(item => 
      {if (item.isReport && !item.reporter) 
        if (item.status == this.state.rate2 || this.state.rate2 == 'All') result.push(item);
      }
    )
    return result;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col md='6'>
                    <h3>Report from Parents</h3>
                  </Col>
                  <Col md='3'></Col>

                  <Col md='3'>
                    <Select options={this.state.options}
                      onChange={(e) => this.setState({rate1: e.label})}/>
                  </Col>
                </Row>
                
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>RequestId</th>
                    <th>Reporter</th>
                    <th>Babysitter</th>
                    <th>Report date</th>
                    {/* <th>Description</th> */}
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.parentFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">There is no report.</td></tr> 
                  : this.parentFeedback().map(item => 
                    item.isReport && item.reporter &&
                    <React.Fragment key={item.id}><tr >
                    <td>{item.requestId}</td>
                    <td>
                      <b><a onClick={() => this.openParentInfo(item.sitting.user.id)} style={{cursor:'pointer'}}>
                        {item.sitting.user.nickname}
                      </a></b>
                      <br/>{item.sitting.user.phoneNumber}
                    </td>
                    <td>
                      <b><a onClick={() => this.openUserInfo(item.sitting.bsitter.id)} style={{cursor:'pointer'}}>
                        {item.sitting.bsitter.nickname}<br/>{item.sitting.bsitter.phoneNumber}
                      </a></b>
                    </td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    {/* <td>{item.description}</td> */}
                    <td><b style={{color: item.status == 'Unsolve' ? 'red' : 'green'}}>{item.status}</b></td>
                  </tr>
                  <tr>
                    <td><b>Description:</b></td>
                    <td colSpan="3">{item.description.split('\n').map((des, index) => 
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
            <Card>
              <CardHeader>
                <Row>
                  <Col md='6'>
                    <h3>Report from Babysitters</h3>
                  </Col>
                  <Col md='3'></Col>

                  <Col md='3'>
                    <Select options={this.state.options}
                      onChange={(e) => this.setState({rate2: e.label})}/>
                  </Col>
                </Row>
                
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>RequestId</th>
                    <th>Reporter</th>
                    <th>Parent</th>
                    <th>Report date</th>
                    {/* <th>Description</th> */}
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.bsitterFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">There is no report.</td></tr> 
                  : this.bsitterFeedback().map(item => 
                    item.isReport && !item.reporter && item.sitting.bsitter && 
                    <React.Fragment key={item.id}><tr>
                    <td>{item.requestId}</td>
                    <td>
                    <b><a onClick={() => this.openUserInfo(item.sitting.bsitter.id)} style={{cursor:'pointer'}}>
                        {item.sitting.bsitter.nickname}<br/>{item.sitting.bsitter.phoneNumber}
                      </a></b>
                    </td>
                    <td>
                      <b><a onClick={() => this.openParentInfo(item.sitting.user.id)} style={{cursor:'pointer'}}>
                        {item.sitting.user.nickname}
                      </a></b>
                      <br/>{item.sitting.user.phoneNumber}
                    </td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    {/* <td>{item.description}</td> */}
                    <td><b style={{color: item.status == 'Unsolve' ? 'red' : 'green'}}>{item.status}</b></td>
                  </tr><tr>
                    <td><b>Description:</b></td>
                    <td colSpan="3">{item.description.split('\n').map((des, index) => 
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
        {this.state.openInfo ? 
          <Detail isOpen={true} userId={this.state.openInfoUser} closeMethod={this.openUserInfo}/> 
          : null
        }

        {this.state.openParent ? 
          <ParentDetail isOpen={true} userId={this.state.openInfoParent} closeMethod={this.openParentInfo}/> 
          : null
        }
      </div>

    );
  }

  openUserInfo = (userId) => {
    this.setState({ 
      openInfo: !this.state.openInfo,
      openInfoUser: userId
    });
  }

  openParentInfo = (userId) => {
    this.setState({ 
      openParent: !this.state.openParent,
      openInfoParent: userId
    });
  }
}

export default Tables;
