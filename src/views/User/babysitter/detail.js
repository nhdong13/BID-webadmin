import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Col,
  Button,
} from 'reactstrap';
import Popup from 'reactjs-popup';
import Api from '../../../api/api_helper';
import moment from 'moment';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      isOpen: this.props.isOpen,
      user: {},
      fbs: [],
    };
  }

  componentWillMount() {
    Api.get('users/' + this.state.userId).then((res) => {
      this.setState({ user: res });
      Api.get('feedback/getAllFeedbackByUserId/' + res.id).then(res => this.setState({fbs: res}));
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        toggle={this.props.closeMethod}
        className="modal-lg "
      >
        <ModalBody>
          <Row>
            <Col lg="7">{this.tblInfo()}</Col>
            <Col lg="5">{this.tblSkillCert()}</Col>
            <Col md='12'>
              <h4>Recent activities</h4>
            </Col>
            <Col md='12'>{this.tblFeedback()}</Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.closeMethod}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  tblFeedback() {
    const fbs = this.state.fbs;
    
    return (
      <Table responsive borderless >
        <thead>
          <tr>
            <th width='120'>Date</th>
            <th>Reported</th>
            <th>Rating</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {fbs.length != 0 ? fbs.map(fb => fb.reporter &&
            <tr key={fb.id}>
              <td>
                <b>{moment(fb.sitting.sittingDate).format('DD-MM-YYYY')}</b>
              </td>
              <td align='center'>{fb.isReport && fb.reporter && 
                <i className="fa fa-close" style={{color:'red'}}/>}
              </td>
              <td align='center'>{!fb.isReport && 
                <span>{fb.rating}<i className='fa fa-star' style={{color:'#fcdb03'}}/></span>}
              </td>
              <td>{fb.description}</td>
            </tr>) : <tr style={{color:'#bebebe'}}><td align='center' colSpan='100%'>No feedback from babysitter</td></tr>
          }
          
        </tbody>
      </Table>
    );
  }

  tblInfo() {
    const user = this.state.user;
    return (
      <Row>
        <Col lg="3">
          <img src={user.image} width="80" style={{marginTop:40}} />
        </Col>
        <Col lg='9'>
          <Table responsive borderless>
            <tbody>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Fullname</b>
                </td>
                <td>{user.nickname}</td>
              </tr>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Phone number</b>
                </td>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Email</b>
                </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td style={{ width: 50 }}>
                  <b>Address</b>
                </td>
                <td>{user.address}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  tblSkillCert() {
    const user = this.state.user;
    return (
      <Row style={{marginTop: 20}}>
        <Col md="12">
          <Row>
            <Col md="4">
              <b> <i className="cui-list icons mt-4"></i>&nbsp;Skills:</b>
            </Col>
            <Col md="8">
              { user.sitterSkills && 
                (user.sitterSkills.length == 0 ?
                <Row><p style={{color:'#bebebe', paddingLeft: 10}}>This sitter has no skill</p></Row> : 
                <Row>
                  {
                    user.sitterSkills.map(skill => 
                        <Col md='12' key={skill.skillId} style={{color: '#4dbd74'}}>
                          <i className="cui-check icons mt-4"></i>&nbsp;
                          {skill.skill.vname}
                        </Col>
                    )
                  }
                </Row>)
              }
              
            </Col>
          </Row>
        </Col>


        <Col md="12" style={{marginTop:10, paddingTop: 10}}>
          <Row>
            <Col md="4">
            <b> <i className="cui-list icons mt-4"></i>&nbsp;Certificates:</b>
            </Col>
            <Col md="8">
              { user.sitterCerts && 
                (user.sitterCerts.length == 0 ?
                <Row><p style={{color:'#bebebe', paddingLeft: 10}}>This sitter has no certificate</p></Row> : 
                <Row>
                  {
                    user.sitterCerts.map(skill => 
                        <Col md='12' key={skill.certId} style={{color: '#4dbd74'}}>
                          <i className="cui-check icons mt-4"></i>&nbsp;
                          {skill.cert.vname}
                        </Col>
                    )
                  }
                </Row>)
              }
              
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Detail;
