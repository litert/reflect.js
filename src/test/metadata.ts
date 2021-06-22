import $Reflect from '../lib';
import * as $Kits from './kits';

describe('set-metadata-methods', function() {

    class Test1 {

        public p1: number = 1;
        public p2: number = 1;

        public static sp1: number = 123;
        public static sp2: number = 123;

        public constructor(cp1: number, cp2: number) { console.log(cp1 + cp2); }

        public get g1(): number { return 213; }

        public set s1(v: number) { console.log(v); }

        public m1(v: number, w: number): number { return v + w; }
        public m2(v: number, w: number): number { return v + w; }

        public static sm1(v: number, w: number): number { return v + w; }
        public static sm2(v: number, w: number): number { return v + w; }

        public static get sg1(): number { return 213; }

        public static set ss1(v: number) { console.log(v); }
    }

    class Test2 {
    }

    const metaKeys: string[] = [
        'class', 'ctor-param', 'method', 'method-param',
        'static-method', 'static-method-param', 'property', 'static-property',
        'accessor', 'static-accessor'
    ];

    function getKeys(excludes: string[]): string[] {

        return metaKeys.filter((v) => !excludes.includes(v));
    }

    $Reflect.setClassMetadata(Test1, 'class', 'class-1');
    $Reflect.setClassMetadata(Test2, 'class', 'class-2');
    $Reflect.setConstructorParameterMetadata(Test1, 0, 'ctor-param', 'ctor-param-0');
    $Reflect.setConstructorParameterMetadata(Test1, 1, 'ctor-param', 'ctor-param-1');
    $Reflect.setMethodMetadata(Test1, 'm1', 'method', 'method-0');
    $Reflect.setMethodMetadata(Test1, 'm2', 'method', 'method-1');
    $Reflect.setMethodParameterMetadata(Test1, 'm1', 0, 'method-param', 'method-param-0');
    $Reflect.setMethodParameterMetadata(Test1, 'm1', 1, 'method-param', 'method-param-1');
    $Reflect.setStaticMethodMetadata(Test1, 'sm1', 'static-method', 'static-method-0');
    $Reflect.setStaticMethodMetadata(Test1, 'sm2', 'static-method', 'static-method-1');
    $Reflect.setStaticMethodParameterMetadata(Test1, 'sm1', 0, 'static-method-param', 'static-method-param-0');
    $Reflect.setStaticMethodParameterMetadata(Test1, 'sm1', 1, 'static-method-param', 'static-method-param-1');
    $Reflect.setPropertyMetadata(Test1, 'p1', 'property', 'property-0');
    $Reflect.setPropertyMetadata(Test1, 'p2', 'property', 'property-1');
    $Reflect.setStaticPropertyMetadata(Test1, 'sp1', 'static-property', 'static-property-0');
    $Reflect.setStaticPropertyMetadata(Test1, 'sp2', 'static-property', 'static-property-1');
    $Reflect.setAccessorMetadata(Test1, 'g1', 'accessor', 'accessor-g');
    $Reflect.setAccessorMetadata(Test1, 's1', 'accessor', 'accessor-s');
    $Reflect.setStaticAccessorMetadata(Test1, 'sg1', 'static-accessor', 'static-accessor-sg');
    $Reflect.setStaticAccessorMetadata(Test1, 'ss1', 'static-accessor', 'static-accessor-ss');

    describe('for class', function() {

        $Kits.testSetOnClass(Test1, 'class', 'class-1');
        $Kits.testSetOnClass(Test2, 'class', 'class-2');

        for (const k of getKeys(['class'])) {

            $Kits.testSetOnClass(Test1, k, undefined);
        }
    });

    describe('for ctor-param', function() {

        $Kits.testSetOnCtorParam(Test1, 0, 'ctor-param', 'ctor-param-0');
        $Kits.testSetOnCtorParam(Test1, 1, 'ctor-param', 'ctor-param-1');

        for (const k of getKeys(['ctor-param'])) {

            $Kits.testSetOnCtorParam(Test1, 0, k, undefined);
        }
    });

    describe('for method', function() {

        $Kits.testSetOnMethod(Test1, 'm1', 'method', 'method-0');
        $Kits.testSetOnMethod(Test1, 'm2', 'method', 'method-1');

        for (const k of getKeys(['method'])) {

            $Kits.testSetOnMethod(Test1, 'm1', k, undefined);
        }
    });

    describe('for property', function() {

        $Kits.testSetOnProperty(Test1, 'p1', 'property', 'property-0');
        $Kits.testSetOnProperty(Test1, 'p2', 'property', 'property-1');

        for (const k of getKeys(['property'])) {

            $Kits.testSetOnProperty(Test1, 'p1', k, undefined);
        }
    });

    describe('for accessor', function() {

        $Kits.testSetOnAccessor(Test1, 'g1', 'accessor', 'accessor-g');
        $Kits.testSetOnAccessor(Test1, 's1', 'accessor', 'accessor-s');

        for (const k of getKeys(['accessor'])) {

            $Kits.testSetOnAccessor(Test1, 'g1', k, undefined);
        }
    });

    describe('for static method', function() {

        $Kits.testSetOnStaticMethod(Test1, 'sm1', 'static-method', 'static-method-0');
        $Kits.testSetOnStaticMethod(Test1, 'sm2', 'static-method', 'static-method-1');

        for (const k of getKeys(['static-method'])) {

            $Kits.testSetOnStaticMethod(Test1, 'sm1', k, undefined);
        }
    });

    describe('for static property', function() {

        $Kits.testSetOnStaticProperty(Test1, 'sp1', 'static-property', 'static-property-0');
        $Kits.testSetOnStaticProperty(Test1, 'sp2', 'static-property', 'static-property-1');

        for (const k of getKeys(['static-property'])) {

            $Kits.testSetOnStaticProperty(Test1, 'sp1', k, undefined);
        }
    });

    describe('for static accessor', function() {

        $Kits.testSetOnStaticAccessor(Test1, 'sg1', 'static-accessor', 'static-accessor-sg');
        $Kits.testSetOnStaticAccessor(Test1, 'ss1', 'static-accessor', 'static-accessor-ss');

        for (const k of getKeys(['static-accessor'])) {

            $Kits.testSetOnStaticAccessor(Test1, 'sg1', k, undefined);
        }
    });

    describe('for method parameter', function() {

        $Kits.testSetOnMethodParam(Test1, 'm1', 0, 'method-param', 'method-param-0');
        $Kits.testSetOnMethodParam(Test1, 'm1', 1, 'method-param', 'method-param-1');

        for (const k of getKeys(['method-param'])) {

            $Kits.testSetOnMethodParam(Test1, 'm1', 0, k, undefined);
        }
    });

    describe('for static method', function() {

        $Kits.testSetOnStaticMethodParam(Test1, 'sm1', 0, 'static-method-param', 'static-method-param-0');
        $Kits.testSetOnStaticMethodParam(Test1, 'sm1', 1, 'static-method-param', 'static-method-param-1');

        for (const k of getKeys(['static-method-param'])) {

            $Kits.testSetOnStaticMethodParam(Test1, 'sm1', 0, k, undefined);
        }
    });
});
