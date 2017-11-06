import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VirtualizedSelect from 'react-virtualized-select';

import queryParams from '../../util/queryParams';

import Base from './Base';

import integrations from '../../constants/Integrations';

import CardSection from './widgets/CardSection';
import CardBody from './widgets/CardBody';
import CardSectionHeader from './widgets/CardSectionHeader';
import CardBodyHeader from './widgets/CardBodyHeader';

class GoogleSheets extends Base {
  constructor() {
    super();

    this.state = {
      ...this.state,
      files: [],
      selectedFile: null,
      customSheetNames: {},
      disabledDatasets: {},
      errorMessage: null,
      success: null,
    };
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.credentials &&
      nextState.credentials !== this.state.credentials
    ) {
      this.loadFileList(nextState.credentials);
    }
  }

  loadFileList = (credentials) => {
    const qs = queryParams({
      access_token: credentials.credentials.token,
      q: '(mimeType = \'application/vnd.google-apps.spreadsheet\' and sharedWithMe = true and \'me\' in writers) or (mimeType = \'application/vnd.google-apps.spreadsheet\')',
      orderBy: 'modifiedByMeTime desc',
      pageSize: 1000,
    });
    fetch(`https://www.googleapis.com/drive/v3/files?${qs}`)
      .then(r => r.json())
      .then((results) => {
        this.setState({
          files: results.files,
        });
      });
  }

  onFormSubmit = () => {
    this.setState({
      errorMessage: null,
      success: false,
    });

    if (this.state.selectedFile === null) {
      this.setState({
        errorMessage: 'You need to select a spreadsheet to export to first',
      });
      return;
    }
    const datasetNames = Object.keys(this.props.context.datasets).filter((datasetName) => {
      return !this.state.disabledDatasets[datasetName];
    });

    if (datasetNames.length === 0) {
      this.setState({
        errorMessage: 'You haven\'t selected any datasets to export',
      });
      return;
    }
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.state.selectedFile.id}:batchUpdate`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.credentials.credentials.token}`,
      },
      body: JSON.stringify({
        requests: datasetNames.map((datasetName) => {
          return {
            addSheet: {
              properties: {
                title: this.state.customSheetNames[datasetName] || datasetName,
              },
            },
          };
        }),
      }),
    })
      .then(r => r.json())
      .then((results) => {
        if (results.error) {
          if (results.error.code === 401) {
            this.setState({
              credentials: null,
            });
          } else {
            const match = /A sheet with the name "(.*)" already exists/.exec(results.error.message);
            if (match) {
              this.setState({
                errorMessage: `A sheet with the name "${match[1]}" already exists. You can modify the name above and try again.`,
                success: false,
              });
            }
          }
          return;
        }

        const promises = datasetNames.map((datasetName, index) => {
          const range = `'${results.replies[index].addSheet.properties.title}'!A1`;
          const qp = {
            valueInputOption: 'RAW',
          };
          return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.state.selectedFile.id}/values/${range}:append?${queryParams(qp)}`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${this.state.credentials.credentials.token}`,
            },
            body: JSON.stringify({
              values: this.props.context.datasets[datasetName],
            }),
          });
        });

        Promise.all(promises)
          .then((responses) => {
            return Promise.all(responses.map(response => response.json()));
          })
          .then((responses) => {
            let error = false;
            responses.forEach((response) => {
              if (response.error) {
                error = response.error.message;
              }
            });

            if (error) {
              this.setState({
                errorMessage: error,
                success: false,
              });
            } else {
              this.setState({
                success: true,
              });
            }
          });
      });
  }

  onDatasetCheckboxChange = (e) => {
    const { checked } = e.currentTarget;
    const { datasetName } = e.currentTarget.dataset;
    this.setState({
      disabledDatasets: {
        ...this.state.disabledDatasets,
        [datasetName]: !checked,
        success: false,
      },
    });
  }

  onDatasetNameChange = (e) => {
    const { value } = e.currentTarget;
    const { datasetName } = e.currentTarget.dataset;
    this.setState({
      customSheetNames: {
        ...this.state.customSheetNames,
        [datasetName]: value,
        success: false,
      },
    });
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
          <h5 className="ijs-oauth-header">{this.props.integration.description}</h5>
        </CardSection>
      </CardBody>
    );
  }

  renderAuthed() {
    return (
      <CardBody>
        <CardBodyHeader title="Export to Google Sheets" />
        <CardSection>
          <CardSectionHeader title="Choose a Spreadsheet to Export to" />
          <VirtualizedSelect
            labelKey="name"
            valueKey="id"
            options={this.state.files}
            onChange={selectedFile => this.setState({ selectedFile, success: false })}
            value={this.state.selectedFile}
          />
        </CardSection>
        <CardSection>
          <CardSectionHeader title="Data to Export" />
          {
            Object.keys(this.props.context.datasets).map((datasetName) => {
              return (
                <div
                  key={datasetName}
                  className="ijs-form-editable-checkbox"
                >
                  <input
                    type="checkbox"
                    data-dataset-name={datasetName}
                    defaultChecked
                    onChange={this.onDatasetCheckboxChange}
                  />
                  <input
                    className="ijs-form-input"
                    type="text"
                    placeholder={datasetName}
                    data-dataset-name={datasetName}
                    defaultValue={datasetName}
                    onChange={this.onDatasetNameChange}
                  />
                </div>
              );
            })
          }
        </CardSection>
        <CardSection>
          <button
            type="button"
            onClick={this.onFormSubmit}
            className="ijs-card-action"
          >
            Export
          </button>
        </CardSection>
        {
          this.state.errorMessage && (
            <CardSection>
              <div className="ijs-alert ijs-alert-error">
                <strong>An error occurred: </strong>{ this.state.errorMessage }
              </div>
            </CardSection>
          )
        }
        {
          this.state.success && (
            <CardSection>
              <div className="ijs-alert ijs-alert-success">
                <strong>Export Complete: </strong>
                You can view your updated spreadsheet by
                { ' ' }
                <a
                  href={`https://drive.google.com/open?id=${this.state.selectedFile.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clicking here
                </a>.
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

export const DumbGoogleSheets = GoogleSheets;
export default connect(mapStateToProps, mapDispatchToProps)(GoogleSheets);
