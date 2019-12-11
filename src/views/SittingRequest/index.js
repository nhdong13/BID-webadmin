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
  Button,Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';
import colors from '../../assets/Color';
import { thisExpression } from '@babel/types';
import {ToastsContainer, ToastsStore, ToastsContainerPosition, ToastContainer} from 'react-toasts';

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
      if (res.id == info.id) {ToastsStore.success("Successfully updated!");this.refresher();}
      else {ToastsStore.error("Failed to update! Try again");this.refresher();}

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
    this.setState({key: event.target.value});
  }

  toggleDropdown = (event) => {
    this.setState({isOpen: !this.state.isOpen});
  }

  toggleDropdownSelect = (event) => {
    this.setState({status: event.target.innerText});
  }

  openList(item) {
    return (
      <tr>
        <td align="center" colSpan="100%">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Address</InputGroupText>
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
                <InputGroupText>Number of children</InputGroupText>
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
                <InputGroupText>Min. age of children</InputGroupText>
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
                <InputGroupText>Status</InputGroupText>
              </InputGroupAddon>
              <Dropdown direction="right" isOpen={this.state.isOpen} toggle={this.toggleDropdown}>
                <DropdownToggle caret>{this.state.status}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Status</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>PENDING</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>CONFIRMED</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>CANCELED</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>ONGOING</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>DONE</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>DONE_UNCONFIMRED</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>DONE_BY_NEWSTART</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>SITTER_NOT_CHECKIN</DropdownItem>
                  <DropdownItem onClick={this.toggleDropdownSelect}>EXPIRED</DropdownItem>
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
              size="sm"
              color="primary"
              onClick={() => this.saveUserInfo(item.id)}
            >
              Save
            </Button>
          </FormGroup>
        </td>
      </tr>
    );
  }

  openDropDown = (id) => {
    // console.log(event.target.innerText)
    if (this.state.open == null)
    {this.setState({
      open: id.id,
      editAddress: null,
      status: id.status
    });} else {
      this.setState({
        open: null,
      })
    }
  };

  searchFilter(){
    let result = [];
    if (this.state.requests){
    this.state.requests.map(item => {
      if(item.sittingAddress.toUpperCase().indexOf(this.state.key.toUpperCase()) != -1 || this.state.key == '' || 
      (item.user.nickname.toUpperCase().indexOf(this.state.key.toUpperCase()) != -1) || 
      (item.bsitter && item.bsitter.nickname.toUpperCase().indexOf(this.state.key.toUpperCase()) != -1) )
        result.push(item);
    })}
    return result;
  }

  render() {
    return (
      <Row>
        <ToastsContainer store={ToastsStore} position={"top_right"} lightBackground/>

        <Col xs="12" lg="12">

          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Search by Name/Address</InputGroupText>
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

          <Card>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr align="center">
                    {this.state.headers.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.searchFilter().map((item, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => this.openDropDown(item)}>
                        <td>{item.id}</td>
                        <td align="center">{moment(item.sittingDate).format('DD-MM-YYYY')}<br/>
                          {moment(item.startTime, [
                            moment.ISO_8601,
                            'HH:mm',
                          ]).format('HH:mm')} - {moment(item.endTime, [
                            moment.ISO_8601,
                            'HH:mm',
                          ]).format('HH:mm')}</td>
                        <td><b>{item.user.nickname}</b></td>
                        <td>
                          {item.bsitter
                            ? item.bsitter.nickname
                            : 'N/A'}
                        </td>
                        <td>{item.sittingAddress}</td>
                        <td>{formater(item.totalPrice)} VNĐ</td>
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
                      {item.id == this.state.open ? this.openList(item) : null}
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
