/* global API */
API = {
  authentication: function( apiKey ) {
    //SMS not great for auth, perhaps build a white list of #s
  },
  connection: function( request ) {
    //logic for pulling out API keys and sending them to auth users if we had it
  },
  
  handleRequest: function( context, resource, method ) {
    var connection = API.connection(context.request);
    if(!connection.error){
      API.methods[resource][method](context,connection);
    } else{
      API.utility.response(context, 401, connection);
    }
  },
  
  methods: {
    message: {
      GET: function( context, connection ) {
        var hasQuery = API.utility.hasData(connection.data);
        
        if (hasQuery){
          
        }
      },
      
      POST: function( context, connection ) {},
      PUT: function( context, connection ) {},
      DELETE: function( context, connection ) {}
    }
  },
  resources: {},
  utility: {
    getRequestContents: function( request ) {
      switch(request.method){
        case "GET":
          return request.query;
        case "POST":
        case "PUT":
        case "DELETE":
          return request.body;
      }
    },
    hasData: function( data ) {},
    response: function( context, statusCode, data ) {
      context.response.setHeader('Content-Type','application/json');
      context.response.statusCode = statusCode;
      context.response.end(JSON.stringify(data));
    },
    validate: function( data, pattern ) {}
  }
};