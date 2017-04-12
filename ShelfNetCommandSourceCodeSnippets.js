//the set led funtion on shelfnet
function unitSetLed()
				{
					var setled = {
						'id' : JSON.parse(select_led_id.value),
						'brightness' : JSON.parse(input_brightness_id.value),
						'sequence' : JSON.parse(input_sequence_id.value),
						'color' : JSON.parse(input_color_id.value)
					};
					
					// Patch the prepared byte sequence as it does not change any structural details
					var bytes = window.unit.unit.cmds.setRgbBlack.bytes.data;
					
					bytes[28] = setled.id;
					bytes[30] = setled.brightness;
					bytes[32] = setled.sequence;
					bytes[34] = setled.color;
					
					XHR.Post('/shelfbus', shelfbus_post_prepare, shelfbus_post_progress, shelfbus_post_success, shelfbus_post_failure, JSON.stringify(bytes));
					
					console.log(setled);
					
//list of commands to send to the shelfnet					
addUnitCommand(unitDiv, {k:'identify', h: '<u>I</u>dentify', i:{}}); //line 1078
	addUnitCommand(unitDiv, {k:'getstate', h: '<u>G</u>etState', i:{}});
	addUnitCommand(unitDiv, {k:'gettime', h: 'Get<u>T</u>ime', i:{}});
	addUnitCommand(unitDiv, {k:'beep', h: '<u>B</u>eep', i:{}});
	addUnitCommand(unitDiv, {k:'set_led', h: 'Set <u>L</u>ed', i:{'id':'led_id','brightness':'led_brightness','sequence':'led_sequence','color':'led_color'}});
	addUnitCommand(unitDiv, {k:'get_temp_rh', h: 'Get Temperature and relative <u>H</u>umidity', i:{}});
	addUnitCommand(unitDiv, {k:'get_brightness', h: 'Get B<u>r</u>ightness', i:{}});