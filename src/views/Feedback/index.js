import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Input,
   Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
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
      rating1: 0,
      rating2: 0,
      openInfo: false,
      openInfoUser: null,
      openParent: false,
      openInfoParent: null,
    };
  }

  componentDidMount(){
    Api.get('feedback').then(res => this.setState({feedbacks: res}));
    const options = [
      { value: '0', label: 'All'},
      { value: '5', label: (<div><i className='fa fa-star' style={{color:'#fcdb03'}}/>
                           <i className='fa fa-star' style={{color:'#fcdb03'}}/> 
                           <i className='fa fa-star' style={{color:'#fcdb03'}}/>
                           <i className='fa fa-star' style={{color:'#fcdb03'}}/>
                           <i className='fa fa-star' style={{color:'#fcdb03'}}/></div>)},
      { value: '4', label: (<div><i className='fa fa-star' style={{color:'#fcdb03'}}/>
                            <i className='fa fa-star' style={{color:'#fcdb03'}}/> 
                            <i className='fa fa-star' style={{color:'#fcdb03'}}/>
                            <i className='fa fa-star' style={{color:'#fcdb03'}}/></div>)},
      { value: '3', label: (<div><i className='fa fa-star' style={{color:'#fcdb03'}}/>
                            <i className='fa fa-star' style={{color:'#fcdb03'}}/> 
                            <i className='fa fa-star' style={{color:'#fcdb03'}}/></div>)},
      { value: '2', label: (<div><i className='fa fa-star' style={{color:'#fcdb03'}}/>
                            <i className='fa fa-star' style={{color:'#fcdb03'}}/></div>)},
      { value: '1', label: <i className='fa fa-star' style={{color:'#fcdb03'}}/>}
    ]
    this.setState({options: options});
  }

  parentFeedback(){
    let result = [];
    this.state.feedbacks.map(item => 
      { if (item.rating == this.state.rating1 || this.state.rating1 == 0)
        if (!item.isReport && item.reporter) result.push(item);}
    )
    return result;
  }

  bsitterFeedback(){
    let result = [];
    this.state.feedbacks.map(item => 
      { if (item.rating == this.state.rating2 || this.state.rating2 == 0)
        if (!item.isReport && !item.reporter) result.push(item);}
    )
    return result;
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col md='6'>
                    <h3>Feedback from Parents</h3>
                  </Col>
                  <Col md='3'></Col>

                  <Col md='3'>
                    <Select options={this.state.options} 
                      onChange={(e) => this.setState({rating1: e.value})}/>
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
                    <th>Rating</th>
                    <th>Report date</th>
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.parentFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No feedback yet.</td></tr> 
                  : this.parentFeedback().map(item => 
                    !item.isReport && item.reporter && <tr key={item.id +1}>
                    <td>{item.requestId}</td>
                    <td>
                      <b><a onClick={() => this.openParentInfo(item.sitting.user.id)} style={{cursor:'pointer'}}>
                        {item.sitting.user.nickname}
                      </a></b>
                    </td>
                    <td><b><a onClick={() => this.openUserInfo(item.sitting.bsitter.id)} style={{cursor:'pointer'}}>{item.sitting.bsitter.nickname}</a></b></td>
                    <td>{item.rating} <i className='fa fa-star' style={{color:'#fff130'}}></i> </td>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.description}</td>
                  </tr>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col md="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col md='6'>
                    <h3>Feedback from Babysitters</h3>
                  </Col>
                  <Col md='3'></Col>

                  <Col md='3'>
                    <Select options={this.state.options} 
                      onChange={(e) => this.setState({rating2: e.value})}/>
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
                    <th>Rating</th>
                    <th>Report date</th>
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.bsitterFeedback().length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No feedback yet.</td></tr> 
                  : this.bsitterFeedback().map(item => 
                    !item.isReport && !item.reporter && item.sitting.bsitter && 
                    <tr key={item.id + 1}>
                    <td>{item.requestId}</td>
                    <td>
                      <b><a onClick={() => this.openUserInfo(item.sitting.bsitter.id)} 
                        style={{cursor:'pointer'}}>{item.sitting.bsitter.nickname}
                      </a></b>
                    </td>
                    <td>
                      <b><a onClick={() => this.openParentInfo(item.sitting.user.id)} style={{cursor:'pointer'}}>
                        {item.sitting.user.nickname}
                      </a></b>
                    </td>
                    <td>{item.rating}<i className='fa fa-star' style={{color:'#fff130'}}></i></td>
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
