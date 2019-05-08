/**
 * Copyright 2019 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// tslint:disable: no-console
// tslint:disable: no-unused-expression
import Reflect from "../lib";

export type IHookAfter = (info: {
    "args": any[];
    "returnValue": any;
    "error": any;
}) => any;

export interface IHook {

    origin(...args: any[]): any;

    before: Array<(...args: any[]) => any>;

    after: IHookAfter[];
}

function _initHook(
    target: Object,
    key: string | symbol,
    descr: TypedPropertyDescriptor<any>
): IHook {

    let h: IHook = Reflect.getMetadataOfMethod(target, key, "hook");

    if (!h) {

        h = {
            origin: descr.value as any,
            after: [],
            before: []
        };

        Reflect.setMetadataOfMethod(target, key, "hook", h);

        descr.value = function(this: any, ...args: any[]) {

            for (let b of h.before) {

                b.call(this, ...args);
            }

            let ret: any;
            let err: any;

            try {

                ret = h.origin.call(this, ...args);
            }
            catch (e) {

                err = e;
            }

            if (h.after.length) {

                const info = {
                    args,
                    "returnValue": ret,
                    "error": err
                };

                for (let a of h.after) {

                    a.call(this, info);
                }

                if (info.error) {

                    throw info.error;
                }

                return info.returnValue;
            }

            if (err) {

                throw err;
            }

            return ret;

        } as any;
    }

    return h;
}

function Before(callback: string | ((...args: any[]) => any)): MethodDecorator {

    return function(target, key, descr) {

        _initHook(target, key, descr).before.unshift(
            typeof callback === "string" ?
                target.constructor.prototype[callback] :
                callback
        );
    };
}

function After(callback: string | IHookAfter): MethodDecorator {

    return function(target, key, descr) {

        _initHook(target, key, descr).after.unshift(
            typeof callback === "string" ?
                target.constructor.prototype[callback] :
                callback
        );
    };
}

const __DEBUG__ = true;

function DebugBefore(callback: string | IHookAfter): MethodDecorator {

    return function(target, key, descr) {

        __DEBUG__ && _initHook(target, key, descr).before.unshift(
            typeof callback === "string" ?
                target.constructor.prototype[callback] :
                callback
        );
    };
}

class Test {

    public test: string = "hello";

    @DebugBefore(function() {

        console.debug("This is a debug line (set __DEBUG__ to false to hide this line)");
    })
    @Before("beforeSayHello")
    @Before(function() {

        console.log("a");
    })
    @Before(function() {

        console.log("b");
    })
    @After(function() {

        console.log("c");
    })
    @After(function(info) {

        console.log("d");
    })
    public sayHello() {

        console.log(this.test);
    }

    public beforeSayHello() {

        console.log(`before say ${this.test}`);
    }
}

const t = new Test();

t.sayHello();
