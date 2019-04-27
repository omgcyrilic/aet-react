import React, {Component} from 'react';
import axios from 'axios';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JSONPretty from 'react-json-pretty';
import * as constatnts from './helpers/constants';
import './App.css';

const accessToken = constatnts.ACCESS_TOKEN;
const adAccountId = constatnts.AD_ACCOUNT_ID;
const apiVersion = constatnts.API_VERSION;

const leetTheme = require('react-json-pretty/dist/1337');

class App extends Component {
  constructor() {
    super();
    this.state = {
      adId: '',
      adSetId: '',
      campaignId: '',
      errorMessage: '',
      errorResponse: [],
      isDirty: false,
      isLoading: false,
      hasError: false,
      responseData: [],
      status: '',
      statusText: '',
      targetAudienceId: '',
      targetAudienceName: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  getSearch = () => {
    const url = 'https://graph.facebook.com/v3.2/search';
    this.setState({ isLoading: true }, () => {
      axios.get(url, {
        params: {
          access_token: accessToken,
          type: 'adinterest',
          q: 'automotive',
        }
      })
        .then(response => {
          const responseData = response.data.data;
          const status = response.status;
          const statusText = response.statusText;
          const targetAudienceId = response.data.data[0].id;
          const targetAudienceName = response.data.data[0].name;
          this.setState({
            isDirty: true,
            responseData,
            status,
            statusText,
            targetAudienceId,
            targetAudienceName,
          });
        })
        .catch((error) => {
          const errorMessage = error.response.data.error.message;
          const errorResponse = error;
          const status = error.response.status;
          const statusText = error.response.statusText;
          this.setState({
            hasError: true,
            errorMessage,
            errorResponse,
            status,
            statusText
          });
        })
        .then(() => {
          this.setState({
            isLoading: false
          });
        });
    });
  };

  postCreateCampaign = () => {
    const url = `https://graph.facebook.com/${apiVersion}/${adAccountId}/campaigns`;
    this.setState({ isLoading: true }, () => {
      axios.get(url, {
        params: {
          access_token: accessToken,
          name: 'Auto campaign',
          objective: 'LINK_CLICKS',
          status: 'PAUSED',
        }
      })
        .then(response => {
          const responseData = response.data.data;
          const status = response.status;
          const statusText = response.statusText;
          const campaignId = response.data.data[0].id;
          this.setState({
            campaignId,
            isDirty: true,
            responseData,
            status,
            statusText,
          });
        })
        .catch((error) => {
          const errorMessage = error.response.data.error.message;
          const errorResponse = error;
          const status = error.response.status;
          const statusText = error.response.statusText;
          this.setState({
            hasError: true,
            errorMessage,
            errorResponse,
            status,
            statusText
          });
        })
        .then(() => {
          this.setState({
            isLoading: false
          });
        });
    });
  };

  getCreateAdSet = () => {
    const url = `https://graph.facebook.com/${apiVersion}/${adAccountId}/adsets`;
    this.setState({ isLoading: true }, () => {
      axios.get(url, {
        params: {
          access_token: accessToken,
          bid_amount: '300',
          billing_event: 'IMPRESSIONS',
          campaign_id: this.state.campaignId,
          daily_budget: '10000',
          name: 'Auto Ad Set',
          objective: 'LINK_CLICKS',
          optimization_goal: 'REACH',
          targeting: {'geo_locations':{'countries':['US'],'regions':[{'key':'4081'}],'cities':[{'key':777934,'radius':10,'distance_unit':'mile'}]},'genders':[1],'age_max':24,'age_min':20,'publisher_platforms':['facebook','audience_network'],'device_platforms':['mobile'],'flexible_spec':[{'interests':[{'id':this.state.targetAudienceId,'name':this.state.targetAudienceName}]}]},
          status: 'PAUSED',
        }
      })
        .then(response => {
          const responseData = response.data.data;
          const status = response.status;
          const statusText = response.statusText;
          const adSetId = response.data.data[0].id;
          this.setState({
            adSetId,
            isDirty: true,
            responseData,
            status,
            statusText,
          });
        })
        .catch((error) => {
          const errorMessage = error.response.data.error.message;
          const errorResponse = error;
          const status = error.response.status;
          const statusText = error.response.statusText;
          this.setState({
            hasError: true,
            errorMessage,
            errorResponse,
            status,
            statusText
          });
        })
        .then(() => {
          this.setState({
            isLoading: false
          });
        });
    });
  };

  postCreateAdCreative = () => {
    const url = `https://graph.facebook.com/${apiVersion}/${adAccountId}/adcreatives`;
    this.setState({ isLoading: true }, () => {
      axios.get(url, {
        params: {
          access_token: accessToken,
          name: 'Auto Creative',
          object_story_spec: { 'page_id': '2088874114709852', 'link_data': { 'link': 'https://johndoeford.com/', 'message': 'Fall in love with Ford this February. Lease a new 2019 Ford Escape SE 4x4 1.5L for only $199/mo for 24 months with $3,500 down and $0 security deposit. Hurry in!', 'name': 'Escape The February | John Doe Ford', 'picture': 'https://i.imgur.com//f7oAwXE.jpg' }},
        }
      })
        .then(response => {
          const responseData = response.data.data;
          const status = response.status;
          const statusText = response.statusText;
          this.setState({
            isDirty: true,
            responseData,
            status,
            statusText,
          });
        })
        .catch((error) => {
          const errorMessage = error.response.data.error.message;
          const errorResponse = error;
          const status = error.response.status;
          const statusText = error.response.statusText;
          this.setState({
            hasError: true,
            errorMessage,
            errorResponse,
            status,
            statusText
          });
        })
        .then(() => {
          this.setState({
            isLoading: false
          });
        });
    });
  };

  handleClick = name => {
    switch (name) {
    case 'search':
      this.getSearch();
      break;
    case 'createCampaign':
      this.postCreateCampaign();
      break;
    case 'createAdSet':
      this.getCreateAdSet();
      break;
    case 'createAdCreative':
      this.postCreateAdCreative();
      break;
    default:
      console.log('no can haz handle.');
    }
  }

  render() {
    const {
      adSetId,
      campaignId,
      errorMessage,
      errorResponse,
      isDirty,
      isLoading,
      hasError,
      responseData,
      status,
      statusText,
      targetAudienceId,
      targetAudienceName,
    } = this.state;

    return (
      <div className="App">
        <header>
          AET API Sandbox Test
        </header>
        <main className="sandbox">
          <div>
            <div>
              <div className={'api post'}>POST: /campaigns</div>
              <button className='red' onClick={() => this.handleClick('search')}>Create Campaign</button>
            </div>
            <div>
              <div className={'api get'}>GET: /search</div>
              <button className='green' onClick={() => this.handleClick('createCampaign')}>Define Targeting</button>
            </div>
            <div>
              <div className={'api get'}>GET: /adsets</div>
              <button className='blue' onClick={() => this.handleClick('createAdSet')}>Create Ad Set</button>
            </div>
            <div>
              <div className={'api post'}>POST: /adsets</div>
              <button className='purple' onClick={() => this.handleClick('createAdCreative')}>Provide Ad Creative</button>
            </div>
          </div>
          <div>
            {isLoading ?
              <div className="loading">
                <FontAwesomeIcon icon={faCog} size='3x' spin />
              </div> :
              <div>
                {isDirty && !hasError ?
                  <div>
                    <div className="status">
                      Status: <span className="success"> {status} {statusText} </span>
                    </div>
                    <div>
                      <JSONPretty data={responseData} theme={leetTheme} themeClassName='custom-json-pretty'></JSONPretty>
                    </div>
                  </div> :
                  <div style={{display: hasError ? "block" : "none" }}>
                    <div className="status">
                      Status: <span className='error'>{status} {statusText}</span>
                    </div>
                    <div>
                      Message: <span className='error'>{errorMessage}</span>
                    </div>
                    <div>
                      <JSONPretty data={errorResponse} theme={leetTheme} themeClassName='custom-json-pretty'></JSONPretty>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
          <div>
            <div>
              {isDirty &&
                <div className="data">
                  <div>Data:</div>
                  <div style={{display: targetAudienceId ? "block" : "none" }}>Target Audience ID: <span className="success">{targetAudienceId}</span></div>
                  <div style={{display: targetAudienceName ? "block" : "none" }}>Target Audience Name: <span className="success">{targetAudienceName}</span></div>
                  <div style={{display: campaignId ? "block" : "none" }}>Campaign ID: <span className="success">{campaignId}</span></div>
                  <div style={{display: adSetId ? "block" : "none" }}>Ad Set ID: <span className="success">{adSetId}</span></div>
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
