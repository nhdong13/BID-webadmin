import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';
import colors from '../../assets/Color';

class SittingRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      headers: [],
    };
  }

  componentWillMount() {
    const header = [
      'Sitting ID',
      'Sitting Date',
      'Start time',
      'End time',
      'Created User',
      'Babysitter',
      'Address',
      'Price',
      'Status',
    ];
    this.setState({headers: header});
    this.refresher();
    
  }

  refresher(){
    setInterval(() =>
    Api.get('sittingRequests/all').then((res) => {
      this.setState({requests : res});
    }), 1000);
  }

  textColorByStatus(text) {
    if (text == 'PENDING') return colors.pending;
    if (text == 'DONE') return colors.done;
    if (text == 'CANCELED') return colors.canceled;
    if (text == 'CONFIRMED') return colors.confirmed;
    return colors.overlap;
  }

  render() {
    return (
      <Row>
        <Col xs="12" lg="12">
          <Card>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    {
                      this.state.headers.map((item, index) => 
                        <th key={index}>{item}</th>                        
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  {this.state.requests.map((item, index) =>
                    <tr key={index}>
                    <td>{item.id}</td>
                    <td>{moment(item.sittingDate).format('DD-MM-YYYY')}</td>
                    <td>{moment(item.startTime, [moment.ISO_8601, 'HH:mm']).format('HH:mm')}</td>
                    <td>{moment(item.endTime, [moment.ISO_8601, 'HH:mm']).format('HH:mm')}</td>
                    <td>{item.user.nickname}</td>
                    <td>{(item.bsitter.nickname) ? item.bsitter.nickname : 'N/A'}</td>
                    <td>{item.sittingAddress}</td>
                    <td>{formater(item.totalPrice)}</td>
                    <td><p style={{color: (this.textColorByStatus(item.status))}}>{item.status}</p></td>
                    </tr>    
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SittingRequest;
