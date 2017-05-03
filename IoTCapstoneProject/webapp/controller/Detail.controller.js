/*eslint-disable */
sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	'gatewayapplicationIoTCapstoneProject/utils/IOT'
], function(jQuery, MessageToast, Fragment, Controller, Filter, JSONModel, IOT) {
	"use strict";

	var that;

	return Controller.extend("gatewayapplicationIoTCapstoneProject.controller.Detail", {

		onInit: function() {
			
			that = this;
			
			var testDeviceData = [{
				"timestamp" : "2017-04-28 18:25:43.511",
				"celcius" : "21.87",
				"humidity" : "1.68",
				"lux" : "10.12",
				"isoutofbounds" : "true"
			},{
				"timestamp" : "2017-04-25 11:25:43.511",
				"celcius" : "21.85",
				"humidity" : "33.63",
				"lux" : "9.14",
				"isoutofbounds" : "false"
			},{
				"timestamp" : "2017-04-19 10:25:43.511",
				"celcius" : "20.03",
				"humidity" : "31.00",
				"lux" : "3.14",
				"isoutofbounds" : "false"
			},{
				"timestamp" : "2017-04-15 20:25:43.511",
				"celcius" : "21.85",
				"humidity" : "33.03",
				"lux" : "0.14",
				"isoutofbounds" : "false"
			},{
				"timestamp" : "2017-04-10 10:25:43.511",
				"celcius" : "21.85",
				"humidity" : "33.94",
				"lux" : "1.00",
				"isoutofbounds" : "false"
			}];
			
			var oModel = new JSONModel({"deviceData": testDeviceData});
			that.getView().setModel(oModel, "deviceData");
			console.log(JSON.stringify(testDeviceData, null, 4));
			
			var detailCollection = that.getView().getModel("deviceData").getData().collection;
			console.log(detailCollection);
					
		},
		
		onSwitchPress: function(oEvent) {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("Detail", "pushLEDChange", {text: oEvent.getSource().getState()});
		}


	});

});