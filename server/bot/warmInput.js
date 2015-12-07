/* global routeContext */
/* global Twilio */
/* global Router */

Router.route('twilio/endpoint',{where:'server'})
	.post(function(){
		var userRequest = this.request.body;
		var response = this.response;

		// var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		// xmlData += "<Response>";
		// xmlData += "<Message>HELLO WORLD</Message>";
		// xmlData += "</Response>";
		
		var xmlData = Meteor.call('warmProcess',userRequest)
		
		this.response.writeHead(200,{'Content-Type':'application/xml'});
		this.response.end(xmlData);
		
		
		
		

	});
	
	


