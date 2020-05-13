import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
} from 'reactstrap';
import Api from '../../../api/api_helper';
import Popup from 'reactjs-popup';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Detail from './detail';
import moment from 'moment'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      headers: [],
      key: '',
      maxNumOfChildren: 0,
      minAgeOfChildren: 0,
      district: '',
      fbs: [],
    };
  }

  componentWillMount() {
    const header = [
      'User ID',
      "User's Fullname",
      'Phone number',
      'Avg. Rating',
      'Total feedback',
      'Worktime',
      'Address',
      'Status',
      ''
    ];
    this.setState({ headers: header });
    this.refresher();
  }

  refresher() {
    // setInterval(() =>
    Api.get('users/').then((res) => {
      this.setState({ users: res });
    });
    // }), 5000);
  }

  babysitterFilter() {
    let result = [];
    if (this.state.users) {
      this.state.users.map((item) => {
        if (this.selectedDistrict() == ''|| 
          item.address
            .toUpperCase()
            .indexOf(this.selectedDistrict().toUpperCase()) != -1)
        if (item.roleId == 3)
          if (item.nickname.toUpperCase().indexOf(this.state.key.toUpperCase()) != -1 || this.state.key == '')
            result.push(item);
      });
    }
    return result;
  }

  saveUserInfo = (item) => {
    let info = {
      minAgeOfChildren: this.state.minAgeOfChildren,
      maxNumOfChildren: this.state.maxNumOfChildren,
    };
    info.id = item;
    if (this.state.editAddress) info.address = this.state.editAddress;
    if (this.state.editEmail) info.email = this.state.editEmail;
    if (this.state.editPhone) info.phoneNumber = this.state.editPhone;
    // console.log(info)
    let phoneRegex = /^\d{10}$/;
    let check = true;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (info.phoneNumber) if (!info.phoneNumber.match(phoneRegex)) check = false;
    if (info.email) if (!info.email.match(emailRegex)) check = false;
    if (check) {
    Api.put('users/' + item, info).then((res) => {
      ToastsStore.success("Successfully updated!");
      window.location.reload(false);
    }).catch(e => {
      ToastsStore.error("Failed!");
    });
    } else ToastsStore.error("Invalid parameter!");
  };

  banAccount = (item) => {
    let info = {active: !item.active};
    Api.put('users/' + item.id, info).then((res) => {
      window.location.reload(false);
    }).catch(e => {
      ToastsStore.error("Failed!");
    });
  };
  

  handleInputPress = (event) => {
    if (event.target.id == 'phonenumber')
      this.setState({ editPhone: event.target.value });
    if (event.target.id == 'email')
      this.setState({ editEmail: event.target.value });
    if (event.target.id == 'address')
      this.setState({ editAddress: event.target.value });
  };

  handleSearchInput = (event) => {
    // console.log(event.target.value);
    this.setState({ key: event.target.value });
  };

  openDropDown = (id) => {
    // console.log(event.target.innerText)
    if (this.state.open == null) {
      this.setState({
        open: id,
        editAddress: null,
        editPhone: null,
        editEmail: null,
      });
    } else {
      this.setState({
        open: null,
      });
    }
  };

  logoutAccount = (id) => {
    let body = {
      firstTime: false,
    }
    Api.put('users/' + id.toString(), body).catch(e => {
      ToastsStore.error("Failed!");
    });
    window.location.reload(false);
  }

  selectedDistrict = () => {
    if (this.state.district == 0) return '';
    if (this.state.district == 1) return 'Q12';
    if (this.state.district == 2) return 'Gò Vấp';
    if (this.state.district == 3) return 'Q2';
    if (this.state.district == 4) return 'Q3';
    if (this.state.district == 5) return 'Q5';
    if (this.state.district == 6) return 'Q10';
    if (this.state.district == 7) return 'Tân Bình';
    if (this.state.district == 8) return 'Tân Phú';
    if (this.state.district == 9) return 'Phú Nhuận';
  };

  weeklyScheduleString = (str) => {
    let tmp = '';
    if (str.indexOf('MON') != -1) tmp += 'T2 ';
    if (str.indexOf('TUE') != -1) tmp += 'T3 ';
    if (str.indexOf('WED') != -1) tmp += 'T4 ';
    if (str.indexOf('THU') != -1) tmp += 'T5 ';
    if (str.indexOf('FRI') != -1) tmp += 'T6 ';
    if (str.indexOf('SAT') != -1) tmp += 'T7 ';
    if (str.indexOf('SUN') != -1) tmp += 'CN ';
    return tmp;
  }

  render() {
    return (
      <Row>
        <ToastsContainer store={ToastsStore} position={"top_right"} lightBackground/>
        <Col md="12">
          <Row>
            <Col md='5'>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Search by Name</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter keyword"
                    onChange={this.handleSearchInput}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col md='5'></Col>

            <Col md="2">
              <Row>
              <Label style={{ paddingTop: 7, marginLeft: 20, marginRight: 10 }}>District</Label>
            
              <Input
                    type="select"
                    name="selectSm"
                    id="SelectLm"
                    bsSize="md"
                    style={{ width: 120 }}
                    onChange={(ev) =>
                      this.setState({ district: ev.target.value })
                    }
                  >
                    <option value="0">All</option>
                    <option value="1">Q12</option>
                    <option value="2">Gò Vấp</option>
                    <option value="3">Q2</option>
                    <option value="4">Q3</option>
                    <option value="5">Q5</option>
                    <option value="6">Q10</option>
                    <option value="7">Tân Bình</option>
                    <option value="8">Tân Phú</option>
                    <option value="9">Phú Nhuận</option>
              </Input>
              </Row>
            </Col>
          </Row>
        </Col>


        <Col md='12'>
          <Card>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    {this.state.headers.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.babysitterFilter().map((item, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => this.openDropDown(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.nickname}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          {item.babysitter
                            ? item.babysitter.averageRating
                            : 'N/A'}
                        </td>
                        <td>
                          {item.babysitter
                            ? item.babysitter.totalFeedback
                            : 'N/A'}
                        </td>
                        <td>{this.weeklyScheduleString(item.babysitter.weeklySchedule)} <br/>
                        {item.babysitter.startTime + 'h - ' + item.babysitter.endTime + 'h'}</td>
                        <td>{item.address}</td>
                        <td>{item.active ? <b style={({color: 'green'})}>Active</b> 
                        : <b style={({color: 'red'})}>Banned</b>}</td>
                        <td onClick={() => this.loadFeedback(item)}>
                        <Popup trigger={<button className="btn btn-pill btn-block btn-info">Edit</button>} modal>
                        <div style={{height: '700px', display: 'block', overflowY: 'scroll'}} >{this.openList(item)}</div>
                        </Popup>
                        </td>
                      </tr>
                      {item.id == this.state.open ? this.openListView(item) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

  openListView(item){
    return (
      <tr>
        <td align="center" colSpan="100%">
        <FormGroup>
            <InputGroup >
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:300})}><b>Phone Number</b></InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="prepend" >
                <InputGroupText style={({width:500})}>{item.phoneNumber}</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-user"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:300})}><b>Email</b></InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:500})}>{item.email}</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-envelope"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:300})}><b>Address</b></InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:500})}>{item.address}</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:300})}><b>Weekly Schedule</b></InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:500})}>{this.weeklyScheduleString(item.babysitter.weeklySchedule)}</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:300})}><b>Working time</b></InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{item.babysitter.startTime + 'h - ' + item.babysitter.endTime + 'h'}</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:300})}><b>Maximum number of children</b></InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{item.babysitter.maxNumOfChildren}</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={({width:300})}><b>Minimum children age</b></InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{item.babysitter.minAgeOfChildren}</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </td>
      </tr>
    )
  }

  openList(item) {
    
    return (
      <div style={({margin:50})}>
        <h1>{item.nickname}</h1>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Phone Number</InputGroupText>
              </InputGroupAddon>
              <Input
                id="phonenumber"
                defaultValue={item.phoneNumber}
                onChange={this.handleInputPress}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-user"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Email</InputGroupText>
              </InputGroupAddon>
              <Input
                type="email"
                id="email"
                defaultValue={item.email}
                onChange={this.handleInputPress}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-envelope"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Address</InputGroupText>
              </InputGroupAddon>
              <Input
                id="address"
                defaultValue={item.address}
                onChange={this.handleInputPress}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Weekly Schedule</InputGroupText>
              </InputGroupAddon>
              <Input
                disabled
                id="address"
                placeholder={this.weeklyScheduleString(item.babysitter.weeklySchedule)}
                onChange={this.handleInputPress}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Working time</InputGroupText>
              </InputGroupAddon>
              <Input
                disabled
                id="address"
                placeholder={item.babysitter.startTime + 'h - ' + item.babysitter.endTime + 'h'}
                onChange={this.handleInputPress}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Minimum children age</InputGroupText>
              </InputGroupAddon>
              <Input
                id="minAgeOfChildren"
                disabled
                defaultValue={item.babysitter.minAgeOfChildren}
                onChange={e => this.setState({minAgeOfChildren: e.target.value})}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Maximum number of children</InputGroupText>
              </InputGroupAddon>
              <Input
                id="maxNumOfChildren"
                disabled
                defaultValue={item.babysitter.maxNumOfChildren}
                onChange={e => this.setState({maxNumOfChildren: e.target.value})}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          {this.tblSkillCert(item)}
          <div style={{height: '300px', display: 'block', overflowY: 'scroll'}}>
            <h5>Recent activities</h5>
            {this.tblFeedback(item)}
          </div>

          <FormGroup className="form-actions" align="center">
            <Button
              type="submit"
              size="lg"
              color="warning"
              onClick={() => {if(window.confirm('Are you sure?')){this.saveUserInfo(item.id)};}}
            >
              Save
            </Button>

            <Button type="submit" size="lg" color="warning" style={({marginLeft: 40})}
                onClick={() => {if(window.confirm('Are you sure?')){this.logoutAccount(item.id)};}}>
                Logout this account
            </Button>
              
            {item.active ? 
            <Button
              type="submit"
              size="lg"
              style={({margin: 30})}
              color="danger"
              onClick={() => {if(window.confirm('Are you sure?')){this.banAccount(item)};}}
            >
              Ban this account
            </Button>
            : <Button
            type="submit"
            size="lg"
            style={({margin: 30})}
            color="danger"
            onClick={() => {if(window.confirm('Are you sure?')){this.banAccount(item)};}}
          >
            Unlock this account
          </Button>}
          </FormGroup>
        </div>
    );
  }

  tblSkillCert(user) {
    return (
      <Row style={{marginTop: 20}}>
        <Col md="6">
          <Row>
            <Col md="4">
              <b> <i className="cui-list icons mt-4"></i>&nbsp;Skills:</b>
            </Col>
            <Col md="8">
              { user && user.sitterSkills && 
                (user.sitterSkills.length == 0 ?
                <Row><p style={{color:'#bebebe', paddingLeft: 10}}>This sitter has no skill</p></Row> : 
                <Row>
                  {
                    user.sitterSkills.map(skill => 
                        <Col md='12' key={skill.skillId} style={{color: '#4dbd74'}}>
                          <i className="cui-check icons mt-4"></i>&nbsp;
                          {skill.skill.vname}
                        </Col>
                    )
                  }
                </Row>)
              }
              
            </Col>
          </Row>
        </Col>


        <Col md="6" 
        // style={{marginTop:10, paddingTop: 10}}
        >
          <Row>
            <Col md="4">
            <b> <i className="cui-list icons mt-4"></i>&nbsp;Certificate</b>
            </Col>
            <Col md="8">
              { user.sitterCerts && 
                (user.sitterCerts.length == 0 ?
                <Row><p style={{color:'#bebebe', paddingLeft: 10}}>This sitter has no certificate</p></Row> : 
                <Row>
                  {
                    user.sitterCerts.map(skill => 
                        <Col md='12' key={skill.certId} style={{color: '#4dbd74'}}>
                          <i className="cui-check icons mt-4"></i>&nbsp;
                          {skill.cert.vname}
                        </Col>
                    )
                  }
                </Row>)
              }
              
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  tblFeedback(user) {
    const fbs = this.state.fbs;
     
    return (
      <Table responsive borderless>
        <thead>
          <tr>
            <th width='120'>Date</th>
            <th>Reported</th>
            <th>Rating</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody style={{height:200}}>
          {fbs.length != 0 ? fbs.map(fb => fb.reporter &&
            <tr key={fb.id}>
              <td>
                <b>{moment(fb.sitting.sittingDate).format('DD-MM-YYYY')}</b>
              </td>
              <td align='center'>{fb.isReport && fb.reporter && 
                <i className="fa fa-close" style={{color:'red'}}/>}
              </td>
              <td align='center'>{!fb.isReport && 
                <span>{fb.rating}<i className='fa fa-star' style={{color:'#fcdb03'}}/></span>}
              </td>
              <td>{fb.description}</td>
            </tr>): <tr style={{color:'#bebebe'}}><td align='center' colSpan='100%'>No feedback yet</td></tr>
          }
          
        </tbody>
      </Table>
    );
  }

  loadFeedback = (user) => {
    // console.log(user)
    Api.get('feedback/getAllFeedbackByUserId/' + user.id).then(res => this.setState({fbs: res}))
  }
}

export default Users;
