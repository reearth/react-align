import React from 'react';
import * as ReactDOM from 'react-dom';
import GridWrapper from '../src/Grid/GridWrapper';

describe('GridWrapper', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GridWrapper />, div);
  });
});
