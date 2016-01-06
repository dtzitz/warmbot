/* global HTTP */
/* global Meteor */
/* global Groups */

//http://www.codeadventures.com/phone-number-verification-via-twilio-sms-in-meteor/
//http://cryptb.in/kWc

Meteor.publish("groups", function(){
	return Groups.find({owner: this.userId})
})

Meteor.methods({
	addGroup: function(name){
		
		if (name != '') {
			Groups.insert({
				name: name,
				createAt: new Date(),
				owner: Meteor.userId(),
				checked: false,
				numbers: []
			});
		}
		
		
	},
	
	addNumber: function(groupId, number){
		if (number != '') {
			Groups.update(
				{_id:groupId},
				{$addToSet:{numbers:{"number": number, "checked": true}}}
		);
		}
	},
	
	deleteGroup: function(groupId){
		if(Meteor.userId()){
			Groups.remove({_id:groupId});
		}
	},
	
	deleteNumber: function(groupId, number){
		if(Meteor.userId()){
			Groups.update({_id:groupId},{$pull:{numbers: {"number":number}}});
		}
	},
	
	toggleGroup:function(groupId, toggle){
		if(Meteor.userId()){
			Groups.update({_id:groupId},{$set:{checked:toggle}});
			//find every number that differs from the group's 'checked boolean
			var numbers = Groups.find({numbers:{$elemMatch:{"checked": !toggle}}});
			
			//this will set all numbers in a group to match the checked, refactor needed
			numbers.forEach(function (setter){
				for (var index in setter.numbers){
					Groups.update(
						{_id:groupId, "numbers.number":setter.numbers[index].number},
						{$set:{"numbers.$.checked": toggle}}
					);
				}
			})
		}
	},
	
	toggleNumber:function(groupId, number, toggle){
		if(Meteor.userId()){
			Groups.update(
				{_id:groupId, "numbers.number":number},
				{$set: {"numbers.$.checked":toggle}}
			);
		}
	},
	
	sendMessage:function(outgoingMessage){
		var phonebook = [];
		var recipients = Groups.find({numbers:{$elemMatch:{"checked":true}}});
		
		recipients.forEach(function(recipient){
			for (var index in recipient.numbers){
				phonebook.push(recipient.numbers[index].number);
			}
		});
		
		//use Set to make sure all phone numbers are unique
		var uniquePhoneBook = new Set(phonebook);
		
		//mystery logic in twilio.js file
		//3215f6c96b27214ed3c75fb927423eb6
		var TWILIO_ACCOUNT_SID = Meteor.call('secret_account_SID');
		var TWILIO_AUTH_TOKEN = Meteor.call('secret_auth_token');
		var TWILIO_NUMBER = Meteor.call('secret_twilio_number');
		var MessagingServiceSid = Meteor.call('secret_msg_SID');
		
		uniquePhoneBook.forEach(function(number){
			HTTP.call(
				"POST",
				'https://api.twilio.com/2010-04-01/Accounts/'+TWILIO_ACCOUNT_SID+'/SMS/Messages.json',
				{
					params:{
						MessagingServiceSid: MessagingServiceSid,
						From: TWILIO_NUMBER,
						To: number,
						Body: outgoingMessage
					},
					auth: TWILIO_ACCOUNT_SID+':'+TWILIO_AUTH_TOKEN
				},
				function (error){
					if (error){
						console.log(error);
					}
					else{
						console.log('SMS sent successfully')
					}
				}
			);
		});
		
	}
	
})