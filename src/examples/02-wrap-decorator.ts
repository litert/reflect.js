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

const MK_ROOT = "http:root";
const MK_PATH = "http:path";
const MK_METHOD = "http:method";

function Method(method: string): MethodDecorator {

    return Reflect.metadata(MK_METHOD, method);
}

function Path(path: string): MethodDecorator {

    return Reflect.metadata(MK_PATH, path);
}

function Root(root: string): ClassDecorator {

    return Reflect.metadata(MK_ROOT, root);
}

@Root("/users")
class UserController {

    @Method("GET")
    @Path("/{id:uint}/profile")
    public getUserProfile() {

        return;
    }

    @Method("POST")
    @Path("/")
    public createUser() {

        return;
    }

    @Method("DELETE")
    @Path("/{id:uint}")
    public abandonUser() {

        return;
    }
}

console.log(Reflect.getMetadata(UserController, MK_ROOT));

for (let mName of Reflect.getOwnMethodNames(UserController)) {

    const hMethod = Reflect.getMetadataOfMethod(
        UserController,
        mName,
        MK_METHOD
    );

    const hPath = Reflect.getMetadataOfMethod(
        UserController,
        mName,
        MK_PATH
    );

    console.log(`${hMethod.padEnd(8, " ")} ${hPath.padEnd(32, " ")} -> ${mName as string}`);
}
