import React from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'
import {AddCardLinkComponent} from 'rt/components/AddCardLink'

const data = require('./data/collapsible.json')

const CustomAddCardLink: AddCardLinkComponent = ({onClick, t}) => (
  <button onClick={onClick}>{t('Click to add card')}</button>
)

storiesOf('Custom Components', module).add('AddCardLink', () => {
  return <Board data={data} editable={true} components={{AddCardLink: CustomAddCardLink}} />
})
