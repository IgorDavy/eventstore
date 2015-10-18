var cron = require('cron');
var scraper = require('../scraper');

scraper.process();

var cronJob = cron.job('00 00 * * *', function(){
    scraper.process();
});

cronJob.start();
