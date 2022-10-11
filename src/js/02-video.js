
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const player = new Player(document.querySelector('iframe'));
const throttle = require('lodash.throttle');

const STORAGE_KEY = 'videoplayer-current-time';



const throttledOnTimeUpdate = throttle(onPlay, 1000);

player.on('timeupdate', throttledOnTimeUpdate);

function onPlay({ seconds }) {
    localStorage.setItem('STORAGE_KEY', seconds);
    console.log(seconds);
};

const initPage = () => {
    let saveData = localStorage.getItem('STORAGE_KEY');
    console.log(saveData);
    if (saveData) {
        player.setCurrentTime(saveData);
    }
};
initPage();







//     player.getVideoTitle().then(function(title) {
//         console.log('title:', title);
//     });

// const player = new Player('vimeo-player', {
//     id: vimeo-player,
//     width: 640
// });

// const STORAGE_KEY = 'videoplayer-current-time';
// const CurrentTime = localStorage.getItem(STORAGE_KEY);

// const onPlay = function (data) {
//     const timeupdate = data.seconds;
//     console.log(timeupdate);
//     localStorage.setItem(STORAGE_KEY, timeupdate);
// }

// player.on('timeupdate', thortle(onPlay, 1000));

// player
//     .setCurrentTime(CurrentTime)
//     .then(function (seconds) {
//         //seconds = the actual time that the player seeked to
//     })
//     .catch(function (error) {
//         switch (error.name) {
//             case 'RangeError':
//                 // the time was less than 0 or greater than the video's duration
//                 break;
//             default:
//                 //some other error occurred
//                 break;
//         }
//     });
