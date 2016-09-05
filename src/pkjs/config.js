module.exports = [
	{
		"type"        : "heading",
		"defaultValue": "Engineering+"
	},
	{
		"type"        : "text",
		"defaultValue": "Engineering+"
	},
	{
		"type" : "section",
		"items": [
			{
				"type"        : "heading",
				"defaultValue": "Colors"
			},
			{
				"type"        : "color",
				"appKey"      : "colorBackground",
				"defaultValue": "FFFFFF",
				"label"       : "Background Color"
			},
			{
				"type"        : "color",
				"appKey"      : "colorLabel",
				"defaultValue": "000000",
				"label"       : "Label Color"
			},
			{
				"type"        : "color",
				"appKey"      : "colorHourMark",
				"defaultValue": "000000",
				"label"       : "Hour Mark Color"
			},
			{
				"type"        : "color",
				"appKey"      : "colorMinuteMark",
				"defaultValue": "000000",
				"label"       : "Minute Mark Color"
			},
			{
				"type"        : "color",
				"appKey"      : "colorHourHand",
				"defaultValue": "000000",
				"label"       : "Hour Hand Color"
			},
			{
				"type"        : "color",
				"appKey"      : "colorMinuteHand",
				"defaultValue": "000000",
				"label"       : "Minute Hand Color"
			},
			{
				"type"        : "color",
				"appKey"      : "colorSecondHand",
				"defaultValue": "000000",
				"label"       : "Second Hand Color"
			}
		]
	},
	{
		"type" : "section",
		"items": [
			{
				"type"        : "heading",
				"defaultValue": "Features"
			},
			{
				"type"        : "toggle",
				"appKey"      : "toggleNumbers",
				"label"       : "Numbers",
				"defaultValue": true
			},
			{
				"type"        : "toggle",
				"appKey"      : "toggleSecondHand",
				"label"       : "Second Hand",
				"defaultValue": true
			},
			{
				"type"        : "toggle",
				"appKey"      : "toggleDate",
				"label"       : "Date",
				"defaultValue": true
			},
			{
				"type"        : "toggle",
				"appKey"      : "toggleTemperature",
				"label"       : "Temperature",
				"defaultValue": true
			},
			{
				"type"        : "toggle",
				"appKey"      : "toggleSteps",
				"label"       : "Steps",
				"defaultValue": true
			},
			{
				"type"        : "radiogroup",
				"appKey"      : "radiogroupUnits",
				"label"       : "Units",
				"options"     : [
					{
						"label": "Imperial",
						"value": "Imperial"
					},
					{
						"label": "Metric",
						"value": "Metric"
					}
				],
				"defaultValue": "Imperial"
			}
		]
	},
	{
		"type"        : "submit",
		"defaultValue": "Save Settings"
	}
];