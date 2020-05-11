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

class ParentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      isOpen: this.props.isOpen,
      user: {},
      srs: [],
    };
  }

  componentWillMount() {
    Api.get('users/' + this.state.userId).then((res) => {
      this.setState({ user: res });
      Api.post('sittingRequests/listParent/', {userId: this.state.userId})
        .then(res => this.setState({srs: res}))
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
            <Col lg="5"></Col>
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
    const srs = this.state.srs;
    let countFb = 0;
    
    return (
      <Table responsive borderless >
        <thead>
          <tr>
            <th width='0'></th>
            <th width='120'>Date</th>
            <th>Reported</th>
            <th>Rating</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {srs.length != 0 ? srs.map(sr => sr.feedbacks && sr.feedbacks.map(fb => !fb.reporter &&
            <tr key={fb.id}>
              <td style={{color:'white'}}>{countFb++}</td>
              <td>
                <b>{moment(sr.sittingDate).format('DD-MM-YYYY')}</b>
              </td>
              <td align='center'>{fb.isReport &&
                <i className="fa fa-close" style={{color:'red'}}/>}
              </td>
              <td align='center'>{!fb.isReport && 
                <span>{fb.rating}<i className='fa fa-star' style={{color:'#fcdb03'}}/></span>}
              </td>
              <td>{fb.description}</td> 
            </tr>)) : <tr style={{color:'#bebebe'}}><td align='center' colSpan='100%'>No feedback from babysitter</td></tr>
          }
          {countFb == 0 ? <tr style={{color:'#bebebe'}}><td align='center' colSpan='100%'>No feedback from babysitter</td></tr> : null}
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

}

export default ParentDetail;
