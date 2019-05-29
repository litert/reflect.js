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
import Reflect from "../lib";

function Mark(mark: string) {

    return function(a: any, b?: any, c?: any): any {

        if (Reflect.isForClass([a, b, c])) {
            console.log(`Marked "${mark}" for class.`);
        }

        if (Reflect.isForConstructorParameter([a, b, c])) {
            console.log(`Marked "${mark}" for class constructor parameter.`);
        }

        if (Reflect.isForMethod([a, b, c])) {
            console.log(`Marked "${mark}" for class method.`);
        }

        if (Reflect.isForMethodParameter([a, b, c])) {
            console.log(`Marked "${mark}" for class method parameter.`);
        }

        if (Reflect.isForProperty([a, b, c])) {
            console.log(`Marked "${mark}" for class property.`);
        }
    };
}

@Mark("a")
export class TestClass {

    @Mark("b")
    private _name: string;

    public constructor(
        @Mark("c")
        name: string
    ) {

        this._name = name;
    }

    @Mark("d")
    public print(@Mark("e") prefix: string): void {

        console.log(`Hello, ${prefix} ${this._name}`);
    }
}

new TestClass("Sarah").print("Miss.");
