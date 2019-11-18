import React, { Component, Image } from 'react';
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
} from 'reactstrap';
import Api, { apiConfig } from '../../../api/api_helper';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      headers: [
        'User ID',
        "User's Fullname",
        'Phone number',
        'Number of children',
        'Address',
      ],
      editAddress: null,
      editPhone: null,
      editEmail: null,
    };
  }

  componentDidMount() {
    this.refresher();
  }

  refresher() {
    // setInterval(() =>
    Api.get('users/').then((res) => {

      this.setState({ users: res });
    });
    // }), 5000);
  }

  parentFilter() {
    let result = [];
    if (this.state.users) {
      this.state.users.map((item) => {
        if (item.roleId == 2) result.push(item);
      });
    }
    return result;
  }

  saveUserInfo = (item) => {
    let info = {};
    info.id = item;
    if (this.state.editAddress) info.address = this.state.editAddress;
    if (this.state.editEmail) info.email = this.state.editEmail;
    if (this.state.editPhone) info.phoneNumber = this.state.editPhone;
    // console.log(info)
    Api.put('users/'+ item, info).then(res => {
      window.location.reload(false);
    });
  }
  
  handleInputPress = (event) => {
    if (event.target.id == "phonenumber") this.setState({editPhone: event.target.value});
    if (event.target.id == "email") this.setState({editEmail: event.target.value});
    if (event.target.id == "address") this.setState({editAddress: event.target.value});
  }

  openList(item) {
    return (
      <tr>
        <td align="center" colSpan="100%">
            
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Phone Number</InputGroupText>
                </InputGroupAddon>
                <Input
                  id="phonenumber"
                  placeholder={item.phoneNumber}
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
                  <InputGroupText>Email</InputGroupText>
                </InputGroupAddon>
                <Input
                  type="email"
                  id="email"
                  placeholder={item.email}
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
                  <InputGroupText>Address</InputGroupText>
                </InputGroupAddon>
                <Input
                  id="address"
                  placeholder={item.address}
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
                  <b>All children({item.parent.children.length})</b>
                </InputGroup></FormGroup>

            {(item.parent.children.length > 0) ? 
            item.parent.children.map(child => 
            <FormGroup key={child.id}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>{child.name}</InputGroupText>
                </InputGroupAddon>
                <InputGroupText>
                  <img src={child.image } width="50" height="50"/>
                </InputGroupText>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-asterisk"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>)
            : <FormGroup>No children added</FormGroup>}

            <FormGroup className="form-actions">
              <Button type="submit" size="sm" color="primary" onClick={() => this.saveUserInfo(item.id)}>
                Save
              </Button>
            </FormGroup>
        </td>
      </tr>
    );
  };

  openDropDown = (id) => {
    // console.log(event.target.innerText)
    if (this.state.open == null)
    {this.setState({
      open: id,
      editAddress: null,
      editPhone: null,
      editEmail: null,
    });} else {
      this.setState({
        open: null,
      })
    }
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
                  {this.parentFilter().map((item, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => this.openDropDown(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.nickname}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          {item.parent.children[0]
                            ? item.parent.children.length
                            : 'N/A'}
                        </td>
                        <td>{item.address}</td>
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

export default Users;
