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
import { ToastsContainer, ToastsStore } from 'react-toasts';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      remindBeforeDuration_0: 0,
      remindBeforeDuration_1: 0,
      checkinTimeout: 0,
      checkoutTimeout: 0,
      timezone: 'Asia/Bangkok',
      maxTravelDistance: 0,
      circleWeight: 0,
      ratingWeight: 0,
      distanceWeight: 0,
      minimumFeedback: 0,
      refundPercentage: 90,
      officeHourStart: '8:00',
      officeHourEnd: '17:00',
      UNDER_6_MONTHS: 0,
      BASE: 0,
      UNDER_18_MONTHS: 0,
      UNDER_6_YEARS: 0,
      pricing: null,
      updatedPrice: [],
      updatedHoliday: 0,
      updatedOvertime: 0,
      skill: 0,
      cert: 0,
    };
  }

  componentDidMount() {
    Api.get('configuration/').then((res) =>
      this.setState({
        remindBeforeDuration_0: res.remindBeforeDuration_0,
        remindBeforeDuration_1: res.remindBeforeDuration_1,
        checkinTimeout: res.checkinTimeout,
        checkoutTimeout: res.checkoutTimeout,
        timezone: res.timezone,
        maxTravelDistance: res.maxTravelDistance,
        circleWeight: res.circleWeight,
        ratingWeight: res.ratingWeight,
        distanceWeight: res.distanceWeight,
        minimumFeedback: res.minimumFeedback,
        refundPercentage: res.refundPercentage,
        officeHourStart: res.officeHourStart,
        officeHourEnd: res.officeHourEnd,
      }),
    );
    Api.get('pricings').then((res) => {
      this.setState({
        pricing: res,
        updatedPrice: res,
        updatedHoliday: res[0].holiday,
        updatedOvertime: res[0].overtime,
        BASE: res[0].baseAmount,
        UNDER_6_YEARS: res[1].baseAmount,
        UNDER_18_MONTHS: res[2].baseAmount,
        UNDER_6_MONTHS: res[3].baseAmount,
        skill: res[4].baseAmount,
        cert: res[5].baseAmount,
      });
    });
    // console.log(res));
  }

  handleSearchInput = (event) => {
    // console.log(event.target.value);
    this.state[event.target.id] = event.target.value;
    this.forceUpdate();
    // this.setState({event.target.id: event.target.value});
  };

  submit = async () => {
    let body = {
      remindBeforeDuration_0: this.state.remindBeforeDuration_0,
      remindBeforeDuration_1: this.state.remindBeforeDuration_1,
      checkinTimeout: this.state.checkinTimeout,
      checkoutTimeout: this.state.checkoutTimeout,
      timezone: this.state.timezone,
      maxTravelDistance: this.state.maxTravelDistance,
      circleWeight: this.state.circleWeight,
      ratingWeight: this.state.ratingWeight,
      distanceWeight: this.state.distanceWeight,
      minimumFeedback: this.state.minimumFeedback,
      refundPercentage: this.state.refundPercentage,
      officeHourStart: this.state.officeHourStart,
      officeHourEnd: this.state.officeHourEnd,
    };
    // console.log(body);
    let check = true;
    await Api.put('configuration/1', body)
      .then((res) => {})
      .catch((e) => {
        check = false;
      });
    let tmp = [
      this.state.BASE,
      this.state.UNDER_6_YEARS,
      this.state.UNDER_18_MONTHS,
      this.state.UNDER_6_MONTHS,
      this.state.skill,
      this.state.cert,
    ];
    for (let i = 1; i < 7; i++) {
      let pricingsBody = { baseAmount: tmp[i - 1] };
      await Api.put('pricings/' + i.toString(), pricingsBody)
        .then((res) => {})
        .catch((e) => {
          check = false;
        });
    }
    if (!check) {
      ToastsStore.error('Invalid parameter!');
      this.componentDidMount();
    } else {
      ToastsStore.success('Successfully updated!');
      this.componentDidMount();
    }
  };

  updatePrice = async () => {
    const { updatedPrice, updatedHoliday, updatedOvertime } = this.state;
    let check = true;
    const tmp = { holiday: updatedHoliday, overtime: updatedOvertime };
    updatedPrice.map(async (item, i) => {
      await Api.put('pricings/' + (i + 1).toString(), tmp)
        .then((res) => {})
        .catch((e) => {
          check = false;
        });
    });

    if (!check) {
      ToastsStore.error('Invalid parameter!');
      this.componentDidMount();
    } else {
      ToastsStore.success('Successfully updated!');
      this.componentDidMount();
    }
  };

  render() {
    const { pricing } = this.state;
    let { updatedPrice } = this.state;
    return (
      <Card style={{ alignItems: 'left' }}>
        <ToastsContainer
          store={ToastsStore}
          position={'top_right'}
          lightBackground
        />
        <CardBody>
          <Jumbotron>
            <h1>System Setting</h1>
            <hr className="my-2" />
            <FormGroup style={{ marginTop: 30 }}>
              <Row>
                <Col md="6">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>remindBeforeDuration_0</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="remindBeforeDuration_0"
                      value={this.state.remindBeforeDuration_0}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>remindBeforeDuration_1</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="remindBeforeDuration_1"
                      value={this.state.remindBeforeDuration_1}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>checkinTimeout</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="checkinTimeout"
                      value={this.state.checkinTimeout}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>checkoutTimeout</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="checkoutTimeout"
                      value={this.state.checkoutTimeout}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>timezone</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="timezone"
                      value={this.state.timezone}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>maxTravelDistance</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="maxTravelDistance"
                      value={this.state.maxTravelDistance}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>

                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>circleWeight</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="circleWeight"
                      value={this.state.circleWeight}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>ratingWeight</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="ratingWeight"
                      value={this.state.ratingWeight}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>distanceWeight</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="distanceWeight"
                      value={this.state.distanceWeight}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                </Col>
                <Col md="6">
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>minimumFeedback</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="minimumFeedback"
                      value={this.state.minimumFeedback}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>refundPercentage</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="refundPercentage"
                      value={this.state.refundPercentage}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>officeHourStart</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="officeHourStart"
                      value={this.state.officeHourStart}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>officeHourEnd</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="officeHourEnd"
                      value={this.state.officeHourEnd}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>

                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>BASE</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="BASE"
                      value={this.state.BASE}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>

                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>UNDER_6_YEARS</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="UNDER_6_YEARS"
                      value={this.state.UNDER_6_YEARS}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>

                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>UNDER_18_MONTHS</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="UNDER_18_MONTHS"
                      value={this.state.UNDER_18_MONTHS}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>

                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>UNDER_6_MONTHS</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="UNDER_6_MONTHS"
                      value={this.state.UNDER_6_MONTHS}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>SKILL</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="skill"
                      value={this.state.skill}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                  <InputGroup style={{ marginTop: 10 }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText style={{width: 200}}>CERT</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="cert"
                      value={this.state.cert}
                      onChange={this.handleSearchInput}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col align="center" style={{ marginTop: 50 }}>
                  <Button
                    type="submit"
                    size="lg"
                    color="primary"
                    onClick={() => {
                      if (window.confirm('Are you sure?')) {
                        this.submit();
                      }
                    }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
              <hr />
              <h1>Price setting</h1>

              <Row>
                <Col md="3"></Col>
                <Col
                  md="3"
                  align="center"
                  style={{ marginTop: 50, alignSelf: 'center' }}
                >
                  <b>Overtime</b>
                </Col>
                <Col
                  md="3"
                  align="center"
                  style={{ marginTop: 50, alignSelf: 'center' }}
                >
                  <b>Holiday</b>
                </Col>
                <Col md="2"></Col>
              </Row>

              {pricing && (
                <React.Fragment>
                  <Row>
                    <Col md="3"></Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        id="UNDER_6_YEARS"
                        value={this.state.updatedOvertime}
                        onChange={(v) =>
                          this.setState({ updatedOvertime: v.target.value })
                        }
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={this.state.updatedHoliday}
                        onChange={(v) => {
                          this.setState({ updatedHoliday: v.target.value });
                        }}
                      />
                    </Col>
                    <Col md="2"></Col>
                  </Row>

                  <Row>
                    <Col align="center" style={{ marginTop: 50 }}>
                      <Button
                        type="submit"
                        size="lg"
                        color="primary"
                        onClick={() => {
                          if (window.confirm('Are you sure?')) {
                            this.updatePrice();
                          }
                        }}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </FormGroup>
          </Jumbotron>
        </CardBody>
      </Card>
    );
  }
}

export default Configuration;
