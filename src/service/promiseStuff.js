export const testPromise = () => {
    // promise();
    // promiseAll();
    promiseAllSettled();
    // promiseRace();
    // promiseAny();
};

const createPromise = (name, isSuccess, time) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(`${name} - Success`);
            } else {
                reject(`${name} - Reject`);
            }
        }, time);
    });
    return promise;
};

const promise = async () => {
    try {
        const result = await createPromise("result", false, 1000);
        console.log(result);
    } catch (err) {
        console.log(err);
    } finally {
        console.log("Finally");
    }
};

// Promise.all - All promises must succeed, otherwise it fails.
const promiseAll = async () => {
    const first = createPromise("first", true, 1000);
    const second = createPromise("second", true, 2000);
    const third = createPromise("third", true, 3000);

    try {
        const result = await Promise.all([first, second, third]);
        result.forEach((x) => console.log(x));
    } catch (err) {
        console.log(err);
    }
};

// Promise.allSettled - get all promise status without failing
const promiseAllSettled = async () => {
    const first = createPromise("first", false, 1000);
    const second = createPromise("second", false, 2000);
    const third = createPromise("third", false, 3000);

    const result = await Promise.allSettled([first, second, third]);
    result.forEach((x) => console.log(x));
};

// Promise.race - Runs the fastest promise, reject if fastest promise fail
const promiseRace = async () => {
    const first = createPromise("first", false, 1000);
    const second = createPromise("second", true, 2000);

    try {
        const result = await Promise.race([first, second]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

// Promise.any - Runs the first successful promise, reject if all promise fail
const promiseAny = async () => {
    const first = createPromise("first", false, 1000);
    const second = createPromise("second", true, 2000);

    try {
        const result = await Promise.any([first, second]);
        console.log(result);
    } catch (err) {
        console.log(err); // AggregateError: All promises were rejected
    }
};
