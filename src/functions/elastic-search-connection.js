import elasticsearch from 'elasticsearch';

var client = new elasticsearch.Client({
  host: 'http://uprj10509:CtLFbk8v2@40.71.47.14:9200',
  requestTimeout: Infinity, // Tested
  keepAlive: true
});

module.exports = client;