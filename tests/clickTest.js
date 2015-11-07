module.exports = {
  'Load page, get description and credit text' : function(browser) {
    browser
      .url('http://climate.nasa.gov/state_of_flux')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('div[class=nav_arrow_right]', 1000)
      .waitForElementVisible('a[id=download_link]',1000)
      .click('span[id=credits_link]')
      .waitForElementVisible('div[id=credits]',1000)
      .getText('div[id=description_text]', function(result){
        //console.log(result.value);
      })
      .getText('div[id=credits] p',function(result){
        //console.log(result.value);
      })
      .pause(1000)
  },
  'Click download link, check image' : function(browser){
     browser
      .click('a[id=download_link]')
      .window_handles(function(result){
        var handle = result.value[1];
	browser.switchWindow(handle);
      })
      .getAttribute('img', 'src', function(result){
        console.log(result);
      })
      .getElementSize('img',function(result){
        this.assert.equal(typeof result, "object");
	this.assert.equal(result.status, 0);
	//this.assert.equal(result.value.width, 1920);
	//this.assert.equal(result.value.height, 1200);
      })
      .pause(1000)
      .closeWindow()
  },
  'Return to previous window, and move to next' : function(browser){
    browser
      .window_handles(function(result){
        var handle = result.value[0]
	browser.switchWindow(handle);
      })
      .waitForElementVisible('div[class=nav_arrow_right]', 1000)
      .click('div[class=nav_arrow_right]')
      .pause(10000)
      .end()
  }




};
