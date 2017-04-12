/*eslint-disable */
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
	var that;

	return Controller.extend("gatewayapplicationIoTCapstoneProject.controller.SplitApp", {
		
		
		onInit: function(){
			 that = this;
			/*
			/////////////////Working Theory///////////////////////////////////////////////////////////////////
			//if u have the JSON OF this url https://iotrdmsiotservices-p1942404413trial.hanatrial.ondemand.com/com.sap.iotservices.dms/v2/api/devices
			var oModel = new JSONModel({"devices": [{
				"id": "27a0dcd3-9db4-4288-bc03-8cf5a0081d0f",
				"name": "exsg",
				"deviceType": "2007afc1ecaca0e64656",
				"attributes": [{
					"key": "id",
					"value": " 30344719333832391b002000"
				}]
			}, {
				"id": "671f9a14-102b-447a-9827-fd11f4b93ff2",
				"name": "exom",
				"deviceType": "2007afc1ecaca0e64656",
				"attributes": [{
					"key": "id",
					"value": "30344719333832391a002600"
				}]
			}, {
				"id": "76ee3496-02b7-4f45-8571-a661a5b936b7",
				"name": "Gateway",
				"deviceType": "e3b4fd8ac2ab083880d3"
			}]});
			
			this.getView().setModel(oModel, "devices");
			console.log(this.getView().getModel("devices").getData());
			//look SplitAppView how 2 bind the Model 2 the list   LINE 88++
		*/	

			
			//--> so var model = new JSONModel({"devices": result);
			//this.getView().setModel(result, "devices");
			// if  result  = https://iotrdmsiotservices-p1942404413trial.hanatrial.ondemand.com/com.sap.iotservices.dms/v2/api/devices
			
			////Working Theory End
			
			var oData = IOT.getDevices(function(result) {
				
				//If accepted, bind the result to OModel for view to access in master list.
				var oModel = new JSONModel({"devices": result});
				//This is the part that causes it to hang. We believe "this" is targeting the wrong function. "this" should be refering to onInit().
				that.getView().setModel(oModel, "devices");
				//If the above code fails, this toast message will not appear.
				//MessageToast.show(JSON.stringify(result, null, 4), {duration: 5000});
			},function(error) {
				MessageToast.show("Message Error", {duration: 5000});
			});
			
		},

		handleItem: function (oEvt){
			var pressed = oEvt.getParameters().listItem;
            var title = pressed.mProperties.title;
            
            
            
            MessageToast.show(title);
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