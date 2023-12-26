import React from "react";
import HotelBookings from "../mf-hotel-bookings";

export default {
	title: "Components/React/HotelBookings",
	argTypes: {},
};

export { HotelBookings };

const Template = ({ ...args }) => <HotelBookings {...args} />;
export const Default = Template.bind({});
