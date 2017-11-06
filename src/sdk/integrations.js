import { setUser } from '../actions/user';
import { setContext } from '../actions/context';

class IntegrationsJs {
  constructor(siteId, dispatch) {
    this.siteId = siteId;
    this.context = {};
    this.dispatch = dispatch;
    this.loaded = true;
  }

  setContext = (context = {}) => {
    this.context = context;
    this.dispatch(setContext({ ...context }));
    return this;
  }

  getContext = () => {
    return this.context;
  }

  identify = (user) => {
    this.user = user;
    this.dispatch(setUser({ ...user }));
    return this;
  }

  getIdentity = () => {
    return this.user;
  }
}

export default IntegrationsJs;
