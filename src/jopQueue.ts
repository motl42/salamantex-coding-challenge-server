

class JobQueue {
    private lastPromise: Promise<void> = Promise.resolve();

    addJob(job: (...args: any[]) => Promise<any>) {

        this.lastPromise = this.lastPromise.then(job);

    }
}

export default new JobQueue();