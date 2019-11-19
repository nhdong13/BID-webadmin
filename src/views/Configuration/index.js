import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
} from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configurations: [],
      headers: [],
    };
  }

  componentDidMount() {
    const header = [
      'Date/Time',
      '8:00 - 9:00',
      '9:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '12:00 - 13:00',
      '13:00 - 14:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
      '18:00 - 19:00',
      '19:00 - 20:00',
      '20:00 - 21:00',
      '21:00 - 22:00',
    ];
    this.setState({headers: header});
    Api.get('configuration').then((res) => {
      if (res) {
        let base = res[0]['price'];
        let requests = [];

        for (var i = 1; i <= 30; i++) {
          let temp = {};
          temp[1] = i;
          for (var j = 2; j <= 15; j++) {
            temp[j] = base;
            res.forEach((item) => {
              if (item['startTime'] != null) {
                const hour = parseInt(
                  item['startTime'][0] + item['startTime'][1],
                );
                if (hour == j + 6 && i == moment(item['date']).date())
                  temp[j] = item.price;
              }
            });
          }
          const newItem = Object.values(temp);
          requests.push(newItem);
        }
        if (requests.length > 0) {
          this.setState({ configurations: requests });
        }
      }
    });
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
                  {this.state.configurations.map((item, row) =>
                    <tr key={row}style={({width:500})}>{item.map((child, index) => 
                    <td key={(index + 1) + (row * 100)}>{formater(child)}</td>)}
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

export default Configuration;
