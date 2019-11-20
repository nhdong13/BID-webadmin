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
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';
import colors from '../../assets/Color';
import { thisExpression } from '@babel/types';

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
      'Address',
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
    console.log(info);
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

  openList(list) {
    return (
      <tr>
        {list.map((item, index) => (
          <td align="left" colSpan="100%">
            <b style={{ marginRight: '150px' }}>Invitation {index + 1}</b>
            <b style={{ color: this.textColorByStatus(item.status) }}>
              {item.status}
            </b>
            <br />
            Receiver: {item.user.nickname}
          </td>
        ))}
      </tr>
    );
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

  searchFilter() {
    let result = [];
    if (this.state.requests) {
      this.state.requests.map((item) => {
        if (
          item.sittingAddress
            .toUpperCase()
            .indexOf(this.state.key.toUpperCase()) != -1 ||
          this.state.key == ''
        )
          result.push(item);
      });
    }
    return result;
  }

  render() {
    return (
      <Row>
        <Col xs="12" lg="12">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Search by Address</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Enter sitting address"
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
                <thead align="center">
                  <tr>
                    {this.state.headers.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.searchFilter().map((item, index) => (
                    <React.Fragment key={index}>
                      {item.invitations.length > -1 && (
                        <tr onClick={() => this.openDropDown(item)}>
                          <td>{item.id}</td>
                          <td style={{ width: 200 }} align="center">
                            <b>
                              {moment(item.sittingDate).format('DD-MM-YYYY')}{' '}
                            </b>
                            <br />
                            {moment(item.startTime, [
                              moment.ISO_8601,
                              'HH:mm',
                            ]).format('HH:mm')}
                            -{' '}
                            {moment(item.endTime, [
                              moment.ISO_8601,
                              'HH:mm',
                            ]).format('HH:mm')}
                          </td>
                          <td style={{ width: 200 }} align="center">
                            {item.user.nickname}
                          </td>
                          <td>{item.sittingAddress}</td>
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
                      )}
                      {/* {item.id == this.state.open */}
                        {this.openList(item.invitations)}
                        {/* : null} */}
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
