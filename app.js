/*
* @Author: RayLin
* @Date:   2017-07-08 17:12:33
* @Last Modified by:   RayLin
* @Last Modified time: 2017-08-15 11:22:13
*/

'use strict';
let exec = require('child_process').exec;

let runWatch = function() {
    let ls = exec('npm run test-nightwatch',
      function (error) {
        if (error !== null) {
          console.log('exec error: ' + error);
          return;
        }
    });

    ls.stdout.on('data', function (data) {
        let isError = data.toString().includes('ERROR');
        if (isError) ls.kill();

        console.log('stdout1: ' + data.toString());
    });

    ls.stderr.on('data', function (data) {
        ls.kill();
        console.log('stderr1: ' + data.toString());
    });

    ls.on('close', (code) => {
        console.log(`child1 process exited with code ${code}`);
    });
};

let runWatchChromeLess = function() {
    let ls = exec('npm run test-hightwatch-chromeless',
      function (error) {
        if (error !== null) {
          console.log('exec error: ' + error);
          return;
        }
    });

    ls.stdout.on('data', function (data) {
        let isError = data.toString().includes('ERROR');
        if (isError) ls.kill();

        console.log('stdout2: ' + data.toString());
    });

    ls.stderr.on('data', function (data) {
        ls.kill();
        console.log('stderr2: ' + data.toString());
    });

    ls.on('close', (code) => {
        console.log(`child2 process exited with code ${code}`);
        setTimeout(function(){
            runWatch2();
        },2000);
    });
};

// let runWatchFirefox = function() {
//     let ls = exec('npm run test-hightwatch-firefoxless',
//       function (error) {
//         if (error !== null) {
//           console.log('exec error: ' + error);
//           return;
//         }
//     });

//     ls.stdout.on('data', function (data) {
//         let isError = data.toString().includes('ERROR');
//         if (isError) ls.kill();

//         console.log('stdout3: ' + data.toString());
//     });

//     ls.stderr.on('data', function (data) {
//         ls.kill();
//         console.log('stderr3: ' + data.toString());
//     });

//     ls.on('close', (code) => {
//         console.log(`child3 process exited with code ${code}`);
//         setTimeout(function(){
//             runWatchFirefox();
//         },3000);
//     });
// };

runWatchChromeLess();

setTimeout(function() {
    runWatchChromeLess();
}, 3000);
