import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { read } from 'fs';
import Api from '../../api/api_helper';
import moment from 'moment';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class RegisterAccount extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      accountType: '',
      name: '',
      gender: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      workingday: 'MON,TUE,WED,THU,FRI',
      daytime: '08-17',
      evening: '17-20',
      minAge: 1,
      maxNumChild: 2,
      maxDistance: 10,
      image: '',
      childCount: 0,
      images: [],
      names: [],
      ages: [],
      isFile: false,
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  changeAccountType = (event) => {
    // console.log(event.target.value);
    this.setState({ accountType: event.target.value, 
    name: 'N/a',
    gender: 'N/a',
    dob: 'N/a',
    email: 'N/a',
    phone: 'N/a',
    address: 'N/a',
    workingday: 'MON,TUE,WED,THU,FRI',
    daytime: '08-17',
    evening: '17-20',
    image: '',
    minAge: 1,
    maxNumChild: 2,
    maxDistance: 10,});
  };

  changeChildCount = (e) => {
    this.setState({childCount: e.target.value});
  }

  changeHandler = async (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var fileReader = new FileReader();
    let profileArray = [];

    fileReader.onload = function(progressEvent) {
      var stringData = fileReader.result;
      profileArray = stringData.split('\n');
      if (profileArray.length == 7)
      this.setState({
        name: profileArray[0].split(': ')[1],
        gender: profileArray[1].split(': ')[1],
        dob: profileArray[2].split(': ')[1],
        email: profileArray[3].split(': ')[1],
        phone: profileArray[4].split(': ')[1],
        address: profileArray[5].split(': ')[1],
        isFile: true,
      })
      else ToastsStore.error("Invalid file!");;
    }.bind(this);
    fileReader.readAsText(file, 'UTF8-1');
  };
  registerBabysitter = () => {
    let body = {
      phoneNumber: this.state.phone,
      email: this.state.email,
      password: '12341234',
      nickname: this.state.name,
      gender: this.state.gender,
      dateOfBirth: moment(this.state.dob, "DD-MM-YYYY").format('YYYY-MM-DD'),
      address: this.state.address,
      roleId: 3,
      active: 1,
      weeklySchedule: this.state.workingday,
      daytime: this.state.daytime,
      evening: this.state.evening,
      minAgeOfChildren: this.state.minAge,
      maxNumOfChildren: this.state.maxNumChild,
      maxTravelDistance: this.state.maxDistance,
      averageRating: 0,
      totalFeedback: 0,
      image: this.state.image.toString(),
    }
    if (!this.state.image || this.state.image == '' ) ToastsStore.error("Failed to register!")
    else Api.post('users/bsitterRegister', body).then(res => {
      window.location.reload(false);
    }).catch(e => ToastsStore.error("Failed to register!"));
  }

  registerParent = () => {
    let child = [];
    this.state.names.forEach((item, index) => {
      let temp = { image: this.state.images[index].toString(), name: this.state.names[index], 
        age: this.state.ages[index]}
      child.push(temp);
    });
    let body = {
      phoneNumber: this.state.phone,
      email: this.state.email,
      password: '12341234',
      nickname: this.state.name,
      gender: this.state.gender,
      dateOfBirth: moment(this.state.dob, "DD-MM-YYYY").format('YYYY-MM-DD'),
      address: this.state.address,
      roleId: 2,
      active: 1,
      image: this.state.image.toString(),
      children: child,
    }
    Api.post('users/parentRegister', body).then(res => {
      window.location.reload(false);
    }).catch(e => ToastsStore.error("Failed to register!"));
  }

  inputChange = async(e) => {
    if (e.target.name == 'workingday') this.setState({workingday: e.target.value});
    if (e.target.name == 'daytime') this.setState({daytime: e.target.value});
    if (e.target.name == 'evening') this.setState({evening: e.target.value});
    if (e.target.name == 'minage') this.setState({minAge: e.target.value});
    if (e.target.name == 'maxChild') this.setState({maxNumChild: e.target.value});
    if (e.target.name == 'maxDistance') this.setState({maxDistance: e.target.value});
  }

  changeHandlerImage = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
      this.setState({image: progressEvent.target.result});
    }.bind(this);
    fileReader.readAsDataURL(file);
    // fileReader.readAsText(file, 'UTF8-1');
  }
  changeChildName = (e) => {
    const id = e.target.id;
    let tmp = this.state.names;
    tmp[id] = e.target.value;
    this.setState({names:tmp})
  }
  changeChildAge = (e) => {
    const id = e.target.id;
    let tmp = this.state.ages;
    tmp[id] = e.target.value;
    this.setState({ages:tmp})
  }
  renderlist = (counter) => {
    let list = [], a=[1,2,3,4];
    for(let i=0; i < counter; i++) {
      list.push(
        <FormGroup row key={i} alignitems="right" style={{marginTop: 30}}>
          <Col md="3"></Col>
          <Col md="3">
            <Input
              type="text"
              id={i}
              placeholder="Name"
              onChange={(e) => this.changeChildName(e)}
            />
          </Col>
          <Col md="1">
            <Input
              type="text"
              id={i}
              placeholder="Age"
              onChange={(e) => this.changeChildAge(e)}
            />
          </Col>
          <Col md="3">
            <Input
              type="file"
              id = {i}
              onChange={(e) => this.changeHandlerImages(e)}
            />
            {this.state.images[i] != '' && this.state.images[i] &&
            <img src={this.state.images[i]} width="150"/>}
          </Col>
        </FormGroup>
      )
    }
  return list;
  }

  changeHandlerImages = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    let id = evt.target.id;
    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
      this.setState({images: this.state.images.concat(progressEvent.target.result)});
    }.bind(this);
    fileReader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <ToastsContainer store={ToastsStore} position={"top_right"} lightBackground/>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <Row style={{ alignItems: 'center' }}>
                  <Col xs="2">
                    <strong>Register Form</strong> for{' '}
                  </Col>
                  <Col xs="4">
                    <Input
                      type="select"
                      onChange={this.changeAccountType}
                      value={this.state.accountType}
                    >
                      <option value="">Please select</option>
                      <option value="Babysitter">Babysitter</option>
                      <option value="Parent">Parent</option>
                    </Input>
                  </Col>
                </Row>
                {this.state.accountType != '' && (
                  <FormGroup row style={{marginTop: 30}}>
                    <Col md="3">
                      <Label htmlFor="file-input">File input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="file"
                        onChange={(e) => this.changeHandler(e)}
                      />
                    </Col>
                  </FormGroup>
                )}
              </CardHeader>
              {this.state.isFile && (
              <React.Fragment>
              <CardBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabled-input">Avatar</Label>
                    </Col>
                    <Col xs="9" md="6">
                      <Input
                        type="file"
                        onChange={(e) => this.changeHandlerImage(e)}
                      />
                      {this.state.image != '' &&
                      <img src={this.state.image} width="150"/>}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabled-input">User's Fullname</Label>
                    </Col>
                    <Col xs="9" md="6">
                      <Input
                        type="text"
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="N/a"
                        disabled
                        value={this.state.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabled-input">Gender</Label>
                    </Col>
                    <Col xs="9" md="6">
                      <Input
                        type="text"
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="N/a"
                        disabled
                        value={this.state.gender}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabled-input">Date of birth</Label>
                    </Col>
                    <Col xs="9" md="6">
                      <Input
                        type="text"
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="N/a"
                        disabled
                        value={this.state.dob}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabled-input">Email</Label>
                    </Col>
                    <Col xs="9" md="6">
                      <Input
                        type="text"
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="N/a"
                        disabled
                        value={this.state.email}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabled-input">Phonenumber</Label>
                    </Col>
                    <Col xs="9" md="6">
                      <Input
                        type="text"
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="N/a"
                        disabled
                        value={this.state.phone}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="disabled-input">Address</Label>
                    </Col>
                    <Col xs="9" md="6">
                      <Input
                        type="text"
                        id="disabled-input"
                        name="disabled-input"
                        placeholder="N/a"
                        disabled
                        value={this.state.address}
                      />
                    </Col>
                  </FormGroup>
                  {this.state.accountType != '' && this.state.accountType == 'Babysitter' && (<div>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="disabled-input">Working day</Label>
                      </Col>
                      <Col xs="9" md="6">
                        <Input
                          type="text"
                          disabled
                          name="workingday"
                          defaultValue={this.state.workingday}
                          onChange={(e) => this.inputChange(e)}
                        />
                      </Col>
                    </FormGroup>
                    {/* <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="disabled-input">Daytime</Label>
                      </Col>
                      <Col xs="9" md="6">
                        <Input
                          type="text"
                          defaultValue={this.state.daytime}
                          name="daytime"
                          onChange={(e) => this.inputChange(e)}
                        />
                      </Col>
                    </FormGroup> */}
                    {/* <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="disabled-input">Evening</Label>
                      </Col>
                      <Col xs="9" md="6">
                        <Input
                          type="text"
                          defaultValue={this.state.evening}
                          name="evening"
                          onChange={(e) => this.inputChange(e)}
                        />
                      </Col>
                    </FormGroup> */}
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="disabled-input">Min. age of children</Label>
                      </Col>
                      <Col xs="9" md="6">
                        <Input
                          type="text"
                          defaultValue={this.state.minAge}
                          name="minage"
                          onChange={(e) => this.inputChange(e)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="disabled-input">Max. number of children</Label>
                      </Col>
                      <Col xs="9" md="6">
                        <Input
                          type="text"
                          defaultValue={this.state.maxNumChild}
                          name="maxChild"
                          onChange={(e) => this.inputChange(e)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="disabled-input">Max. distance</Label>
                      </Col>
                      <Col xs="9" md="6">
                        <Input
                          type="text"
                          defaultValue={this.state.maxDistance}
                          name="maxDistance"
                          onChange={(e) => this.inputChange(e)}
                        />
                      </Col>
                    </FormGroup>
                  </div>)}
                {this.state.accountType == 'Parent' &&
                <div><Row style={{ alignItems: 'center' }}>
                  <Col md="3">
                    <strong>Number of children</strong> {' '}
                  </Col>
                  <Col xs="9" md="6">
                    <Input
                      type="select"
                      onChange={this.changeChildCount}
                      value={this.state.childCount}
                    >
                      <option value="">Please select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Input>
                  </Col>
                </Row>
                {this.state.childCount > 0 && this.renderlist(this.state.childCount)}</div>}
              </CardBody>
              

              <CardFooter>
                {this.state.accountType == 'Babysitter' && 
                <Button type="submit" size="md" color="primary" onClick={()=>this.registerBabysitter()}>
                  <i className="fa fa-dot-circle-o"></i> Register
                </Button>}
                {this.state.accountType == 'Parent' && 
                <Button type="submit" size="md" color="primary" onClick={()=>this.registerParent()}>
                  <i className="fa fa-dot-circle-o"></i> Register
                </Button>}
              </CardFooter></React.Fragment>)}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegisterAccount;
