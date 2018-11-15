import client from './elastic-search-connection';

client.cluster.health({}, (error, res, status) => {
    console.log('-- Client Health --', res);
    console.log('status', status);
    console.log('error', error);
});

// client.ping({
//     requestTimeout: 30000,
// }, function (error) {
//     if (error) {
//         console.error('elasticsearch cluster is down!');
//     } else {
//         console.log('All is well');
//     }
// });

// client.indices.create({
//     index: 'product'
// }, function (err, resp, status) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('create', resp, status);
//     }
// });

// client.index({
//     index: 'product',
//     id: '1',
//     type: 'fur',
//     body: {
//         name: 'sheet'
//     }
// }, function (err, resp, status) {
//     console.log(err, resp, status);
// });