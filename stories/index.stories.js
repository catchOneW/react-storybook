import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import '../css/index.css'
import Button from '../packages/Button'
storiesOf('Basic', module)
  .add('Button',
    () => {
      return (
        <div>
          <Button></Button>
        </div>
      )
    }
  )