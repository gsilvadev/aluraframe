class ProxyFactory {

    static create(obj, props, action){
        return new Proxy(obj, {
            get(target, prop, receiver){
                 if(props.includes(prop) && typeof(target[prop]) == typeof(Function)){
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
}