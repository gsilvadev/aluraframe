class ProxyFactory {

    static create(obj, props, action) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    let func = Reflect.set(target, prop, value, receiver);
                    action(target);
                    return func;
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _isFunction(func) {
        return typeof (func) == typeof (Function);
    }
}