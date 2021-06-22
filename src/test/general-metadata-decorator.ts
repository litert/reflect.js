import $Reflect from '../lib';
import * as $Kits from './kits';

describe('general-metadata-decorator', function() {

    describe('allowed all position', function() {

        const KEY = 'all-position';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, []);

        $Kits.testClassDecorator(decorator, KEY, VALUE);
        $Kits.testCtorParamDecorator(decorator, KEY, VALUE);
        $Kits.testMethodDecorator(decorator, KEY, VALUE);
        $Kits.testMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testStaticMethodDecorator(decorator, KEY, VALUE);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testPropertyDecorator(decorator, KEY, VALUE);
        $Kits.testStaticPropertyDecorator(decorator, KEY, VALUE);
        $Kits.testAccessorDecorator(decorator, KEY, VALUE);
        $Kits.testStaticAccessorDecorator(decorator, KEY, VALUE);
    });

    describe('only class', function() {

        const KEY = 'only-class';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['class']);

        $Kits.testClassDecorator(decorator, KEY, VALUE);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only method', function() {

        const KEY = 'only-method';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['method']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, VALUE);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only static method', function() {

        const KEY = 'only-static-method';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticMethod']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, VALUE);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only method parameter', function() {

        const KEY = 'only-method-parameter';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['methodParameter']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only static method parameter', function() {

        const KEY = 'only-static-method-parameter';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticMethodParameter']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only property', function() {

        const KEY = 'only-property';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['property']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, VALUE);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only static property', function() {

        const KEY = 'only-static-property';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticProperty']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, VALUE);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only accessor', function() {

        const KEY = 'only-accessor';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['accessor']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, VALUE);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('only static accessor', function() {

        const KEY = 'only-static-accessor';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticAccessor']);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, VALUE);
    });

    describe('both method and accessor', function() {

        const KEY = 'both-method-and-accessor';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, [
            'accessor', 'method'
        ]);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, Error);
        $Kits.testMethodDecorator(decorator, KEY, VALUE);
        $Kits.testMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, Error);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, VALUE);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('all parameters', function() {

        const KEY = 'all-parameters';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, [
            'ctorParameter', 'methodParameter', 'staticMethodParameter'
        ]);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, VALUE);
        $Kits.testMethodDecorator(decorator, KEY, Error);
        $Kits.testMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testStaticMethodDecorator(decorator, KEY, Error);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testPropertyDecorator(decorator, KEY, Error);
        $Kits.testStaticPropertyDecorator(decorator, KEY, Error);
        $Kits.testAccessorDecorator(decorator, KEY, Error);
        $Kits.testStaticAccessorDecorator(decorator, KEY, Error);
    });

    describe('except class', function() {

        const KEY = 'except class';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, [
            'method', 'property', 'accessor',
            'staticMethod', 'staticProperty', 'staticAccessor',
            'ctorParameter', 'methodParameter', 'staticMethodParameter'
        ]);

        $Kits.testClassDecorator(decorator, KEY, Error);
        $Kits.testCtorParamDecorator(decorator, KEY, VALUE);
        $Kits.testMethodDecorator(decorator, KEY, VALUE);
        $Kits.testMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testStaticMethodDecorator(decorator, KEY, VALUE);
        $Kits.testStaticMethodParameterDecorator(decorator, KEY, VALUE);
        $Kits.testPropertyDecorator(decorator, KEY, VALUE);
        $Kits.testStaticPropertyDecorator(decorator, KEY, VALUE);
        $Kits.testAccessorDecorator(decorator, KEY, VALUE);
        $Kits.testStaticAccessorDecorator(decorator, KEY, VALUE);
    });
});
