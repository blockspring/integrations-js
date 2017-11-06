import GoogleSheets from '../components/integrations/GoogleSheets';
import Trello from '../components/integrations/Trello';
import Clearbit from '../components/integrations/Clearbit';

export default {
  google_sheets: {
    id: 'google_sheets',
    name: 'Google Sheets',
    component: GoogleSheets,
    icon: 'https://cdn.integrationsjs.com/icons/GoogleSheets.png',
    contextSelectors: [
      ['datasets'],
    ],
    backgroundColor: '#3FA142',
    textColor: 'white',
    oauthSlug: 'ijs_google_sheets',
    description: 'Export data to Google Sheets',
  },
  trello: {
    id: 'trello',
    name: 'Trello',
    component: Trello,
    icon: 'https://cdn.integrationsjs.com/icons/Trello.png',
    contextSelectors: [
      ['title', 'description'],
    ],
    backgroundColor: '#1086E8',
    textColor: 'white',
    oauthSlug: 'ijs_trello',
    description: 'Create new Trello cards',
  },
  clearbit: {
    id: 'clearbit',
    name: 'Clearbit',
    component: Clearbit,
    icon: 'https://cdn.integrationsjs.com/icons/Clearbit.png',
    contextSelectors: [
      ['people'],
    ],
    backgroundColor: '#4498FF',
    textColor: 'white',
    oauthSlug: 'ijs_clearbit',
    description: 'View contacts\' profiles and employment information',
  },
};
