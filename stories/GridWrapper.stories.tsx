import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import GridWrapper from "../src/Grid/GridWrapper";

export default {
  title: "Grid",
  component: GridWrapper,
};

const Template: Story<ComponentProps<typeof GridWrapper>> = args => <GridWrapper {...args} />;

export const Wrapper = Template.bind({});
Wrapper.args = {};
