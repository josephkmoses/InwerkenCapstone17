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
	var focusedListItemID;
	
	return Controller.extend("gatewayapplicationIoTCapstoneProject.controller.Master", {
		
		onInit: function(){
			
			that = this;
			
			//Adding communication with the master parent view to the Detail child view for LED pushes from switch
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("Detail", "pushLEDChange", that.pushLEDChange, that);
			
			
			var oData = IOT.getDevices(function(result) {
				
				//If accepted, bind the result to OModel for view to access in master list.
				var oModel = new JSONModel({"devices": result});
				//This is the part that causes it to hang. We believe "this" is targeting the wrong function. "this" should be refering to onInit().
				that.getView().setModel(oModel, "devices");
				//If the above code fails, this toast message will not appear.
				console.log(JSON.stringify(result, null, 4));
			},function(error) {
				MessageToast.show("Message Error", {duration: 5000});
			});
			
		},

		masterListItemFocus: function (oEvt){
			var pressed = oEvt.getParameters().listItem;
            var title = pressed.mProperties.title;
            focusedListItemID = pressed.mProperties.description;
            //MessageToast.show("Focusing on " + focusedListItemID, {duration: 5000});
            console.log(that.getFocusedListItemID());
            
			
            
            //var oAuthToken = "a44ab95f618aa7e53c37aa6ffdd61a3";
            
			//Communicating with the iotmms to get information related to the selected list item.
			//Upon completion, an oModel should be defined to populate the detail pane.
            var oData = IOT.getData(focusedListItemID, function(result) {
            	
            	
				MessageToast.show(JSON.stringify(result, null, 4), {duration: 5000});
			}, function(error) {
				MessageToast.show("Message Error", {duration: 5000});
			},{
		        headers: {
		            //"Authorization": "Bearer " + oAuthToken,
		            "Accept" : "application/json"
		    }});
			
		},
		
		getFocusedListItemID: function() {
			return focusedListItemID;
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
			var result = this.byId("Master");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},
		
		//Switch functionality. Will not work until destinations are working.
		pushLEDChange : function(oEvent, oData) {
			//Gather information for device push
			var deviceID = focusedListItemID //Currently focused list item. Switch won't work unless one was selected.
			var messageTypeID = "94b6e5322f395cfbaaf3";
			var timestamp = new Date().getTime();
			var messages = null;
			var isGreen = oData.text;
			
			if(isGreen) {
				MessageToast.show("Resolving issue...", {duration: 5000});
				//LED change for exom
				messages = [{
					"id": focusedListItemID, 
					"timestamp": "2012-04-23T18:25:43.511Z",
					"setLEDGreen": "true"
				}];
				IOT.pushData(deviceID, "http", "UI5 Front End", messageTypeID, messages,
				function(result) {
					MessageToast.show("Message was pushed", {duration: 5000});
				}, function(result) {
					MessageToast.show("Message push error", {duration: 5000});
				});
			} else {
				MessageToast.show("Creating issue...", {duration: 5000});
				//LED change for exom
				messages = [{
					"id": focusedListItemID, 
					"timestamp": "2012-04-23T18:25:43.511Z",
					"setLEDGreen": "false"
				}];
				IOT.pushData(deviceID, "http", "UI5 Front End", messageTypeID, messages,
				function(result) {
					MessageToast.show("Message was pushed", {duration: 5000});
				}, function(result) {
					MessageToast.show("Message push error", {duration: 5000});
				});
			}
		}
		
	});
});