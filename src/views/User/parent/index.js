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
      district: '',
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

        if (this.selectedDistrict() == ''|| 
          item.address
            .toUpperCase()
            .indexOf(this.selectedDistrict().toUpperCase()) != -1)
        if (item.roleId == 2) 
        if (item.nickname.toUpperCase().indexOf(this.state.key.toUpperCase()) != -1 || this.state.key == '')
          result.push(item);
      });
    }
    return result;
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

  saveUserInfo = (item) => {
    let info = {};
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
    if (check) {Api.put('users/' + item, info).then((res) => {
      ToastsStore.success("Successfully updated!");
      window.location.reload(false);
    }).catch(e => {
      ToastsStore.error("Failed!");
    });
    } else ToastsStore.error("Invalid parameter!");
  }

  banAccount = (item) => {
    let info = {active: !item.active};
    Api.put('users/' + item.id, info).then((res) => {
      window.location.reload(false);
    }).catch(e => {
      ToastsStore.error("Failed!")
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
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>{child.age} tuổi</InputGroupText>
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
    Api.delete('childrens/' + id.toString()).catch(e => window.location.reload(false));
    window.location.reload(false)
  }

  saveChild = async (id) => {
    let body = {
      parentId: id,
      name: this.state.childName,
      age: this.state.childAge,
      image: this.state.image,
    }
    // console.log(body);
    await Api.post('childrens', body).catch(e => {
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
                  <Row>
                    <Col md='10' style={{paddingTop: 10}}><b>All children({item.parent.children.length})</b></Col>
                    <Col md='2'>
                    <Button type="submit" size="xs" color={!this.state.adding ? "success" : "danger"}
                      onClick={() => this.setState({adding: !this.state.adding})}>{!this.state.adding ? "+" : "-"}</Button>
                    
                    </Col>
                  </Row>
                </FormGroup>
            
            <Row>
            
            {(item.parent.children.length > 0) ? 
            item.parent.children.map(child => 
            <Col md='4' key={child.id}>
              <Row style={{paddingTop:10, paddingBottom: 10}}>
                <Col md='1'>
                  <img src={child.image } width="50" height="50" />
                </Col>
                <Col md='7' style={{backgroundColor:'', paddingLeft: 20, marginRight:0, paddingTop: 5}}>
                  <Col md='12'><b>{child.name}</b></Col>
                  <Col md='12'>{child.age} tuổi</Col>
                </Col>
                <Col md='2' style={{backgroundColor:'', marginLeft: -50, paddingTop: 10}}>
                <InputGroupAddon addonType="append" style={{cursor:'pointer'}}  
                  onClick={() => {if(window.confirm('Are you sure to remove this child?')){this.deleteChild(child.id)};}}>
                  <Button type="submit" size="xs" color="danger" 
                  onClick={() => {if(window.confirm('Are you sure to remove this child?')){this.deleteChild(child.id)};}}>X</Button>  
                </InputGroupAddon>
                </Col>
              </Row>
            {/* <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText  style={{width: 80}}>{child.name}</InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText >{child.age} years</InputGroupText>
                </InputGroupAddon>
                <InputGroupText>
                  <img src={child.image } width="50" height="50"/>
                </InputGroupText>
                <InputGroupAddon addonType="append" style={{cursor:'pointer'}}  
                  onClick={() => {if(window.confirm('Are you sure to remove this child?')){this.deleteChild(child.id)};}}>
                  <Button type="submit" size="xs" color="danger" 
                  onClick={() => {if(window.confirm('Are you sure to remove this child?')){this.deleteChild(child.id)};}}>X</Button>  
                </InputGroupAddon>
              </InputGroup>
            </FormGroup> */}
            </Col>)
            : <FormGroup>No children added</FormGroup>}
            </Row>
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
