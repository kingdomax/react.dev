export const testArray = () => {
    map();
    filter();
    find();
    slice();
    reduce();
    includes();
    every();
    sort();

    var moch = new Test("Moch", 99);
    moch.print();
};

const print = (funcName, data, result) => {
    console.log(funcName);
    console.log(`data: ${data}`);
    console.log(`result: ${result}`);
};

const map = () => {
    const data = [1, 2, 3, 4, 5];
    const result = data.map((d) => d * 2);
    print(".map()", data, result);
};

const filter = () => {
    const data = [1, 2, 3, 4, 5];
    const result = data.filter((d) => d % 2 == 0);
    print(".filter()", data, result);
};

const find = () => {
    const data = [1, 2, 3, 4, 5];
    const result = data.find((d) => d % 2 == 0); // return first found
    print(".find()", data, result);
};

const slice = () => {
    const data = [1, 2, 3, 4, 5];
    const result = data.slice(0, 1);
    print(".slice()", data, result);
};

const reduce = () => {
    const data = [1, 2, 3, 4, 5];
    const result = data.reduce((acc, data) => acc + data, 0);
    print(".reduce()", data, result);
};

const includes = () => {
    const data = [1, 2, 3, 4, 5];
    const result = data.includes((d) => d == 1);
    print(".includes()", data, result);
};

const every = () => {
    const data = [1, 2, 3, 4, 5];
    const result = data.every((d) => d % 2 == 0);
    print(".every()", data, result);
};

const sort = () => {
    const data = [
        new Date(2025, 0, 1),
        new Date(2025, 0, 2),
        new Date(2025, 0, 3),
    ];
    data.sort((a, b) => b.getDate() - a.getDate()); // mutate
    print(".sort()", data, data);
};

class Test {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    print() {
        console.log(`${this.name} - ${this.age}`);
    }
}
