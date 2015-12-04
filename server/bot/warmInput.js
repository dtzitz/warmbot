/* global routeContext */
/* global Twilio */
/* global Router */

Router.route('twilio/endpoint',{where:'server'})
	.post(function(){
		var request = this.request.body;
		console.log(request.From);
		
		
		//should be:
		var xmlData = Meteor.call('warmProcess',request)
		
		this.response.writeHead(200,{'Content-Type':'application/xml'});
		this.response.end(xmlData);
	});
	


// if (!fromNumber){
// 	return 'Error - No from number';
// }


