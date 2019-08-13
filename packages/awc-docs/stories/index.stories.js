import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { AwcDocs } from '../src/AwcDocs.js';
import '../awc-docs.js';

storiesOf('awc-docs', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(AwcDocs))
  .add(
    'Alternative Title',
    () => html`
      <awc-docs .title=${'Something else'}></awc-docs>
    `,
  );
