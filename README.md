# Integrations.js

Integrations.js makes it easy to enable 3rd party integrations for users of your product or service.

## Getting Started

You can view the overview of integrating in our documentation:
https://blockspring-help.readme.io/docs/integrations-js

We also have some [frequently asked questions](https://blockspring-help.readme.io/docs/integrations-js-faq)

## Currently Supported Integrations

- **Google Sheets:** let users sign in with Google, and export data from your page into Sheets.
- **Trello:** let users sign in with Trello, and create cards given data on your page.
- **Clearbit:** let users sign in with Clearbit, and lookup profile information about people mentioned on your page.

![](https://i.imgur.com/eAdkwxm.gif)

## Security
Blockspring takes security of our software very seriously. If you discover a security issue in the integrations.js project or the integrationsjs.com hosted service, please email the details to our security team at [security@integrationsjs.com](mailto:security@integrationsjs.com). We will respond to confirm the receipt of your message and follow up with a review of the issue and plan for mitigation. We follow responsible disclosure and will credit researchers when a security issue has been identified and mitigated.

[View More Security Details](https://blockspring-help.readme.io/docs/integrate-js-security)

## Getting started locally

```bash
yarn
cp .env.development{.sample,}
yarn run dev
open http://localhost:7000
```

> Note: We will soon be open sourcing a local test server for handling auth code based OAuth.

## Open Source TODOs
- Publish test dev server repo
- Add fallback to default to all integrations without site config
- Increase test coverage
- Factor out redux

## License

Released under the [MIT license](License.md).
