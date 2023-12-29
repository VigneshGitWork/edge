import ReviewSummary from "../mf-review-summary.hbs";

export default {
  title: "Components/React/ReviewSummary",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

export { ReviewSummary };

const Template = ({ ...args }) => <ReviewSummary {...args} />;
export const Default = Template.bind({});
