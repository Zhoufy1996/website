export const myCallString = `Function.prototype.myCall = function(context, ...rest) {
    if (typeof this !== "function") {
        throw new Error("not a funciton")
    }

    const myContext = context || window;

    myContext.fn = this;

    const result = myContext.fn(...rest);

    delete myContext.fn;

    return result;
}
`;

export const myApplyString = `Function.prototype.myApply = function(context, argsArr) {
    if (typeof this !== "function") {
        throw new Error("not a funciton")
    }

    const myContext = context || window;

    myContext.fn = this;

    const result = myContext.fn(...argsArr);

    delete myContext.fn;

    return result;
}
`;

export const myBindString = `Function.prototype.myBind = function(context, ...bindArgs) {
    if (typeof this !== "function") {
        throw new Error("not a funciton")
    }

    const fn = this;

    return function(...args) {

        const myContext = context || this;

        myContext.fn = fn;

        return myContext.fn(...bindArgs, ...args)
    }
}
`;

export const myNew = (context: any, ...args: any[]) => {
  const obj = Object.create(null);
  // eslint-disable-next-line no-proto
  obj.__proto__ = context.prototype;

  const result = context.apply(context, ...args);

  return typeof result === 'object' ? result : obj;
};

export default {};
