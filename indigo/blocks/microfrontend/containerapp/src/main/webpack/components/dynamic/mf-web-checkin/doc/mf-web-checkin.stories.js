import WebCheckin from "../mf-web-checkin.hbs";

export default {
	title: "Components/React/WebCheckin",
	// More on argTypes: https://storybook.js.org/docs/html/api/argtypes
	argTypes: {},
};

export { WebCheckin };

const Template = ({ ...args }) => <WebCheckin {...args} />;
export const Default = Template.bind({});
