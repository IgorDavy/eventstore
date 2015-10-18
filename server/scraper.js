var cheerio = require('cheerio')
, request = require('request')
, path = require('path')
, app = require(path.resolve(__dirname, 'server'))
, url = 'http://lanyrd.com/topics/javascript/'
, async = require('async')
, winston = require('winston');

winston.level = 'debug';

function getEventAttrs($, eventHtml){
    var title = $(eventHtml).children('h4');
    var locations = $(eventHtml).children('p.location').children('a');

    var link = $(title).children('a').attr('href');
    var name = $(title).text();
    var city = locations.last().text();
    var country = locations.next().first().text();

    var tags = $(eventHtml).children('ul.tags').children('li');
    var tagsArray = [];

    tags.each(function(i, tag){
        tagsArray.push($(tag).text());
    });

    var date = $(eventHtml).children('p.date').children('abbr.dtstart').attr('title');
    var dateEnd = $(eventHtml).children('p.date').children('abbr.dtend').attr('title');

    return {'name':name, 'country':country, 'city':city, 'link':link,
            'date':date, 'dateEnd':dateEnd, 'tags': tagsArray};
}


function createEvents($) {
    $('.conference.vevent').each(function(i, eventHtml) {
        var eventAttrs = getEventAttrs($, eventHtml);
        app.models.Event.upsert(eventAttrs, function(err){
            if(err){
                // Handle Duplicate name_date_index
                if (err.code == 11000)
                    winston.debug(new Date() +" Index "+ eventAttrs.name + ", "  + eventAttrs.date + " already present");
                else {
                    winston.error(err);
                }
            }
            else {
                winston.info(new Date() +" Inserted event "+ eventAttrs.name + ", "  + eventAttrs.date);
            }
        })
    })
}

function handlePages(nbPages, firstPage){
    for (var i = 1; i <= nbPages; i++) {
        request(url + '?page=' + i, function(err, res, html){
            if (err) return winston.error(err);

            if (i == 1){
                //first page is already load
                createEvents(firstPage);
            }
            else {
                createEvents(cheerio.load(html));
            }
        });
    }
}

module.exports = {
    process: function(){
        request(url, function(err, res, html){
            if (err) return winston.error(err)

            var $ = cheerio.load(html);
            var nbPages = $(".pagination").find("li").last().text();

            if (nbPages)
                handlePages(nbPages, $);
            else
                handlePages(1, $);
        });
    }
};