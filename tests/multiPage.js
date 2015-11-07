module.exports = {
  'test multiple pages': function(browser){
    var urls = [];
    browser.url('http://climate.nasa.gov/state_of_flux')
      .waitForElementVisible('body',1000)
      .nested()
      .end()
  }
}
