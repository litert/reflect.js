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

class Test {

    private _a: number;

    public constructor(

        @Reflect.metadata("value", 123)
        a: number
    ) {

        this._a = a;
    }

    public print(): void {

        console.log(this._a);
    }
}

let t = new Test(Reflect.getMetadataOfConstructorParameter(Test, 0, "value"));

t.print();

Reflect.setMetadataOfConstructorParameter(
    Test,
    0,
    "value",
    2333
);

t = new Test(Reflect.getMetadataOfConstructorParameter(Test, 0, "value"));

t.print();

console.log(Reflect.getParent(Test));
