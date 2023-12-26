import Srp from "../mf-srp.hbs";

export default {
  title: "Components/React/Srp",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { Srp };

const Template = ({ ...args }) => <Srp {...args} />;
export const Default = Template.bind({});
