
Meteor.methods({
	warmProcess:function(request){
		
		var messageText = request.Body.toLowerCase();
		
		var weatherRegex = /\b(weather|rain|temperature)\b/;
		
		if (weatherRegex.test(messageText)){
			
			//should probably call to an actual weather API
			//using area code for location information
			var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
			xmlData += "<Response>";
			xmlData += "<Message>IT'S GON\' RAIN</Message>";
			xmlData += "</Response>";
		
			return xmlData;
			
		}
		
		
	}
})

// var date = new Date();//consider bringing in moment.js for more complex date time interactions
// request.MessageSid;
// request.AccountSid;
// request.From;
// request.To;
// request.Body;

		// var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		// xmlData += "<Response>";
		// xmlData += "<Message>"+request.Body+"</Message>";
		// xmlData += "</Response>";
		
		// return xmlData;