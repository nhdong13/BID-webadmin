import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Jumbotron,
} from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
  ToastContainer,
} from 'react-toasts';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      currentTime: moment(),
      hour: moment().format('HH'),
      month: moment().format('MM'),
      year: moment().format('YYYY'),
      day: moment().format('DD'),
      min: moment().format('mm'),
      sec: moment().format('ss'),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentTime: moment(this.state.currentTime).add(1, 'second'),
      });
    }, 1000);
  }

  handleSearchInput = (event) => {
    // console.log(event.target.value);
    this.setState({ key: event.target.value });
  };

  submit = () => {
    let body = { time: this.state.key };
    Api.post('configuration/changeSystemTime', body);
  };

  newSubmit = () => {
    const { hour, min, sec, year, month, day } = this.state;
    const newTime =
      year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    let body = { time: newTime };
    let test = moment(newTime);
    if (test._d == 'Invalid Date') ToastsStore.error('Invalid date!');
    else {
      Api.post('configuration/changeSystemTime', body);
      ToastsStore.success("Server's time is updated!");
    }
  };

  render() {
    return (
      <Card style={{ alignItems: 'left' }}>
        <ToastsContainer
          store={ToastsStore}
          position={'top_right'}
          lightBackground
        />
        <CardBody>
          <Jumbotron>
            <Row>
              <Col sm="8">
                <h1>Time Configuration</h1>
              </Col>
              <Col sm="4">
                <h2 style={{ color: 'gray' }}>
                  {moment().format('DD-MM-YYYY HH:mm:ss')}
                </h2>
              </Col>
            </Row>
            <hr className="my-2" />
            <FormGroup style={{ marginTop: 30 }}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText style={{width: 200}}>Time</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input time to change the system clock"
                  defaultValue={moment().format('YYYY-MM-DD HH:mm:ss')}
                  onChange={this.handleSearchInput}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    type="submit"
                    size="md"
                    color="primary"
                    onClick={() => {
                      if (window.confirm('Are you sure?')) {
                        this.submit();
                      }
                    }}
                  >
                    Save
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <p style={{ marginTop: 30 }}>Format: YYYY-MM-DD HH:mm:ss</p>
              <p style={{ marginTop: 30 }}>Ex: 2015-11-10 07:59:45</p>
            </FormGroup>
            <hr
              className="my-2"
              style={{ paddingTop: 50, paddingBottom: 50 }}
            />
            <Row>
              <Col sm="1">Hour</Col>
              <Col sm="3">
                <Input
                  defaultValue={moment().format('HH')}
                  onChange={(e) => this.setState({ hour: e.target.value })}
                />
              </Col>
              <Col sm="1">Min.</Col>
              <Col sm="3">
                <Input
                  defaultValue={moment().format('mm')}
                  onChange={(e) => this.setState({ min: e.target.value })}
                />
              </Col>
              <Col sm="1">Second</Col>
              <Col sm="3">
                <Input
                  defaultValue={moment().format('ss')}
                  onChange={(e) => this.setState({ sec: e.target.value })}
                />
              </Col>
            </Row>
            <Row style={{ paddingTop: 40 }}>
              <Col sm="1">Day</Col>
              <Col sm="3">
                <Input
                  defaultValue={moment().format('DD')}
                  onChange={(e) => this.setState({ day: e.target.value })}
                />
              </Col>
              <Col sm="1">Month</Col>
              <Col sm="3">
                <Input
                  defaultValue={moment().format('MM')}
                  onChange={(e) => this.setState({ month: e.target.value })}
                />
              </Col>
              <Col sm="1">Year</Col>
              <Col sm="3">
                <Input
                  defaultValue={moment().format('YYYY')}
                  onChange={(e) => this.setState({ year: e.target.value })}
                />
              </Col>
            </Row>
            <Row style={{ paddingTop: 30 }}>
              <Col align="center">
                <Button
                  type="submit"
                  size="lg"
                  color="primary"
                  onClick={() => {
                    if (window.confirm('Are you sure?')) {
                      this.newSubmit();
                    }
                  }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Jumbotron>
        </CardBody>
      </Card>
    );
  }
}

export default Configuration;
