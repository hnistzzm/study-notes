
const worker = new Worker('./worker');
worker.addEventListener('message', function(e){
    console.log('MAIN: ', 'RECEIVE', e.data);
})
worker.postMessage('Hello Worker, I am main.js');