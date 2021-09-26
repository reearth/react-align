import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';

import GridWrapper from '../Grid/GridWrapper';
import GridSection from '../Grid/GridSection';
import GridArea from '../Grid/GridArea';

export default {
  title: 'Grid',
  component: GridArea,
};

const BasicOneAreaOneItem: Story<ComponentProps<typeof GridArea>> = args => (
  <div style={{ width: '500px', height: '600px' }}>
    <GridWrapper>
      <GridSection>
        <GridArea {...args} />
      </GridSection>
    </GridWrapper>
  </div>
);

export const Wrapper = BasicOneAreaOneItem.bind({});
Wrapper.args = {
  styles: {
    background: '#4770FF',
  },
};