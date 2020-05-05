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
      skills: [],
      headers: [],
      newSkillName: null,
      newSkillVname: null,
      newSkillPoint: null,
      updateSkillName: null,
      updateSkillVname: null,
      updateSkillPoint: null,
      isActive: null,
      reset: true,
      open: null,
    };
  }

  componentDidMount(){
    Api.get('skills/all').then(res => {this.setState({skills: res});});
  }

  saveSkill = () => {
    if (!this.state.newSkillName || !this.state.newSkillVname || !this.state.newSkillPoint) return;
    let info = {};
    info.name = this.state.newSkillName;
    info.vname = this.state.newSkillVname;
    info.point = this.state.newSkillPoint;
    info.active = true;

    Api.post('skills', info).then((res) => {
      if (res.name == info.name) {
        ToastsStore.success('Successfully saved!');
      } else {
        ToastsStore.error('Failed to save! Try again');
      }
      this.componentDidMount();
      window.location.reload(false);
    });
  };

  updateSkill = (item) => {
    let info = {};
    info.id = item;
    if (this.state.updateSkillName) info.name = this.state.updateSkillName;
    if (this.state.updateSkillVname) info.vname = this.state.updateSkillVname;
    if (this.state.updateSkillPoint) info.point = this.state.updateSkillPoint;
    if (this.state.isActive) info.active = this.state.isActive;

    Api.put('skills/' + info.id, info).then((res) => {
      if (res == info.id) {
        ToastsStore.success('Successfully updated!');
      } else {
        ToastsStore.error('Failed to update! Try again');
      }
      this.componentDidMount();
      window.location.reload(false);
    });
  };

  destroySkill = (item) => {
    Api.delete('skills/' + item).then((res) => {
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
            <h1>Current skills in system</h1>
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
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.skills == null ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No skill added</td></tr> 
                  : this.state.skills.map(item => 
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
            <h1>Add new skill</h1>
            <Card>
              <CardBody>
                <Table responsive hover borderless>
                  <tbody>
                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Code name</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Skill code"
                          onChange={(e) => this.setState({newSkillName: e.target.value})}
                        />
                    </td></tr>

                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Skill name</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Skill Name"
                          onChange={(e) => this.setState({newSkillVname: e.target.value})}
                        />
                    </td></tr>
                    <tr><td>
                        <Label htmlFor="disabled-input"><b>Point</b></Label>
                      </td><td>
                        <Input
                          type="text"
                          placeholder="Point"
                          onChange={(e) => this.setState({newSkillPoint: e.target.value})}
                        />
                    </td></tr>
                    <tr><td colSpan='100%' align='center'>
                      <Button
                        type="submit"
                        size="md"
                        color="success"
                        onClick={() => this.saveSkill()}
                      >
                        Save new skill
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
          defaultValue={item.name}style={{ width: 220 }}
          onChange={(e) => this.setState({updateSkillName: e.target.value})}
        />
        </td>
        <td>
        <Input
          type="text"
          defaultValue={item.vname}
          style={{ width: 220 }}
          bsSize='sm'
          onChange={(e) => this.setState({updateSkillVname: e.target.value})}
        />
        </td>
        <td>
        <Input
          type="text"
          defaultValue={item.point}
          bsSize='sm'
          style={{ width: 50 }}
          onChange={(e) => this.setState({updateSkillPoint: e.target.value})}
        />
        </td>
        <td>
        <Input
          type="select"
          name="selectSm"
          id="SelectLm"
          bsSize="sm"
          style={{ width: 70 }}
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
        onClick={() => this.updateSkill(item.id)}
      >
        Update
      </Button>

      <Button
        type="submit"
        size="md"
        style={{marginLeft: 30}}
        color="danger"
        onClick={() => this.destroySkill(item.id)}
      >
        Destroy
      </Button>
      </td></tr>
      </React.Fragment>
    )
  }
}

export default Tables;
