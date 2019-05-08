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

@Reflect.metadata("http:root", "/users")
class UserController {

    @Reflect.metadata("http:method", "GET")
    @Reflect.metadata("http:path", "/{id:uint}/profile")
    public getUserProfile() {

        return;
    }

    @Reflect.metadata("http:method", "POST")
    @Reflect.metadata("http:path", "/")
    public createUser() {

        return;
    }

    @Reflect.metadata("http:method", "DELETE")
    @Reflect.metadata("http:path", "/{id:uint}")
    public abandonUser() {

        return;
    }
}

console.log(Reflect.getMetadata(UserController, "http:root"));

for (let mName of Reflect.getOwnMethodNames(UserController)) {

    const hMethod = Reflect.getMetadataOfMethod(
        UserController,
        mName,
        "http:method"
    );

    const hPath = Reflect.getMetadataOfMethod(
        UserController,
        mName,
        "http:path"
    );

    console.log(`${hMethod.padEnd(8, " ")} ${hPath.padEnd(32, " ")} -> ${mName as string}`);
}
