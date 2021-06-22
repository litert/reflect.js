import $Reflect from '../lib';
import * as $Kits from './kits';

describe('general-metadata-decorator', function() {

    describe('allowed all position', function() {

        const KEY = 'all-position';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, []);

        $Kits.generateClassTest(decorator, KEY, VALUE);
        $Kits.generateCtorParamTest(decorator, KEY, VALUE);
        $Kits.generateMethodTest(decorator, KEY, VALUE);
        $Kits.generateMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generateStaticMethodTest(decorator, KEY, VALUE);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generatePropertyTest(decorator, KEY, VALUE);
        $Kits.generateStaticPropertyTest(decorator, KEY, VALUE);
        $Kits.generateAccessorTest(decorator, KEY, VALUE);
        $Kits.generateStaticAccessorTest(decorator, KEY, VALUE);
    });

    describe('only class', function() {

        const KEY = 'only-class';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['class']);

        $Kits.generateClassTest(decorator, KEY, VALUE);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only method', function() {

        const KEY = 'only-method';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['method']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, VALUE);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only static method', function() {

        const KEY = 'only-static-method';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticMethod']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, VALUE);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only method parameter', function() {

        const KEY = 'only-method-parameter';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['methodParameter']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only static method parameter', function() {

        const KEY = 'only-static-method-parameter';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticMethodParameter']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only property', function() {

        const KEY = 'only-property';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['property']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, VALUE);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only static property', function() {

        const KEY = 'only-static-property';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticProperty']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, VALUE);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only accessor', function() {

        const KEY = 'only-accessor';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['accessor']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, VALUE);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('only static accessor', function() {

        const KEY = 'only-static-accessor';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, ['staticAccessor']);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, VALUE);
    });

    describe('both method and accessor', function() {

        const KEY = 'both-method-and-accessor';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, [
            'accessor', 'method'
        ]);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, Error);
        $Kits.generateMethodTest(decorator, KEY, VALUE);
        $Kits.generateMethodParameterTest(decorator, KEY, Error);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, Error);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, VALUE);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('all parameters', function() {

        const KEY = 'all-parameters';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, [
            'ctorParameter', 'methodParameter', 'staticMethodParameter'
        ]);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, VALUE);
        $Kits.generateMethodTest(decorator, KEY, Error);
        $Kits.generateMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generateStaticMethodTest(decorator, KEY, Error);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generatePropertyTest(decorator, KEY, Error);
        $Kits.generateStaticPropertyTest(decorator, KEY, Error);
        $Kits.generateAccessorTest(decorator, KEY, Error);
        $Kits.generateStaticAccessorTest(decorator, KEY, Error);
    });

    describe('except class', function() {

        const KEY = 'except class';
        const VALUE = 'OK';

        const decorator = $Reflect.createGeneralMetadataDecorator(KEY, VALUE, [
            'method', 'property', 'accessor',
            'staticMethod', 'staticProperty', 'staticAccessor',
            'ctorParameter', 'methodParameter', 'staticMethodParameter'
        ]);

        $Kits.generateClassTest(decorator, KEY, Error);
        $Kits.generateCtorParamTest(decorator, KEY, VALUE);
        $Kits.generateMethodTest(decorator, KEY, VALUE);
        $Kits.generateMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generateStaticMethodTest(decorator, KEY, VALUE);
        $Kits.generateStaticMethodParameterTest(decorator, KEY, VALUE);
        $Kits.generatePropertyTest(decorator, KEY, VALUE);
        $Kits.generateStaticPropertyTest(decorator, KEY, VALUE);
        $Kits.generateAccessorTest(decorator, KEY, VALUE);
        $Kits.generateStaticAccessorTest(decorator, KEY, VALUE);
    });
});
