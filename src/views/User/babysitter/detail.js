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

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      isOpen: this.props.isOpen,
      user: {},
    };
  }

  componentWillMount() {
    Api.get('users/' + this.state.userId).then((res) => {
      this.setState({ user: res });
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
            <Col lg="5">{this.tblFeedback()}</Col>
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

  tblFeedback() {
    const user = this.state.user;
    return (
      <Row>
        <Col lg="3">
          <img src={user.image} width="80" />
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

export default Detail;
