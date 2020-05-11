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
      updateCertName: null,
      updateCertVname: null,
      updateCertPoint: null,
      isActive: null,
      reset: true,
      open: null,
      key: '',
    };
  }

  componentDidMount(){
    Api.get('certs/all').then(res => {this.setState({certs: res})});
  }

  saveCert = () => {
    if (this.checkDuplicate(this.state.newCertName)) {
      ToastsStore.error('Failed to add new certificate!');
      return;
    }
    if (!this.state.newCertName || !this.state.newCertVname || !this.state.newCertPoint) return;
    let info = {};
    info.name = this.state.newCertName;
    info.vname = this.state.newCertVname;
    info.point = this.state.newCertPoint;
    info.active = true;

    Api.post('certs', info).then((res) => {
      // if (res.name == info.name) {
      //   ToastsStore.success('Successfully saved!');
      // } else {
      //   ToastsStore.error('Failed to save! Try again');
      // }
      this.componentDidMount();
      window.location.reload(false);
    });
  };

  updateCert = (item) => {
    let info = {};
    info.id = item;
    if (this.state.updateCertName) info.name = this.state.updateCertName;
    if (this.state.updateCertVname) info.vname = this.state.updateCertVname;
    if (this.state.updateCertPoint) info.point = this.state.updateCertPoint;
    if (this.state.isActive) info.active = this.state.isActive;

    Api.put('certs/' + info.id, info).then((res) => {
      if (res == info.id) {
        ToastsStore.success('Successfully updated!');
      } else {
        ToastsStore.error('Failed to update! Try again');
      }
      this.componentDidMount();
      window.location.reload(false);
    });
  };

  destroyCert = (item) => {
    Api.delete('certs/' + item).then((res) => {
      // console.log(res)
      // if (res === item) {
      //   ToastsStore.success('Destroyed!');
      // } else {
      //   ToastsStore.error('Failed to destroy! Try again');
      // }
      this.componentDidMount();
      window.location.reload(false);
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
          <Col lg="8">
            <h1>Current certificates in system</h1>
            <Card>
              <CardHeader>
                <Input
                  placeholder="Code name/Name of certificate"
                  onChange={(e) => this.setState({key: e.target.value})}
                />
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Code name</th>
                    <th>Name</th>
                    <th>Point</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.listFilter(this.state.certs).length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No certificate added</td></tr> 
                  : this.listFilter(this.state.certs).map(item => 
                    <React.Fragment key={item.id}><tr onClick={() => this.openDropDown(item)}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.vname}</td>
                    <td>{item.point}</td>
                    <td><b style={{color: !item.active ? 'red' : 'green'}}>{item.active ? 'Active' : 'Deactive'}</b></td>
                  </tr>
                  {item.id == this.state.open
                    ? this.openList(item)
                    : null}
                  </React.Fragment>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4">
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
                          className={this.checkDuplicate(this.state.newCertName) ? "is-invalid" : null}
                          placeholder="Certificate code"
                          onChange={(e) => this.setState({newCertName: e.target.value.trim()})}
                        />
                    </td></tr>

                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Certificate name</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Certificate Name"
                          onChange={(e) => this.setState({newCertVname: e.target.value.trim()})}
                        />
                    </td></tr>
                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Point</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Point"
                          onChange={(e) => this.setState({newCertPoint: e.target.value.trim()})}
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
        </Row>
      </div>

    );
  }

  openDropDown = (id) => {
    // console.log(event.target.innerText)
    if (this.state.open == null) {
      this.setState({
        open: id.id,
      });
    } else {
      this.setState({
        open: null,
      });
    }
  };

  openList(item) {
    return (
      <React.Fragment>
      <tr style={{backgroundColor: '#f0f3f5'}}>
        <td></td>
        <td>
        <Input
          type="text"
          bsSize='sm'
          defaultValue={item.name}style={{ width: 180 }}
          onChange={(e) => this.setState({updateCertName: e.target.value})}
        />
        </td>
        <td>
        <Input
          type="text"
          defaultValue={item.vname}
          style={{ width: 90 }}
          bsSize='sm'
          onChange={(e) => this.setState({updateCertVname: e.target.value})}
        />
        </td>
        <td>
        <Input
          type="text"
          defaultValue={item.point}
          bsSize='sm'
          style={{ width: 70 }}
          onChange={(e) => this.setState({updateCertPoint: e.target.value})}
        />
        </td>
        <td>
        <Input
          type="select"
          name="selectSm"
          id="SelectLm"
          bsSize="sm"
          style={{ width: 90 }}
          defaultValue={item.active ? 1 : 0}
          onChange={(ev) =>
            this.setState({ isActive: ev.target.value })
          }
        >
          <option value="0">Deactive</option>
          <option value="1">Active</option>
        </Input>
        </td>
      </tr>
      <tr><td align="center" colSpan="100%" style={{backgroundColor: '#f0f3f5', borderColor:'#f0f3f5'}}>
      <Button
        type="submit"
        size="md"
        color="warning"
        onClick={() => this.updateCert(item.id)}
      >
        Update
      </Button>

      {/* <Button
        type="submit"
        size="md"
        style={{marginLeft: 30}}
        color="danger"
        onClick={() => this.destroyCert(item.id)}
      >
        Destroy
      </Button> */}
      </td></tr>
      </React.Fragment>
    )
  }

  listFilter(list) {
    let result = [];
    const searchKey = this.state.key;
    if (list) {
      list.map((item) => {
        if (
          item.name
            .toUpperCase()
            .indexOf(searchKey.toUpperCase()) != -1 ||
          item.vname
            .toUpperCase()
            .indexOf(searchKey.toUpperCase()) != -1
        )
        result.push(item);
      });
    }
    return result;
  }

  checkDuplicate = (str) => {
    let result = false;
    const skills = this.state.certs;
    if (str == null) {result = false;return;}
    skills.map(item => {
      if (item.name.toUpperCase() == str.toUpperCase()) result = true;
    })
    return result;
  }
}

export default Tables;
