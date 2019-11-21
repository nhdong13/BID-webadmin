import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table, FormGroup, InputGroup, InputGroupAddon, 
  InputGroupText, Input, Button, Jumbotron } from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
    };
  }

  handleSearchInput = (event) => {
    // console.log(event.target.value);
    this.setState({key: event.target.value});
  }

  submit = () => {
    let body = { time: this.state.key };
    Api.post('configuration/changeSystemTime', body);
  }

  render() {
    return (
      <Card style={({alignItems: "left"})}><CardBody>
      <Jumbotron>
      <h1>Time Configuration</h1>
      <hr className="my-2" />
      <FormGroup style={({marginTop: 30})}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Time</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="input time to change the system clock"
            onChange={this.handleSearchInput}
          />
          <InputGroupAddon addonType="append">
            <Button type="submit" size="md" color="primary" 
              onClick={() => {if(window.confirm('Are you sure?')){this.submit()};}}>
              Save
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <p style={({marginTop: 30})}>Ex: 2015-11-10 07:59:45</p>
      </FormGroup>
      </Jumbotron>
      </CardBody></Card>
    );
  }
}

export default Configuration;
