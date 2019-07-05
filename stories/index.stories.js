import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from '../packages/button'


storiesOf('Basic', module)
  .add('Button', () => {
    return (
      <div>
        <Button onClick={action('clicked')}>Hello Button</Button>
        <Button disabled={true}>Hello Button</Button>
      </div>
    )
  })
