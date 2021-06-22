/**
 * Copyright 2021 Angus.Fenying <fenying@litert.org>
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

import $Reflect from '../lib';

@$Reflect.createClassMetadataDecorator('mark', 'a')
class DemoClass {

    @$Reflect.createPropertyMetadataDecorator('mark', 'b')
    public value: number;

    @$Reflect.createStaticPropertyMetadataDecorator('mark', 'c')
    public static key: string;

    public constructor(
        @$Reflect.createConstructorParameterMetadataDecorator('mark', 'd')
        v: number
    ) {

        this.value = v;
    }

    @$Reflect.createAccessorMetadataDecorator('mark', 'e')
    public get fakeValue(): number {

        return this.value + 123;
    }

    @$Reflect.createStaticAccessorMetadataDecorator('mark', 'j')
    public static get fakeKey(): string {

        return this.key + '123';
    }

    @$Reflect.createMethodMetadataDecorator('mark', 'f')
    public getValue(): number {

        return this.value;
    }

    public setValue(
        @$Reflect.createMethodParameterMetadataDecorator('mark', 'g')
        v: number
    ): void {

        this.value = v;
    }

    @$Reflect.createStaticMethodMetadataDecorator('mark', 'h')
    public static getKey(): string {

        return this.key;
    }

    public static setKey(
        @$Reflect.createStaticMethodParameterMetadataDecorator('mark', 'i')
        k: string
    ): void {

        this.key = k;
    }
}
console.log('All metadata of key "mark" in every position of class "DemoClass":')

console.log('Class:                 ',       $Reflect.getClassMetadata(DemoClass, 'mark'));
console.log('Ctor-Param:            ',       $Reflect.getConstructorParameterMetadata(DemoClass, 0, 'mark'));
console.log('Property:              ',       $Reflect.getPropertyMetadata(DemoClass, 'value', 'mark'));
console.log('Static-Property:       ',       $Reflect.getStaticPropertyMetadata(DemoClass, 'key', 'mark'));
console.log('Method:                ',       $Reflect.getMethodMetadata(DemoClass, 'getValue', 'mark'));
console.log('Method-Param:          ',       $Reflect.getMethodParameterMetadata(DemoClass, 'setValue', 0, 'mark'));
console.log('Static-Method:         ',       $Reflect.getStaticMethodMetadata(DemoClass, 'getKey', 'mark'));
console.log('Static-Method-Param:   ',       $Reflect.getStaticMethodParameterMetadata(DemoClass, 'setKey', 0, 'mark'));
console.log('Accessor:              ',       $Reflect.getAccessorMetadata(DemoClass, 'fakeValue', 'mark'));
console.log('Static-Accessor:       ',       $Reflect.getStaticAccessorMetadata(DemoClass, 'fakeKey', 'mark'));
