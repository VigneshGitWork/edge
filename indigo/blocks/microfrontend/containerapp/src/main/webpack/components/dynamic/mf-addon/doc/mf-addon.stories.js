import Addon from "../mf-addon.hbs";

export default {
  title: "Components/React/Addon",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { Addon };

const Template = ({ ...args }) => <Addon {...args} />;
export const Default = Template.bind({});
