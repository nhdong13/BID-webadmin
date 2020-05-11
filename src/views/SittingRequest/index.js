import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  FormGroup,
  Label,
  Input,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';
import colors from '../../assets/Color';
import { thisExpression } from '@babel/types';
import Feedback from '../Feedback/item';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
  ToastContainer,
} from 'react-toasts';
import Detail from '../User/babysitter/detail';
import ParentDetail from '../User/parent/detail';

class SittingRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      headers: [],
      open: null,
      status: '',
      isOpen: false,
      editAddress: null,
      key: '',
      startPoint: null,
      endPoint: null,
      statusFilter: 0,
      asc: true,
      warning: false,
      reset: true,
      feedbacks: [],
      district: '',
      openInfo: false,
      openInfoUser: null,
      openParent: false,
      openInfoParent: null,
    };
  }

  componentWillMount() {
    const header = [
      'Sitting ID',
      'Sitting Time',
      'Created User',
      'Babysitter',
      'Address',
      'Price',
      'Checkin time',
      'Checkout time',
      'Status',
    ];
    this.setState({ headers: header });
    this.refresher();
  }

  refresher() {
    // setInterval(() =>
    Api.get('sittingRequests/').then((res) => {
      this.setState({ requests: res });
    });
    // }), 5000);
  }

  textColorByStatus(text) {
    if (text == 'PENDING') return colors.pending;
    if (text == 'DONE') return colors.done;
    if (text == 'CANCELED') return colors.canceled;
    if (text == 'CONFIRMED') return colors.confirmed;
    return colors.overlap;
  }

  saveUserInfo = (item) => {
    let info = {};
    info.id = item;
    info.status = this.state.status;
    if (this.state.editAddress) info.address = this.state.editAddress;
    Api.put('sittingRequests/' + item, info).then((res) => {
      if (res.id == info.id) {
        ToastsStore.success('Successfully updated!');
        this.refresher();
      } else {
        ToastsStore.error('Failed to update! Try again');
        this.refresher();
      }

      // window.location.reload(false);
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
    // console.log(event.target.value.indexOf('an'));
    this.setState({ key: event.target.value });
  };

  toggleDropdown = (event) => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleDropdownSelect = (event) => {
    this.setState({ status: event.target.innerText });
  };

  sort = (i) => {
    if (this.state.requests) {
      let tmpRequests = this.state.requests;
      let key = Object.keys(tmpRequests[0])[i];
      
      tmpRequests.sort((a, b) => this.state.asc ? (a[key] - b[key]) : (b[key] - a[key]))
      // console.log(key);
      this.setState({requests: tmpRequests, asc: !this.state.asc});
    }
  }

  openList(item) {
    return (
      <React.Fragment>
      
      <Modal isOpen={true} toggle={this.openDropDown}
              className={'modal-lg'}>
        <ModalHeader>
            <p style={{width:760, marginBottom:0}}>Thông tin buổi giữ trẻ 
              <span style={{position: 'absolute', right: 30,
                color: this.textColorByStatus(item.status)}}>{item.status}</span>
            </p>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md='6'>
              <p>Phụ huynh</p>
              {this.tblInfo(item.user)}
            </Col>
            <Col md='6'>
              <p>Người giữ trẻ</p>
              {item.bsitter ? this.tblInfo(item.bsitter) 
              : <p style={{color:'#b3b3b3'}}>Chưa có người giữ trẻ </p>}
            </Col>
          </Row>
        
      <tr>
        <td align="center" colSpan="100%">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Address</InputGroupText>
              </InputGroupAddon>
              <Input
                id="address"
                disabled
                placeholder={item.sittingAddress}
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
                <InputGroupText style={{width: 200}}>Number of children</InputGroupText>
              </InputGroupAddon>
              <Input
                disabled
                id="address"
                placeholder={item.childrenNumber}
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
                <InputGroupText style={{width: 200}}>Min. age of children</InputGroupText>
              </InputGroupAddon>
              <Input
                disabled
                id="address"
                placeholder={item.minAgeOfChildren}
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
                <InputGroupText style={{width: 200}}>Status</InputGroupText>
              </InputGroupAddon>
              <Dropdown
                direction="right"
                isOpen={this.state.isOpen}
                toggle={this.toggleDropdown}
              >
                <DropdownToggle caret>{this.state.status}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Status</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    PENDING
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    CONFIRMED
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    CANCELED
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    ONGOING
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    DONE
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    DONE_UNCONFIMRED
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    DONE_BY_NEWSTART
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    SITTER_NOT_CHECKIN
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    EXPIRED
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>
                    STAFF_CANCELED
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup className="form-actions">
            <Button
              type="submit"
              size="md"
              color="primary"
              onClick={() => this.saveUserInfo(item.id)}
            >
              Save
            </Button>
            <Button
              type="submit"
              size="md"
              color="warning"
              style={{marginLeft: 20}}
              onClick={this.toggleWarning}
            >
              <b>Return money back</b> and <b>cancel sitting</b>
            </Button>
            <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                    className={'modal-warning ' + this.props.className}>
              <ModalHeader toggle={this.toggleWarning}>Return money to customer</ModalHeader>
              <ModalBody>
                <Input type="select" name="ccmonth" id="ccmonth" style={{marginBottom: 20}}
                  onChange={(ev) =>
                    console.log(ev.target.value)
                  }>
                  <option value="0">0%</option>
                  <option value="20">20%</option>
                  <option value="50">50%</option>
                  <option value="100">100%</option>
                </Input>                
              <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Content..." defaultValue="Xin lỗi vì chúng tôi đã không cung cấp dịch vụ đạt kì vọng của bạn.
                             Chúng tôi đã ghi nhận sự cố đã xảy ra với bạn và cố gắng để cải thiện dịch vụ.
                             Chúng tôi sẽ hoàn lại số tiền của buổi trông trẻ này.
                             Mong bạn thông cảm và tiếp tục ủng hộ chúng tôi.
                             Xin chân thành cảm ơn." />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => this.staffCancel(item)}>Submit</Button>{' '}
                <Button color="secondary" onClick={() => this.toggleWarning()}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </td>
      </tr>

      {this.invitationList(item.invitations)}
      </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.openDropDown}>Close</Button>
        </ModalFooter>
      </Modal>
      </React.Fragment>
    );
  }

  toggleWarning = (item) => {
    this.setState({
      warning: !this.state.warning,
    });
  }

  staffCancel = (item) => {
    let body = {};
    body.status = 'STAFF_CANCELED';
    Api.put('sittingRequests/'+ item.id, body);
    window.location.reload(false);
  }

  openDropDown = (id) => {
    // console.log(event.target.innerText)
    this.feedbackList(id.id);
    if (this.state.open == null) {
      this.setState({
        open: id.id,
        editAddress: null,
        status: id.status,
      });
    } else {
      this.setState({
        open: null,
      });
    }
  };

  selectedStatus = () => {
    if (this.state.statusFilter == 0) return '';
    if (this.state.statusFilter == 1) return 'PENDING';
    if (this.state.statusFilter == 2) return 'CONFIRMED';
    if (this.state.statusFilter == 3) return 'CANCELED';
    if (this.state.statusFilter == 4) return 'ONGOING';
    if (this.state.statusFilter == 5) return 'DONE';
    if (this.state.statusFilter == 6) return 'DONE_UNCONFIMRED';
    if (this.state.statusFilter == 7) return 'DONE_BY_NEWSTART';
    if (this.state.statusFilter == 8) return 'SITTER_NOT_CHECKIN';
    if (this.state.statusFilter == 9) return 'EXPIRED';
    if (this.state.statusFilter == 10) return 'STAFF_CANCELED';
  };

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

  searchFilter() {
    let result = [];
    if (this.state.requests) {
      this.state.requests.map((item) => {
        if (this.selectedDistrict() == ''|| 
          item.sittingAddress
            .toUpperCase()
            .indexOf(this.selectedDistrict().toUpperCase()) != -1)
        if (this.selectedStatus() == '' || this.selectedStatus() == item.status)
          if (
            this.state.startPoint == null ||
            moment(item.sittingDate).isAfter(moment(this.state.startPoint)) ||
            moment(item.sittingDate).isSame(moment(this.state.startPoint))
          )
            if (
              this.state.endPoint == null ||
              moment(item.sittingDate).isBefore(moment(this.state.endPoint)) ||
              moment(item.sittingDate).isSame(moment(this.state.endPoint))
            )
              if (
                item.sittingAddress
                  .toUpperCase()
                  .indexOf(this.state.key.toUpperCase()) != -1 ||
                this.state.key == '' ||
                item.user.nickname
                  .toUpperCase()
                  .indexOf(this.state.key.toUpperCase()) != -1 ||
                (item.bsitter &&
                  item.bsitter.nickname
                    .toUpperCase()
                    .indexOf(this.state.key.toUpperCase()) != -1)
              )
                result.push(item);
      });
    }
    return result;
  }

  setdate = () => {
    // console.log(this.state.startPoint, this.state.endPoint);
  };

  render() {
    return (
      <Row>
        <ToastsContainer
          store={ToastsStore}
          position={'top_right'}
          lightBackground
        />

        <Col md="12">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText style={{width: 200}}>Search by Name/Address</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Enter keywords"
                onChange={this.handleSearchInput}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-asterisk"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Col>

        <Col md="12">
            <Row>
            <Col md="2">
              <Row>
              <Label style={{ paddingTop: 7, marginLeft: 20, marginRight: 10 }}>From</Label>
            
              <Input
                type="date"
                id="date-input"
                name="date-input"
                placeholder="date"
                style={{width: 160}}
                onChange={(st) =>
                  this.setState({ startPoint: st.target.value })
                }
              />
              </Row>
            </Col>

            <Col md="2">
              <Row>
              <Label style={{ paddingTop: 7, marginLeft: 20, marginRight: 10 }}>To</Label>
            
              <Input
                type="date"
                id="date-input"
                name="date-input"
                placeholder="date"
                style={{width: 160}}
                onChange={(ep) => this.setState({ endPoint: ep.target.value })}
              />
              </Row>
            </Col>
            <Col md="3"></Col>
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
            <Col md="3">
              <Row>
                <Col md='2'><Label style={{ paddingTop: 7 }}>Status</Label></Col>
                <Col md='7'>
                  <Input
                    type="select"
                    name="selectSm"
                    id="SelectLm"
                    bsSize="md"
                    style={{ width: 230 }}
                    onChange={(ev) =>
                      this.setState({ statusFilter: ev.target.value })
                    }
                  >
                    <option value="0">All</option>
                    <option value="1">PENDING</option>
                    <option value="2">CONFIRMED</option>
                    <option value="3">CANCELED</option>
                    <option value="4">ONGOING</option>
                    <option value="5">DONE</option>
                    <option value="6">DONE_UNCONFIMRED</option>
                    <option value="7">DONE_BY_NEWSTART</option>
                    <option value="8">SITTER_NOT_CHECKIN</option>
                    <option value="9">EXPIRED</option>
                    <option value="10">STAFF_CANCELED</option>
                  </Input>
                </Col>
                <Col md='2'>
                  <Button
                    style={{ marginLeft: 25, width: 35, height: 35 }}
                    onClick={() => {this.setState({reset: !this.state.reset});this.refresher()}}
                  >
                    <i className="fa fa-refresh"></i>
                  </Button>
                </Col>

              </Row>
            </Col>
            {/* <Button onClick={() => this.setdate()}/> */}
            </Row>
        </Col>


        <Col md="12" style={{marginTop: 30}}>
          <Card>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr align="center">
                    {this.state.headers.map((item, index) => (
                      <th key={index}>
                        {item}
                        {/* <i className="cui-sort-ascending" style={{marginLeft: 5}} 
                        onClick={() => this.sort(index)}></i> */}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.searchFilter().length == 0 && (
                    <tr>
                      <td colSpan="100%" align="center">
                        No sitting request found.
                      </td>
                    </tr>
                  )}

                  {this.searchFilter()
                    .reverse()
                    .map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td onClick={() => this.openDropDown(item)}>{item.id}</td>
                          <td align="center" onClick={() => this.openDropDown(item)}>
                            {moment(item.sittingDate).format('DD-MM-YYYY')}
                            <br />
                            {moment(item.startTime, [
                              moment.ISO_8601,
                              'HH:mm',
                            ]).format('HH:mm')}{' '}
                            -{' '}
                            {moment(item.endTime, [
                              moment.ISO_8601,
                              'HH:mm',
                            ]).format('HH:mm')}
                          </td>
                          <td>
                            <b><a onClick={() => this.openParentInfo(item.user.id)} style={{cursor:'pointer'}}>
                              {item.user.nickname}</a></b>
                          </td>
                          <td>
                            {item.bsitter ? 
                            <a onClick={() => this.openUserInfo(item.bsitter.id)} style={{cursor:'pointer'}}>{item.bsitter.nickname}</a>
                             : 'N/A'}
                          </td>
                          <td onClick={() => this.openDropDown(item)}>{item.sittingAddress}</td>
                          <td onClick={() => this.openDropDown(item)}>{formater(item.totalPrice)} VNĐ</td>
                          <td onClick={() => this.openDropDown(item)}>
                            {item.checkinTime
                              ? moment(item.checkinTime).format('HH:mm')
                              : 'N/A'}
                          </td>
                          <td onClick={() => this.openDropDown(item)}>
                            {item.checkoutTime
                              ? moment(item.checkoutTime).format('HH:mm')
                              : 'N/A'}
                          </td>
                          <td onClick={() => this.openDropDown(item)}>
                            <b
                              style={{
                                color: this.textColorByStatus(item.status),
                              }}
                            >
                              {item.status}
                            </b>
                          </td>
                        </tr>
                        {item.id == this.state.open
                          ? this.openList(item)
                          : null}
                      </React.Fragment>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        {this.state.openInfo ? 
          <Detail isOpen={true} userId={this.state.openInfoUser} closeMethod={this.openUserInfo}/> 
          : null
        }
        {this.state.openParent ? 
          <ParentDetail isOpen={true} userId={this.state.openInfoParent} closeMethod={this.openParentInfo}/> 
          : null
        }
      </Row>
    );
  }

  feedbackList = async (requestId) => {
    let response = [];
    await Api.get('feedback/' + requestId).then(res => {
      response = res;
    });
    this.setState({feedbacks: response});
  }

  invitationList(list) {
    const feedbacks = this.state.feedbacks;

    return (
      <React.Fragment>
      <tr><td align="left" colSpan="100%" style={{backgroundColor: '#f0f3f5'}}>
        <h3 style={{marginLeft: 10}}>Invitations of request</h3>
        <Row style={{marginLeft:0}}>
        {list.map((item, index) => (
            <Col md='6' key={index}>
              <b style={{ marginRight: '150px', fontSize: 8 }}>Invitation {index + 1}</b>
              <b style={{ color: this.textColorByStatus(item.status) }}>
                {item.status}
              </b>
            <br />
            Receiver: <a onClick={() => this.openUserInfo(item.user.id)} 
                        style={{cursor:'pointer'}}>{item.user.nickname}</a>
            </Col>
        ))}
        </Row>
      </td></tr>
      
      <tr><td align="left" colSpan="100%" style={{backgroundColor: '#f0f3f5'}}>
        <h3 style={{marginLeft: 10, marginTop:20}}>Feedback</h3>
        <Row>
        {feedbacks.length==0 ? 
          <Col md='12'><p style={{color:'#b3b3b3', fontSize: 12, marginLeft: 10}}>No feedback yet.</p></Col>
          : null
        }
        
        {feedbacks.map((item, index) => !item.isReport ? (
            <Col md='6' key={index}>
              <Feedback user={item.sitting.user} key={item.id} feedback={item} isReport={item.isReport}></Feedback>
            </Col>
        ) : null)}
        </Row>
      </td></tr>

      <tr><td align="left" colSpan="100%" style={{backgroundColor: '#f0f3f5'}}>
        <h3 style={{marginLeft: 10, marginTop:20}}>Report</h3>
        <Row>
        {feedbacks.length==0 ? 
          <Col md='12'><p style={{color:'#b3b3b3', fontSize: 12, marginLeft: 10}}>There is no report.</p></Col>
          : null
        }
        
        {feedbacks.map((item, index) => item.isReport ? (
            <Col md='5' key={index}>
              <Feedback user={item.sitting.user} key={index} feedback={item} isReport={item.isReport}></Feedback>
            </Col>
        ): null)}
        </Row>
      </td></tr>
      </React.Fragment>
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


  tblInfo(user) {
    return (
      <Row style={{fontSize:12}}>
        <Col lg="3">
          <img src={user.image} width="80" style={{marginTop:40}} />
        </Col>
        <Col lg='9'>
          <Table responsive borderless>
            <tbody>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Fullname</b>
                </td>
                <td>{user.nickname}</td>
              </tr>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Phone number</b>
                </td>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Email</b>
                </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Address</b>
                </td>
                <td>{user.address}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default SittingRequest;
