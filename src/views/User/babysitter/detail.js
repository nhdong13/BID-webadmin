import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Input,
} from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
      <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Phone Number</InputGroupText>
              </InputGroupAddon>
              {/* <Input
                id="phonenumber"
                placeholder={item.phoneNumber}
                onChange={this.handleInputPress}
              /> */}
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-user"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
      </div>
    );
  }
}

export default Detail;
