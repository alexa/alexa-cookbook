var Constants = {
  /**
   * API Config
   * @type {Object}
   */
  api: {
    baseURL: 'https://api.voicelabs.co/',
    eventsAPI: 'events/',
    appsAPI: 'apps/',
  },
  /**
   * Returns a formatted authentication URL
   * @param  {String} baseUrl String containing the API base URL
   * @param  {String} token   String containing the unique app token
   * @return {String}         String formatted with auth URL
   */
  authURL: function(baseUrl, token){
    var query = 'auth_token=' + token;

    return (baseUrl + '&' + query).replace(/[&?]{1,2}/, '?');
  }
};

module.exports = Constants;
