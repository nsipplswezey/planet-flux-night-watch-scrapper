var fs = require('fs');

exports.command = function(url, callback){
  var client = this;
  var data = [];
  var tmp = {};

  client.click('span[id=credits_link]');
  for (var i = 0; i < 307; i++){
      tmp = {};
      //get caption
      client
        .waitForElementPresent('h1[id="description_h1"]',20000,false)
        .getText('h1[id="description_h1"]', function(result){
	  tmp.title = result.value;
	})
	.waitForElementPresent('p[id=description_paragraph',20000,false)
        .getText('p[id=description_paragraph]', function(result){
	  tmp.description = result.value;
        })
	//get lat lon coords and google map link
	.waitForElementPresent('div.gm-style > div:nth-child(2) > a',20000,false)
	.getAttribute('div.gm-style > div:nth-child(2) > a','href',function(result){
	  tmp.googleLatLon = result.value;
	})
	//get static map image

	.waitForElementPresent('div.gm-style > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div > img',20000,false)
	.getAttribute('div.gm-style > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div > img',
		      'src', function(result){
			      tmp.miniMap = result.value;
			      })
        //get credit

	.waitForElementPresent('div[id=credits]',20000,false)
	.getText('div[id=credits]',function(result){
	  console.log(result.value); 
	  tmp.credit = result.value;
	})
	//get dates
	
	.waitForElementPresent('div[id=date1]',20000,false)
	.getText('div[id=date1]',function(result){
	  tmp.dates = [];
	  tmp.dates.push(result.value);
	})
	.getText('div[id=date2]',function(result){
	  tmp.dates.push(result.value);
	})
	.getText('div[id=date3]',function(result){
	  tmp.dates.push(result.value);
	})
	.getText('div[id=date4]',function(result){
	  tmp.dates.push(result.value);
	})
	.pause(1000)
        //get image url
        .click('a[id=download_link]')
        .window_handles(function(result){
	  var handle = result.value[1];
	  client.switchWindow(handle);
        })
	.waitForElementPresent('img',20000,false)
        .getAttribute('img','src',function(result){
	  tmp.source = result.value;
	  data.push(tmp);
	  tmp = {};
	  //when the data length is equal to i, we stringify and write to fs
	  console.log(data.length);
	  if(data.length === i){
	    fs.writeFile('data.txt',JSON.stringify(data), function(err){
	      if (err) throw err;
	      console.log('saved');
	    })
	  }
	})
	.closeWindow()
	.window_handles(function(result){
	  var handle = result.value[0];
	  client.switchWindow(handle)
	})
	.pause(1000)
	//go to next, and repeat
	.click('div[class=nav_arrow_right]');
  }
  return client;
}
