/*
    This is not a standard unit test. Just run the file with ts-node and look at at the console output if the jobs are executed sequentially.
*/

import jobQueue from '../../src/jopQueue';

for(let i=0; i<10; i++) {

    jobQueue.addJob(() => {
        return new Promise((resolve)=> {
            console.log('job '+i+' started');
            setTimeout( () => {
                console.log('job '+i+' finished')
                resolve();
            }, 1000)
        });
    })
}

