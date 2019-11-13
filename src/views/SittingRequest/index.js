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
    };
  }

  componentWillMount() {
    const header = [
      'Sitting ID',
      'Sitting Date',
      'Start time',
      'End time',
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
    console.log(info)
    Api.put('sittingRequests/' + item, info).then((res) => {
      window.location.reload(false);
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
    this.setState({
      open: id.id,
      editAddress: null,
      status: id.status
    });
  };

  render() {
    return (
      <Row>
        <Col xs="12" lg="12">
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
                  {this.state.requests.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => this.openDropDown(item)}>
                        <td>{item.id}</td>
                        <td>{moment(item.sittingDate).format('DD-MM-YYYY')}</td>
                        <td>
                          {moment(item.startTime, [
                            moment.ISO_8601,
                            'HH:mm',
                          ]).format('HH:mm')}
                        </td>
                        <td>
                          {moment(item.endTime, [
                            moment.ISO_8601,
                            'HH:mm',
                          ]).format('HH:mm')}
                        </td>
                        <td>{item.user.nickname}</td>
                        <td>
                          {item.bsitter.nickname
                            ? item.bsitter.nickname
                            : 'N/A'}
                        </td>
                        <td>{item.sittingAddress}</td>
                        <td>{formater(item.totalPrice)}</td>
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
