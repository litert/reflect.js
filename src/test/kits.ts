import $Reflect, * as $Reflects from '../lib';
import * as $Decorators from '@litert/decorator';
import * as $Assert from 'assert';

export function generateClassGetTest(
    ctor: $Decorators.IClassCtor,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    it(`class: should get ${expectedValue}`, function() {

        $Assert.strictEqual(
            $Reflect.getClassMetadata(ctor, key),
            expectedValue
        );
    });
}

export function generateCtorParamGetTest(
    ctor: $Decorators.IClassCtor,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    it(`ctor-param: should get ${expectedValue}`, function() {

        $Assert.strictEqual(
            $Reflect.getConstructorParameterMetadata(ctor, 0, key),
            expectedValue
        );
    });
}
