import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SocialIcon } from 'react-social-icons';

import Base from './Base';

import integrations from '../../constants/Integrations';

import CardSection from './widgets/CardSection';
import CardBody from './widgets/CardBody';
import CardBodyHeader from './widgets/CardBodyHeader';
import CardSectionHeader from './widgets/CardSectionHeader';
import CardMedia from './widgets/CardMedia';

class Clearbit extends Base {
  constructor() {
    super();

    this.state = {
      ...this.state,
      person: null,
      currentPersonId: 0,
    };
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.credentials !== this.state.credentials ||
      nextState.currentPersonId !== this.state.currentPersonId ||
      nextProps.context !== this.props.context
    ) {
      // The user has authed
      // Sync in data?

      fetch(`https://person.clearbit.com/v2/combined/find?email=${nextProps.context.people[nextState.currentPersonId].email}`, {
        headers: {
          Authorization: `Basic ${btoa(`${nextState.credentials.credentials.token}:`)}`,
        },
      })
        .then(r => r.json())
        .then((r) => {
          if (r.person) {
            this.setState({
              person: r,
            });
          }
        });
    }
  }

  renderUnauthed() {
    return (
      <CardBody>
        <CardSection>
          <button
            onClick={this.openAuth}
            className="ijs-oauth-btn"
          >
            <img
              className="ijs-oauth-btn-icon"
              src={this.props.integration.icon}
              alt={this.props.integration.name}
            />
            Sign in with {this.props.integration.name}
          </button>
          <div className="ijs-oauth-header">{this.props.integration.description}</div>
        </CardSection>
      </CardBody>
    );
  }

  onBodyHeaderChange = (e) => {
    const mod = (n, m) => {
      const remain = n % m;
      return Math.floor(remain >= 0 ? remain : remain + m);
    };

    const newPersonId = mod((this.state.currentPersonId + e), this.props.context.people.length);

    this.setState({
      currentPersonId: newPersonId,
    });
  }

  renderAuthed() {
    if (this.state.person) {
      return (
        <CardBody>
          <CardBodyHeader title="View Profile" onChange={this.props.context.people.length > 1 ? this.onBodyHeaderChange : null} />

          <CardSection>
            <CardMedia
              imageSrc={this.state.person.person.avatar}
              title={this.state.person.person.name.fullName}
              subtitle={this.state.person.company ? this.state.person.company.name : ''}
            />
          </CardSection>
          <hr style={{ margin: 0 }} />
          {
            this.state.person.person.bio &&
              <CardSection>
                <CardSectionHeader title="Bio" />
                <p>{this.state.person.person.bio}</p>
              </CardSection>
          }
          {
            this.state.person.person.site &&
            <CardSection>
              <CardSectionHeader title="Website" />
              <a
                target="_blank"
                href={`${this.state.person.person.site}`}
                rel="noopener noreferrer"
              >
                {this.state.person.person.site}
              </a>
            </CardSection>
          }
          {
            this.state.person.person.location &&
            <CardSection>
              <CardSectionHeader title="Location" />
              <p>{this.state.person.person.location}</p>
            </CardSection>
          }
          <CardSection>
            <CardSectionHeader title="SocialMedia" />
            {this.state.person.person.facebook.handle &&
              <SocialIcon
                className="ijs-card-social-icon"
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '4px',
                }}
                url={`https://www.facebook.com/${this.state.person.person.facebook.handle}`}
                color="#499AFC"
              />
            }
            {this.state.person.person.twitter.handle &&
              <SocialIcon
                className="ijs-card-social-icon"
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '4px',
                }}
                url={`https://www.twitter.com/${this.state.person.person.twitter.handle}`}
                color="#499AFC"
              />
            }
            {this.state.person.person.linkedin.handle &&
              <SocialIcon
                className="ijs-card-social-icon"
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '4px',
                }}
                url={`https://www.linkedin.com/${this.state.person.person.linkedin.handle}`}
                color="#499AFC"
              />
            }
            {this.state.person.person.github.handle &&
              <SocialIcon
                className="ijs-card-social-icon"
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '4px',
                }}
                url={`https://www.github.com/${this.state.person.person.github.handle}`}
                color="#499AFC"
              />
            }
          </CardSection>
          {
            this.state.person.company &&
              <div>
                <hr />
                <CardSection>
                  <CardMedia
                    imageSrc={this.state.person.company.logo}
                    title={this.state.person.company.name}
                    subtitle={
                      <a
                        href={`https://${this.state.person.company.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {this.state.person.company.domain}
                      </a>
                    }
                  />
                </CardSection>
                <CardSection>
                  <CardSectionHeader title="Description" />
                  <p>{this.state.person.company.description}</p>
                </CardSection>
                <CardSection>
                  <CardSectionHeader title="Location" />
                  <p>{this.state.person.company.location}</p>
                </CardSection>
                <CardSection>
                  <CardSectionHeader title="Employees" />
                  <p>{this.state.person.company.metrics.employees}</p>
                </CardSection>
                <CardSection>
                  <CardSectionHeader title="Type" />
                  <p
                    style={{
                     textTransform: 'capitalize',
                    }}
                  >
                    {this.state.person.company.type}
                  </p>
                </CardSection>
                <CardSection>
                  <CardSectionHeader title="Raised" />
                  <p>{`$${this.state.person.company.metrics.raised / 1000000}M`}</p>
                </CardSection>
                <CardSection>
                  <CardSectionHeader title="Markets" />
                  <p>{this.state.person.company.tags.join(', ')}</p>
                </CardSection>
                <CardSection>
                  <CardSectionHeader title="Social" />
                  {this.state.person.company.facebook &&
                    <SocialIcon
                      className="ijs-card-social-icon"
                      style={{
                        height: '30px',
                        width: '30px',
                        marginRight: '4px',
                      }}
                      url={`https://www.facebook.com/${this.state.person.company.facebook.handle}`}
                      color="#499AFC"
                    />
                  }
                  {this.state.person.company.twitter &&
                    <SocialIcon
                      className="ijs-card-social-icon"
                      style={{
                        height: '30px',
                        width: '30px',
                        marginRight: '4px',
                      }}
                      url={`https://www.twitter.com/${this.state.person.company.twitter.handle}`}
                      color="#499AFC"
                    />
                  }
                  {this.state.person.company.linkedin &&
                    <SocialIcon
                      className="ijs-card-social-icon"
                      style={{
                        height: '30px',
                        width: '30px',
                        marginRight: '4px',
                      }}
                      url={`https://www.linkedin.com/${this.state.person.company.linkedin.handle}`}
                      color="#499AFC"
                    />
                  }
                </CardSection>
              </div>
          }
        </CardBody>
      );
    }
    return (
      <div>
          Could not find people.
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    siteId: state.siteId,
    sessionId: state.sessionId,
    context: state.context,
    user: state.user,
    currentIntegrationId: state.currentIntegrationId,
    integration: integrations[state.currentIntegrationId],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({}, dispatch),
  };
};

export const DumbClearbit = Clearbit;
export default connect(mapStateToProps, mapDispatchToProps)(Clearbit);
