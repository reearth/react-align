import React from 'react';
import * as ReactDOM from 'react-dom';
import { Wrapper as GridWrapper } from '../stories/GridWrapper.stories';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GridWrapper />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
