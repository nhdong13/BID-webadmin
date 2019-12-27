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
        BASE: res[0].baseAmount,
        UNDER_6_YEARS: res[1].baseAmount,
        UNDER_18_MONTHS: res[2].baseAmount,
        UNDER_6_MONTHS: res[3].baseAmount,
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
    ];
    for (let i = 1; i < 5; i++) {
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
    const { updatedPrice } = this.state;
    let check = true;
    updatedPrice.map(async (item, i) => {
      console.log('PHUC: updatePrice -> item', item);
      await Api.put('pricings/' + i.toString(), updatedPrice[i])
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
                      <InputGroupText>remindBeforeDuration_0</InputGroupText>
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
                      <InputGroupText>remindBeforeDuration_1</InputGroupText>
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
                      <InputGroupText>checkinTimeout</InputGroupText>
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
                      <InputGroupText>checkoutTimeout</InputGroupText>
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
                      <InputGroupText>timezone</InputGroupText>
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
                      <InputGroupText>maxTravelDistance</InputGroupText>
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
                      <InputGroupText>circleWeight</InputGroupText>
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
                      <InputGroupText>ratingWeight</InputGroupText>
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
                      <InputGroupText>distanceWeight</InputGroupText>
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
                      <InputGroupText>minimumFeedback</InputGroupText>
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
                      <InputGroupText>refundPercentage</InputGroupText>
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
                      <InputGroupText>officeHourStart</InputGroupText>
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
                      <InputGroupText>officeHourEnd</InputGroupText>
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
                      <InputGroupText>BASE</InputGroupText>
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
                      <InputGroupText>UNDER_6_YEARS</InputGroupText>
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
                      <InputGroupText>UNDER_18_MONTHS</InputGroupText>
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
                      <InputGroupText>UNDER_6_MONTHS</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="input ..."
                      id="UNDER_6_MONTHS"
                      value={this.state.UNDER_6_MONTHS}
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
                  <b>Base price</b>
                </Col>
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
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <b>Base</b>
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[0].baseAmount}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[0].baseAmount = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        id="UNDER_6_YEARS"
                        value={pricing[0].overtime}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[0].overtime = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[0].holiday}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[0].holiday = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col md="2"></Col>
                  </Row>

                  <Row>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <b>UNDER_6_YEARS</b>
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[1].baseAmount}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[1].baseAmount = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        id="UNDER_6_YEARS"
                        value={pricing[1].overtime}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[1].overtime = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[1].holiday}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[0].holiday = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col md="2"></Col>
                  </Row>

                  <Row>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <b>UNDER_18_MONTHS</b>
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[2].baseAmount}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[2].baseAmount = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        id="UNDER_6_YEARS"
                        value={pricing[2].overtime}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[2].overtime = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[2].holiday}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[2].holiday = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col md="2"></Col>
                  </Row>

                  <Row>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <b>UNDER_6_MONTHS</b>
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[3].baseAmount}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[3].baseAmount = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        id="UNDER_6_YEARS"
                        value={pricing[3].overtime}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[3].overtime = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
                        }}
                      />
                    </Col>
                    <Col
                      md="3"
                      align="center"
                      style={{ marginTop: 50, alignSelf: 'center' }}
                    >
                      <Input
                        placeholder="input ..."
                        value={pricing[3].holiday}
                        onChange={(v) => {
                          let tmpArray = pricing;
                          tmpArray[3].holiday = v.target.value;
                          this.setState({ updatedPrice: tmpArray });
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
