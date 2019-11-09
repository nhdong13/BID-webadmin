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

  componentDidMount() {
    const header = [
      'Sitting ID',
      'Sitting Date',
      'Start time',
      'End time',
      'Address',
      'Price',
      'Status',
      'Created User',
      'Babysitter',
    ];
    this.setState({headers: header});
    this.refresher();
    
  }

  refresher(){
    setInterval(() =>
    Api.get('sittingRequests/all').then((res) => {
      if (res) {
        let requests = [];
        res.map((item) => {
          let temp = {};
          for (var key in item) {
            if (key == 'id') temp[key] = item[key];
            if (key == 'sittingDate')
              temp[key] = moment(item[key]).format('DD-MM-YYYY');
            if (key == 'startTime')
              temp[key] = moment(item[key], [moment.ISO_8601, 'HH:mm']).format(
                'HH:mm',
              );
            if (key == 'endTime')
              temp[key] = moment(item[key], [moment.ISO_8601, 'HH:mm']).format(
                'HH:mm',
              );
            if (key == 'sittingAddress') temp[key] = item[key];
            if (key == 'totalPrice') temp[key] = formater(item[key]);
            if (key == 'user' && item[key] != null)
              temp[key] = item[key]['nickname'];
            if (key == 'bsitter')
              item[key] == null
                ? (temp[key] = 'N/A')
                : (temp[key] = item[key]['nickname']);
            if (key == 'status') temp[key] = item[key];
          }
          // console.log(temp);
          const newItem = Object.values(temp);
          // const newItem = Object.values(item);
          // newItem.splice(9, 2);
          // console.log("PHUC: TableList -> newItem", newItem)
          requests.push(newItem);
        });
        if (requests.length > 0) {
          // console.log('PHUC: TableList -> requests', requests);
          this.setState({requests : requests});
          console.log(requests)
        }
      }
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
                  {this.state.requests.map((item, row) =>
                    <tr key={row}>{item.map((child, index) => 
                    <td key={(index + 1) + (row * 100)}>{child}</td>)}
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
