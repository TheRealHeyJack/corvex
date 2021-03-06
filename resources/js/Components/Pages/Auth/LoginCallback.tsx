import React, {ReactNode} from 'react';
import Layout from 'Layout/index';
import Page from 'Layout/Page';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import BasePage from 'Layout/Page/BasePage';
import AuthService from 'Services/AuthService';
import {RouteComponentProps as Route} from 'react-router';
import {Redirect} from 'react-router-dom';

interface LoginCallbackProps {
  token: string;
}

export default class LoginCallback extends BasePage<Route<LoginCallbackProps>, {redirect?: string}> {
  static shouldRender(): boolean {
    return !AuthService.isAuthed;
  }

  static route = {
    name: 'Login Callback',
    route: '/login/callback/:token',
    component: LoginCallback,
    icon: faKey,
    shouldRender: LoginCallback.shouldRender,
    topNav: false,
  };

  async componentDidMount(): Promise<void> {
    AuthService.authToken(this.props.match.params.token);
    await AuthService.fetchMe();

    await this.stateUpdate({
      redirect: window.browserHistory[2],
    });
  }

  render(): ReactNode {
    if (this.state?.redirect) {
      return (<Redirect to={this.state.redirect} />);
    }

    return (
      <Layout>
        <Page>
        </Page>
      </Layout>
    );
  }
}
