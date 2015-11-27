/* global Session */
/* global Template */
/* global Meteor */


Meteor.subscribe("groups")

Template.body.helpers({
  groups : function(){
    return Groups.find({},{sort:{createdAt: -1}});
  }
})

Template.body.events({
  
  "submit .new-group": function(event){
    var newGroup = event.target.group.value;
    Meteor.call("addGroup", newGroup);
    event.target.group.value = "";
    return false;
  },
  
  "submit .new-number": function(event){
    var newNumber = event.target.number.value;
    Meteor.call("addNumber", this._id, newNumber);
  },
  
  "submit .new-text": function(event){
    var newMessage = event.target.message.value;
    Meteor.call("sendMessage", newMessage);
    event.target.message.value = "";
    alert('Your message is being sent.')
    return false;
  }
  
})

Template.group.events({
  "click .toggle-group":function(){
    //call with the opposite of the current checked value
    Meteor.call("toggleGroup", this._id,!this.checked);
  },
  
  "click .toggle-number": function(){
    var data = Template.instance().data;
    Meteor.call("toggleNumber", data._id, this.number, !this.checked);
  },
  
  "click .delete-group": function(){
    Meteor.call("deleteGroup", this._id);
  },
  
  "click .delete-number": function(){
    var group = Template.instance().data;
    Meteor.call("deleteNumber", group._id, this.number);
  }
})