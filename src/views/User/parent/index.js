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
import Popup from 'reactjs-popup';
import {ToastsContainer, ToastsStore} from 'react-toasts';

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
        'Status',
        ''
      ],
      editAddress: null,
      editPhone: null,
      editEmail: null,
      key: '',
      adding: false,
      image: '',
      childName: '',
      childAge: '',
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
        if (item.roleId == 2) 
        if(item.id == this.state.key || this.state.key == '')
          result.push(item);
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

  banAccount = (item) => {
    let info = {active: !item.active};
    Api.put('users/' + item.id, info).then((res) => {
      window.location.reload(false);
    });
  };
  
  handleInputPress = (event) => {
    if (event.target.id == "phonenumber") this.setState({editPhone: event.target.value});
    if (event.target.id == "email") this.setState({editEmail: event.target.value});
    if (event.target.id == "address") this.setState({editAddress: event.target.value});
  }

  handleSearchInput = (event) => {
    // console.log(event.target.value);
    this.setState({key: event.target.value});
  }
  
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
        <ToastsContainer store={ToastsStore} position={"top_right"} lightBackground/>
        <Col xs="12" lg="12">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Search by UserID</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Enter user id"
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
                        <td>{item.active ? <b style={({color: 'green'})}>Active</b> 
                        : <b style={({color: 'red'})}>Banned</b>}</td>
                        <td>
                        <Popup trigger={<button className="btn btn-pill btn-block btn-info">Edit</button>} modal>
                        {this.openList(item)}
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
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText style={({width:300})}><b>Phone Number</b></InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon addonType="prepend">
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
        </td>
      </tr>
    );
  }

  deleteChild = (id) => {
    console.log(id)
    Api.delete('childrens/' + id.toString()).catch(e => window.location.reload(false));
  }

  saveChild = (id) => {
    let body = {
      parentId: id,
      name: this.state.childName,
      age: this.state.childAge,
      image: this.state.image,
    }
    console.log(body);
    Api.post('childrens', body).catch(e => {
      ToastsStore.error("Failed!");
    });
    this.refreshNullChild();
  }

  refreshNullChild = () => {
    this.setState({image: '',
    childName: '',
    childAge: '', adding: false});
    window.location.reload(false);
  }

  openList(item) {
    return (
      <div style={({margin:50, paddingTop:50})}>
        <h1>{item.nickname}</h1>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Phone Number</InputGroupText>
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
                  <InputGroupText>Email</InputGroupText>
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
                  <InputGroupText>Address</InputGroupText>
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
                  <Row>
                    <Col md='10' style={{paddingTop: 10}}><b>All children({item.parent.children.length})</b></Col>
                    <Col md='2'>
                    <Button type="submit" size="xs" color={!this.state.adding ? "success" : "danger"}
                      onClick={() => this.setState({adding: !this.state.adding})}>{!this.state.adding ? "+" : "-"}</Button>
                    
                    </Col>
                  </Row>
                </FormGroup>

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
                <InputGroupAddon addonType="append"  onClick={() => {if(window.confirm('Are you sure to remove this child?')){this.deleteChild(child.id)};}}>
                  <InputGroupText>
                    <i className="fa fa-remove"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>)
            : <FormGroup>No children added</FormGroup>}

            {this.state.adding &&
            <FormGroup row alignitems="right">
              <Row><Col md="4">
                <b>Name</b>
                <Input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => this.setState({ childName: e.target.value})}
                />
              </Col>
              <Col md="2">
                <b>Age</b>
                <Input
                  type="text"
                  placeholder="Age"
                  onChange={(e) => this.setState({ childAge: e.target.value})}
                />
              </Col>
              <Col md="4">
                <b>Avatar</b>
                <Input
                  type="file"
                  style={{paddingTop: 5}}
                  onChange={(e) => this.changeHandlerImages(e)}
                />
                {this.state.image != '' && this.state.image && 
                  <img src={this.state.image} width="150"/>}
              </Col>
              <Col md='2'style={{paddingTop: 10}}>
                <Button type="submit" size="xs" color="success" 
                  onClick={() => this.saveChild(item.id)}>Add</Button>
              </Col>
              </Row>
            </FormGroup>
            }

            <FormGroup className="form-actions" align="center">
              <Button type="submit" size="lg" color="primary" 
                onClick={() => {if(window.confirm('Are you sure?')){this.saveUserInfo(item.id)};}}>
                Save
              </Button>
              {item.active ? 
              <Button
                  type="submit"
                  size="lg"
                  style={({margin: 30})}
                  color="danger"
                  onClick={() => {if(window.confirm('Are you sure?')){this.banAccount(item)};}}
              >Ban this account</Button>
                : <Button
                type="submit"
                size="lg"
                style={({margin: 30})}
                color="danger"
                onClick={() => {if(window.confirm('Are you sure?')){this.banAccount(item)};}}
              >Unlock this account</Button>}
            </FormGroup>
        </div>
    );
  };

  changeHandlerImages = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    let id = evt.target.id;
    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
      this.setState({image: progressEvent.target.result});
    }.bind(this);
    fileReader.readAsDataURL(file);
  }

}

export default Users;
