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
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
  ToastContainer,
} from 'react-toasts';

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
    Api.get('sittingRequests/all').then((res) => {
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
      console.log(key);
      this.setState({requests: tmpRequests, asc: !this.state.asc});
    }
  }

  openList(item) {
    return (
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
              onClick={() => this.toggleWarning()}
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
                <Button color="danger" onClick={() => this.toggleWarning()}>Submit</Button>{' '}
                <Button color="secondary" onClick={() => this.toggleWarning()}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </td>
      </tr>
    );
  }

  toggleWarning = () => {
    this.setState({
      warning: !this.state.warning,
    });
  }

  openDropDown = (id) => {
    // console.log(event.target.innerText)
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

  searchFilter() {
    let result = [];
    if (this.state.requests) {
      this.state.requests.map((item) => {
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
    console.log(this.state.startPoint, this.state.endPoint);
  };

  render() {
    return (
      <Row>
        <ToastsContainer
          store={ToastsStore}
          position={'top_right'}
          lightBackground
        />

        <Col xs="12" lg="12">
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

          <FormGroup row align="center">
            <Label style={{ paddingTop: 7, marginLeft: 40 }}>From</Label>
            <Col xs="12" md="2">
              <Input
                type="date"
                id="date-input"
                name="date-input"
                placeholder="date"
                onChange={(st) =>
                  this.setState({ startPoint: st.target.value })
                }
              />
            </Col>
            <Label style={{ paddingTop: 7 }}>To</Label>
            <Col xs="12" md="2">
              <Input
                type="date"
                id="date-input"
                name="date-input"
                placeholder="date"
                onChange={(ep) => this.setState({ endPoint: ep.target.value })}
              />
            </Col>
            <Col md="4"></Col>
            <Col xs="12" md="3">
              <Row>
                <Label style={{ paddingTop: 7, marginRight: 30 }}>Status</Label>
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
                <Button
                  style={{ marginLeft: 25, width: 35, height: 35 }}
                  onClick={() => {this.setState({reset: !this.state.reset});this.refresher()}}
                >
                  <i className="fa fa-refresh"></i>
                </Button>
              </Row>
            </Col>
            {/* <Button onClick={() => this.setdate()}/> */}
          </FormGroup>

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
                        <tr onClick={() => this.openDropDown(item)}>
                          <td>{item.id}</td>
                          <td align="center">
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
                            <b>{item.user.nickname}</b>
                          </td>
                          <td>
                            {item.bsitter ? item.bsitter.nickname : 'N/A'}
                          </td>
                          <td>{item.sittingAddress}</td>
                          <td>{formater(item.totalPrice)} VNĐ</td>
                          <td>
                            {item.checkinTime
                              ? moment(item.checkinTime).format('HH:mm')
                              : 'N/A'}
                          </td>
                          <td>
                            {item.checkoutTime
                              ? moment(item.checkoutTime).format('HH:mm')
                              : 'N/A'}
                          </td>
                          <td>
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
      </Row>
    );
  }
}

export default SittingRequest;
