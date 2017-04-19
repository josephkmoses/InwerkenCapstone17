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

	return Controller.extend("gatewayapplicationIoTCapstoneProject.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf gatewayapplicationIoTCapstoneProject.view.Detail
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf gatewayapplicationIoTCapstoneProject.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf gatewayapplicationIoTCapstoneProject.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},
		
		onSwitchPress: function(oEvent) {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("Detail", "pushLEDChange", {text: oEvent.getSource().getState()});
		}


	});

});