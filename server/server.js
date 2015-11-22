/* global Meteor */
/* global Groups */


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
	}
	
})