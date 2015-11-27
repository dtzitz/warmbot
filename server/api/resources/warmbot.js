/* global API */
/* global Router */
//usese iron router to create a server side route or endpoint
Router.route('/api/v1/warmbot', function(){
	this.response.setHeader('Access-Control-Allow-Origin', '*');
	
	if ( this.request.method === "OPTIONS" ) {
    this.response.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
    this.response.setHeader( 'Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS' );
    this.response.end( 'Set OPTIONS.' );
  } else {
    API.handleRequest( this, 'warmbot', this.request.method );
  }
}, {where:'server'});