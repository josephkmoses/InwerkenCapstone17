/*eslint-disable no-console, no-alert */
sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	"gatewayapplicationIoTCapstoneProject/utils/IOT"
], function(jQuery, MessageToast, Fragment, Controller, Filter, JSONModel, IOT) {
	"use strict";

	return Controller.extend("gatewayapplicationIoTCapstoneProject.controller.SplitApp", {
		
		onInit: function(){
			this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});
			
			//Defining Sensor OData Model
	        var oData = {
	           sensor : {
	              name : "Sensor Name",
	              id : "ID",
	              timestamp : "timestamp"
	           }
	        };
	         
	        var oModel = new JSONModel(oData);
	        this.getView().setModel(oModel);
			
			//This is being used to mainly debug the destination connectivity.
			IOT.getDevices(function(result) {
				MessageToast.show(result, {duration: 5000});
			},function(error) {
				MessageToast.show("Message Error", {duration: 5000});
			});
		},
		
		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},
 
		onPressNavToDetail : function(oEvent) {
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},
 
		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},
 
		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},
 
		onPressGoToMaster : function() {
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},
 
		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
 
			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},
 
		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();
 
			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		},
 
		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},
		
		//Switch functionality. Will not work until destinations are working.
		onSwitchChange : function(oEvent) {
			//Gather information for device push
			//This is a test to push to ToggleLED table with registered Gateway Device
			var deviceID = "76ee3496-02b7-4f45-8571-a661a5b936b7";
			var messageTypeID = "94b6e5322f395cfbaaf3";
			var timestamp = new Date().getTime();
			var messages = null;
			var isGreen = oEvent.getSource().getState();
			
			if(isGreen) {
				MessageToast.show("Resolving issue...", {duration: 5000});
				
			} else {
				MessageToast.show("Creating issue...", {duration: 5000});
				messages = [{
					"id": "30344719333832391a002600", //LED change for exom
					"timestamp": timestamp,
					"setGreenLED": true
				}];
				IOT.pushData(deviceID, "http", "UI5 Front End", messageTypeID, messages,
				function(result) {
					MessageToast.show("Message was pushed", {duration: 5000});
					MessageToast.show(result, {duration: 5000});
				}, function(result) {
					MessageToast.show("Message push error", {duration: 5000});
				}, {
		        headers: {
		            "Authorization": "Bearer " + "38f076a2a3daabae17e45d7224689861",
		            "Content-type" : "text/html"
		        }
		    	});
			}
		}
		
	});
});