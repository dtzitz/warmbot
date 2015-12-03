/* global routeContext */
/* global Twilio */
/* global Router */

Router.route('twilio/endpoint',{where:'server'})
	.post(function(){
		var request = this.request.body;
		console.log(request.From);
		
		var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		xmlData += "<Response>";
		xmlData += "<Message>"+request.From+"</Message>";
		xmlData += "</Response>";
		
		this.response.writeHead(200,{'Content-Type':'application/xml'});
		this.response.end(xmlData);
	});
	
// var date = new Date();//consider bringing in moment.js for more complex date time interactions
// var messageSid = routeContext.params.query.MessageSid;
// var accountSid = routeContext.params.query.AccountSid;
// var fromNumber = routeContext.params.query.From;
// var toNumber = routeContext.params.query.To;
// var messageBody = routeContext.params.query.Body;

// if (!fromNumber){
// 	return 'Error - No from number';
// }


