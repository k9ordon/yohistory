Yos = new Mongo.Collection("yos");

Router.route('/', function () {
  this.render('list');
});

Router.route('/in', function () {
    var req = this.request;
    var res = this.response;

    Yos.insert({date: new Date(), query: req.query, url: req.url});

    res.end('hello from the server\n');
}, {where: 'server'});


if (Meteor.isClient) {

    Template.item.helpers({
        mapurl: function() {
            if(!this.query.location) return false;
            return "https://maps.google.com/maps?q=" + decodeURIComponent(this.query.location).replace(";", ",") + "&hl=es;z=14&output=embed";
        },
        shortlink: function() {
            return this.query.link.split(100,1);
        }
    });

    Template.list.helpers({
        yos: Yos.find({}, {sort: {date: -1}})
    });

    Template.list.events({
    });
/*
    Template.list.rendered = function() {
    	var _yoData = {
    		"username": "K9ORDON",
    		"trigger": "yo yoyo yoyoyoy"
    	};
    	var s = document.createElement("script");
    	s.type = "text/javascript";
    	s.src = "//yoapp.s3.amazonaws.com/js/yo-button.js";
    	(document.head || document.getElementsByTagName("head")[0]).appendChild(s);
    };
*/
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
