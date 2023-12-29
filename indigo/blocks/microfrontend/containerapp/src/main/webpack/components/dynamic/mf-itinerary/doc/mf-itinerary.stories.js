import Itinerary from "../mf-itinerary.hbs";

export default {
  title: "Components/React/Itinerary",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { Itinerary };

const Template = ({ ...args }) => <Itinerary {...args} />;
export const Default = Template.bind({});
