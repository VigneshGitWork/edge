export const configJson = {
	info_errorMessageItemList: {
		items: [
			{
				type: "Error",
				code: "nsk-server:Credentials:Failed",
				message:
					"Invalid username or password.Please try again and make sure that caps is not turned on your computer keyboard.",
			},
			{
				type: "Error",
				code: "E001",
				message: "Mandatory Field Missing/Null",
			},
			{
				type: "Error",
				code: "E002",
				message: "Object Missing/Null",
			},
			{
				type: "Error",
				code: "E003",
				message: "Secret Key Not Supplied",
			},
			{
				type: "Error",
				code: "E004",
				message: "No record found",
			},
			{
				type: "Error",
				code: "E005",
				message: "Internal Server Error",
			},
			{
				type: "Info",
				code: "Login successful",
				message: "User logged in successfully",
			},
		],
	},
};
