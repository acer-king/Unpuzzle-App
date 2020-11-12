import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Spin, Button, Form, notification, Input, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

// amplify
import { Auth } from 'aws-amplify';
import EmailConfirmFormWrapper from '../components/styled/EmailConfirmFormWrapper'
import FullWidthWrapper from '../components/styled/FullWidthWrapper'
// Presentational


class ConfirmEmailContainer extends React.Component {
  state = {
    username: '',
    loading: false,
    redirect: false,
    confirmationCode: '',
    error: ''
  };

  componentDidMount() {
    let username = this.props.match.params.username
    this.setState({ username });
  }

  handleSubmit = (event) => {

    event.preventDefault();

    const { confirmationCode } = this.state;

    // show progress spinner
    this.setState({ loading: true });

    Auth.confirmSignUp(this.state.username, confirmationCode)
      .then(() => {
        // this.handleOpenNotification('success', 'Succesfully confirmed!', 'You will be redirected to login in a few!');
        this.setState({
          loading: false
        });
        this.setState({ redirect: true });

      })
      .catch(err => {
        // this.handleOpenNotification('error', 'Invalid code', err.message);
        this.setState({
          loading: false
        });
      });
  };

  /**
   * @param  {string} - type
   * @param  {string} - title
   * @param  {string} - message
   *
   * @returns {void} - no value returned
   */
  handleOpenNotification = (type, title, message) => {
    switch (type) {
      case 'success':
        notification['success']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5,
          onClose: () => {
            this.setState({ redirect: true });
          }
        });
        break;

      case 'error':
        notification['error']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5
        });
        break;
    }
  };

  handleOnPaste = (event) => {
    event.preventDefault();

    let code = event.clipboardData.getData('Text').trim();

    /** Update input */
    this.setState({ confirmationCode: code });

    // regex to check if string is numbers only
    const reg = new RegExp('^[0-9]+$');

    if (reg.test(code) && code.length === 6) {
      // code is a valid number

      this.setState({ loading: true });

      Auth.confirmSignUp(this.state.username, code)
        .then(() => {
          this.handleOpenNotification('success', 'Succesfully confirmed!', 'You will be redirected to login in a few!');
        })
        .catch(err => {
          this.handleOpenNotification('error', 'Invalid code', err.message);
          this.setState({
            loading: false
          });
        });
    }
  };

  handleChange = (event) => {
    this.setState({ confirmationCode: event.currentTarget.value });
  };

  render() {
    const { loading, error, confirmationCode, redirect } = this.state;

    return (
      <FullWidthWrapper align="center">
        <EmailConfirmFormWrapper onSubmit={this.handleSubmit}>
          <Col md={24} lg={18}>
            <div className="full-width">
              <h2>Check your email</h2>
              <p>We've sent a six­ digit confirmation code</p>
            </div>
            <Form.Item validateStatus={error && 'error'} help={error} label="Confirmation Code">
              <Input
                size="large"
                type="number"
                placeholder="Enter confirmation code"
                onChange={this.handleChange}
                onPaste={this.handleOnPaste}
                value={confirmationCode}
              />
            </Form.Item>
            <Button type="primary" disabled={loading} onClick={this.handleSubmit} size="large">
              {loading ? <Spin indicator={<LoadingOutlined></LoadingOutlined>} /> : 'Confirm Email'}
            </Button>
          </Col>
        </EmailConfirmFormWrapper>
        {redirect && <Redirect to={{ pathname: '/login' }} />}
      </FullWidthWrapper>
    );
  }
}

export default ConfirmEmailContainer;
