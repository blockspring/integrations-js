import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VirtualizedSelect from 'react-virtualized-select';

import Base from './Base';

import integrations from '../../constants/Integrations';

import CardSection from './widgets/CardSection';
import CardBody from './widgets/CardBody';
import CardBodyHeader from './widgets/CardBodyHeader';
import CardSectionHeader from './widgets/CardSectionHeader';

class Trello extends Base {
  constructor(props) {
    super();

    this.state = {
      ...this.state,
      boards: [],
      lists: [],
      title: props.context.title,
      description: props.context.description,
    };

    this.clientId = process.env.TRELLO_CLIENT_ID;
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.credentials !== this.state.credentials ||
      nextProps.context !== this.props.context
    ) {
      // The user has authed
      // Sync in data?
      fetch(`https://api.trello.com/1/members/me/boards?key=${this.clientId}&token=${nextState.credentials.credentials.token}`)
        .then(r => r.json())
        .then((r) => {
          this.setState({
            boards: r,
          });
        });
    }
  }

  onBoardSelect = (selectedBoard) => {
    this.setState({
      selectedBoard,
      selectedList: null,
      lists: [],
    });

    if (!selectedBoard) {
      return;
    }
    fetch(`https://api.trello.com/1/boards/${selectedBoard.id}/lists?key=${this.clientId}&token=${this.state.credentials.credentials.token}`)
      .then(r => r.json())
      .then((r) => {
        this.setState({
          lists: r,
        });
      });
  }

  onListSelect = (selectedList) => {
    this.setState({
      selectedList,
    });
  }

  onNameChange = (e) => {
    this.setState({
      title: e.currentTarget.value,
    });
  }

  onDescriptionChange = (e) => {
    this.setState({
      description: e.currentTarget.value,
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (!this.state.selectedList) {
      this.setState({
        results: 'First choose a board and list.',
      });
    } else {
      const formData = new FormData();
      formData.append('name', this.state.title);
      formData.append('desc', this.state.description);

      fetch(
        `https://api.trello.com/1/cards?key=${this.clientId}&token=${this.state.credentials.credentials.token}&idList=${this.state.selectedList.id}`,
        {
          method: 'post',
          body: formData,
        },
      )
        .then(r => r.json())
        .then((r) => {
          if (r.url) {
            this.setState({
              resultUrl: r.url,
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

  renderAuthed() {
    return (
      <CardBody>
        <CardBodyHeader title="Add Card" />
        <CardSection>
          <CardSectionHeader title="Boards" />
          <VirtualizedSelect
            labelKey="name"
            valueKey="id"
            placeholder="Select a Board"
            options={this.state.boards}
            onChange={this.onBoardSelect}
            value={this.state.selectedBoard}
          />
        </CardSection>
        <CardSection>
          <CardSectionHeader title="Lists" />
          <VirtualizedSelect
            labelKey="name"
            valueKey="id"
            placeholder="Select a List"
            options={this.state.lists}
            onChange={this.onListSelect}
            value={this.state.selectedList}
          />
        </CardSection>
        <CardSection>
          <CardSectionHeader title="Name" />
          <input
            className="ijs-form-input"
            type="text"
            defaultValue={this.state.title}
            onChange={this.onNameChange}
          />
        </CardSection>
        <CardSection>
          <CardSectionHeader title="Description" />
          <textarea
            className="ijs-form-input"
            type="text"
            defaultValue={this.state.description}
            onChange={this.onDescriptionChange}
          />
        </CardSection>
        <CardSection>
          <button
            type="button"
            onClick={this.onFormSubmit}
            className="ijs-card-action"
          >
            Submit
          </button>
        </CardSection>
        {
          this.state.resultUrl && (
            <CardSection>
              <div
                className="ijs-alert ijs-alert-success"
              >
                <strong>Your new card was created!</strong>
                <br />
                <a
                  href={this.state.resultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the card
                </a>
              </div>
            </CardSection>
          )
        }
      </CardBody>
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

export const DumbTrello = Trello;
export default connect(mapStateToProps, mapDispatchToProps)(Trello);
