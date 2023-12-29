import RetrievePnr from "../mf-retrieve-pnr";

export default {
  title: "Components/React/RetrivePnr",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { RetrievePnr };

const Template = ({ ...args }) => <RetrievePnr {...args} />;
export const Default = Template.bind({});
