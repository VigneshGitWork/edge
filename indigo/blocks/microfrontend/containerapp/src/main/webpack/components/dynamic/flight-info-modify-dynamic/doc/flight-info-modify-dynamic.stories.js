import FightInfoModify from "../flight-info-modify-dynamic.hbs";

export default {
  title: "Components/React/FightInfoModify",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { FightInfoModify };

const Template = ({ ...args }) => <FightInfoModify {...args} />;
export const Default = Template.bind({});
