import React from "react";
import InternationalPassengerDetails from "../mf-international-passenger-details";

export default {
	title: "Components/React/InternationalPassengerDetails",
	argTypes: {},
};

export { InternationalPassengerDetails };

const Template = ({ ...args }) => <InternationalPassengerDetails {...args} />;
export const Default = Template.bind({});
