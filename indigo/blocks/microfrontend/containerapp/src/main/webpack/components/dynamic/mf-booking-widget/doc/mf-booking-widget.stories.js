import BookingWidget from "../mf-booking-widget.hbs";

export default {
  title: "Components/React/BookingWidget",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { BookingWidget };

const Template = ({ ...args }) => <BookingWidget {...args} />;
export const Default = Template.bind({});
