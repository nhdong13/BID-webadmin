import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
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
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Time</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Enter user id"
            onChange={this.handleSearchInput}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <i className="fa fa-asterisk" onClick={() => this.submit()}></i>
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default Configuration;
