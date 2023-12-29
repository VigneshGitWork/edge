import PassengerEdit from "../mf-passenger-edit.hbs";

export default {
  title: "Components/React/PassengerEdit",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { PassengerEdit };

const Template = ({ ...args }) => <PassengerEdit {...args} />;
export const Default = Template.bind({});
