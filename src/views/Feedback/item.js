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

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      feedback: this.props.feedback,
      isReport: this.props.isReport,
    };
  }

  render() {
    const user = this.state.user;
    const isReport = this.state.isReport;
    const feedback = this.state.feedback;
    let rows = [];
    for (let i = 0; i < feedback.rating; i++) {
      rows.push(<i className='fa fa-star' key={i+1} style={{color:'#fcdb03'}}></i>);
    }
    return (
      <Row style={{marginTop: 30}}>
        <Col md='3'>
          <img src={user.image} width="60" style={{marginTop:0}} />
        </Col>
        <Col md='8'>
          <Row>
            <p style={{fontSize:12, color: '#b3b3b3'}}>
              {user.roleId == 2 ? 'Parent ' : 'Babysitter '}
            </p>
            &nbsp;<b>{user.nickname}</b>&nbsp;{!isReport ? 'đã đánh giá' 
              : <p style={{color:'red'}}>báo cáo</p>}
          </Row>
          <Row style={{marginBottom: 20}}>
            {!isReport ? 
              rows
            : null}
            {feedback.description}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Feedback;
