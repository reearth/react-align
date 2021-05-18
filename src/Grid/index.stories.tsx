import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import Grid from "./";

export default {
  title: "Grid",
  component: Grid,
};

const Template: Story<ComponentProps<typeof Grid>> = args => <Grid {...args} />;

export const GridWrapper = Template.bind({});
GridWrapper.args = {
};
