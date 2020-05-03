import React, { Component } from 'react';
import { Button, Badge, Card, Label, Input, 
 CardBody,FormGroup, InputGroup, InputGroupAddon, InputGroupText, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
  ToastContainer,
} from 'react-toasts';

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certs: [],
      headers: [],
      newCertName: null,
      newCertVname: null,
      newCertPoint: null,
      reset: true,
    };
  }

  componentDidMount(){
    Api.get('certs').then(res => {this.setState({certs: res})});
  }

  saveCert = () => {
    if (!this.state.newCertName || !this.state.newCertVname || !this.state.newCertPoint) return;
    let info = {};
    info.name = this.state.newCertName;
    info.vname = this.state.newCertVname;
    info.point = this.state.newCertPoint;
    info.active = true;

    Api.post('certs', info).then((res) => {
      if (res.name == info.name) {
        ToastsStore.success('Successfully saved!');
      } else {
        ToastsStore.error('Failed to save! Try again');
      }
      this.componentDidMount();
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <ToastsContainer
          store={ToastsStore}
          position={'top_right'}
          lightBackground
        />
          <Col xs="12" lg="6">
            <h1>Add new certificate</h1>
            <Card>
              <CardBody>
                <Table responsive hover borderless>
                  <tbody>
                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Code name</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Certificate code"
                          onChange={(e) => this.setState({newCertName: e.target.value})}
                        />
                    </td></tr>

                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Certificate name</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Certificate Name"
                          onChange={(e) => this.setState({newCertVname: e.target.value})}
                        />
                    </td></tr>
                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Point</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Point"
                          onChange={(e) => this.setState({newCertPoint: e.target.value})}
                        />
                    </td></tr>
                    <tr><td colSpan='100%' align='center'>
                      <Button
                        type="submit"
                        size="md"
                        color="success"
                        onClick={() => this.saveCert()}
                      >
                        Save new certificate
                      </Button>
                    </td></tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" lg="6">
            <h1>Current certificates in system</h1>
            <Card>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Code name</th>
                    <th>Name</th>
                    <th>Point</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.certs == null ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No certificate added</td></tr> 
                  : this.state.certs.map(item => 
                    <React.Fragment key={item.id}><tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.vname}</td>
                    <td>{item.point}</td>
                    <td><b style={{color: !item.active ? 'red' : 'green'}}>{item.active ? 'Active' : 'Deactive'}</b></td>
                    <td>Edit</td>
                  </tr>
                  </React.Fragment>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Tables;
