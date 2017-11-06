import React from 'react';

import Card from './widgets/Card';
import CardSection from './widgets/CardSection';
import CardBody from './widgets/CardBody';
import CardSectionHeader from './widgets/CardSectionHeader';

class Base extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: null,
      authUrl: null,
      showTroubleMessage: false,
      closedWindow: false,
    };

    this.pollTimer = null;
  }

  componentDidMount() {
    this.getCredentials();
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
  }

  getCredentials() {
    if (this.state.credentials) {
      return;
    }

    const c = JSON.parse(localStorage.getItem(this.storageKey()) || 'null');

    if (c && c.credentials) {
      if (c.credentials.expires && c.credentials.expires_at < ((+new Date()) / 1000) + (60 * 5)) {
        this.setState({
          credentials: null,
        });
        localStorage.removeItem(this.storageKey());
      } else {
        this.setState({
          credentials: c,
        });
        return;
      }
    }

    fetch(
      `${process.env.WEB_ORIGIN}/js_auth/${this.props.siteId}/tokens/${this.props.integration.oauthSlug}`,
      {
        method: 'post',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userId: this.props.user.userId,
          apiKey: this.props.siteId,
          sessionId: this.props.sessionId,
        }),
      },
    )
      .then(r => r.json())
      .then((r) => {
        if (r.auth) {
          this.setState({
            authUrl: r.auth.url,
            showTroubleMessage: this.state.closedWindow,
          });
        } else {
          this.setState({
            credentials: r,
            showTroubleMessage: false,
          });

          localStorage.setItem(this.storageKey(), JSON.stringify(r));
        }
      });
  }

  openAuth = () => {
    const win = window.open(this.state.authUrl, '_blank');
    this.pollTimer = window.setInterval(() => {
      if (win.closed !== false) {
        window.clearInterval(this.pollTimer);
        this.setState({
          closedWindow: true,
        });
        this.getCredentials();
      }
    }, 200);
  }

  storageKey() {
    return `ijs-creds-${this.props.integration.oauthSlug}-${this.props.siteId}|${this.props.sessionId}|${this.props.user.userId}`;
  }

  renderUnauthed() {
    return (
      <CardBody>
        <CardSection>
          <button
            onClick={this.openAuth}
          >
          Auth with {this.props.integration.name}
          </button>
        </CardSection>
      </CardBody>
    );
  }

  renderAuthed() {
    return (
      <CardBody>
        <CardSection>
          <CardSectionHeader title="User" />
          <pre>{ JSON.stringify(this.props.user, null, 2) }</pre>
        </CardSection>
        <CardSection>
          <CardSectionHeader title="Context" />
          <pre>{ JSON.stringify(this.props.context, null, 2) }</pre>
        </CardSection>
        <CardSection>
          <CardSectionHeader title="Credentials" />
          <pre>{ JSON.stringify(this.state.credentials, null, 2) }</pre>
        </CardSection>
      </CardBody>
    );
  }

  render() {
    return (
      <div className="ijs-integration">
        <Card
          title={this.props.integration.name}
          backgroundColor={this.props.integration.backgroundColor}
          textColor={this.props.integration.textColor}
        >
          {
            this.state.showTroubleMessage && (
              <div className="ijs-alert ijs-alert-warning text-center">
                <a
                  href="https://blockspring-help.readme.io/v1.0/docs/trouble-signing-in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Having trouble signing in?
                </a>
              </div>
            )
          }
          {
            this.state.credentials ? (
              this.renderAuthed()
            ) : (
              this.renderUnauthed()
            )
          }
        </Card>
      </div>
    );
  }
}

export default Base;
