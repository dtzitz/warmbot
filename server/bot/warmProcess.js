/* global Meteor */
/* global HTTP */

Meteor.methods({
	warmProcess:function(request){
		
		var messageText = request.Body.toLowerCase();
		
		var weatherRegex = /\b(weather|rain|temperature)\b/;
		var zipcodeRegex = /[0-9]{5}/;
		
		if(weatherRegex.test(messageText)){
			
			// api.openweathermap.org/data/2.5/find?q=London&units=imperial
			//using area code for location information?
			var openWeatherKey = Meteor.call('openWeather')
			var zipcode = zipcodeRegex.exec(messageText)
			
			//country code of us is hard coded for now
			//had a terrible time trying to make this http call async. will need help if going to refactor
			var weatherData = HTTP.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode[0]+',us&units=imperial&APPID='+openWeatherKey);
			console.log("weather data is"+weatherData);
			var temperature = String(weatherData.data.main.temp);
			
			var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
			xmlData += "<Response>";
			xmlData += "<Message>The temperature is "+temperature+"F</Message>";
			xmlData += "</Response>";
			console.log('data from after http get '+xmlData);
			
			return xmlData;
			

		
			

		//else weatherRexex == false	
		}else{
			console.log('stupid sandwich');
			var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
			xmlData += "<Response>";
			xmlData += "<Message>Beep boop. I'm a stupid sandwich.</Message>";
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
		
		


						