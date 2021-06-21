import $Reflect from '../lib';
import * as $Assert from 'assert';

describe('design types', function() {

    describe('property', function() {

        it('Should get `null` as type if a property never decorated', function() {

            class Test {

                public a: string = '123';
            }

            $Assert.strictEqual($Reflect.getPropertyType(Test, 'a'), null);
        });

        it('Should get `String` as type for a string-type property', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public a: string = '123';
            }

            $Assert.strictEqual($Reflect.getPropertyType(Test, 'a'), String);
        });

        it('Should get `String` as type for a string-type optional property', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public a?: string = '123';
            }

            $Assert.strictEqual($Reflect.getPropertyType(Test, 'a'), String);
        });

        it('Should get `Object` as type for a mix-type property', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public a: string | number = '123';
            }

            $Assert.strictEqual($Reflect.getPropertyType(Test, 'a'), Object);
        });
    });

    describe('static property', function() {

        it('Should get `null` as type if a property never decorated', function() {

            class Test {

                public static a: string = '123';
            }

            $Assert.strictEqual($Reflect.getStaticPropertyType(Test, 'a'), null);
        });

        it('Should get `String` as type for a string-type property', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static a: string = '123';
            }

            $Assert.strictEqual($Reflect.getStaticPropertyType(Test, 'a'), String);
        });

        it('Should get `String` as type for a string-type optional property', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static a?: string = '123';
            }

            $Assert.strictEqual($Reflect.getStaticPropertyType(Test, 'a'), String);
        });

        it('Should get `Object` as type for a mix-type property', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static a: string | number = '123';
            }

            $Assert.strictEqual($Reflect.getStaticPropertyType(Test, 'a'), Object);
        });
    });

    describe('method', function() {

        it('Should get `null` as return type if never decorated', function() {

            class Test {

                public a(): string { return ''; }
            }

            $Assert.strictEqual($Reflect.getMethodReturnType(Test, 'a'), null);
        });

        it('Should get `undefined` as return type for a void-type method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public a(): void { return; }
            }

            $Assert.strictEqual($Reflect.getMethodReturnType(Test, 'a'), undefined);
        });

        it('Should get `String` as return type for a string-type method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public a(): string { return ''; }
            }

            $Assert.strictEqual($Reflect.getMethodReturnType(Test, 'a'), String);
        });

        it('Should get `null` as parameter types if never decorated', function() {

            class Test {

                public a(): string { return ''; }
            }

            $Assert.strictEqual($Reflect.getMethodParameterTypes(Test, 'a'), null);
        });

        it('Should get empty list of parameter types for a non-parameter method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public a(): string { return ''; }
            }

            $Assert.strictEqual(Array.isArray($Reflect.getMethodParameterTypes(Test, 'a')), true);
            $Assert.strictEqual($Reflect.getMethodParameterTypes(Test, 'a')!.length, 0);
        });

        it('Should get the correct class of parameter types for a non-parameter method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public a(a: string, b: number, c: Record<string, any>): string {

                    return `${c[a]}_${b}`;
                }
            }

            $Assert.strictEqual(Array.isArray($Reflect.getMethodParameterTypes(Test, 'a')), true);
            $Assert.strictEqual($Reflect.getMethodParameterTypes(Test, 'a')!.length, Test.prototype.a.length);
            $Assert.strictEqual($Reflect.getMethodParameterTypes(Test, 'a')![0], String);
            $Assert.strictEqual($Reflect.getMethodParameterTypes(Test, 'a')![1], Number);
            $Assert.strictEqual($Reflect.getMethodParameterTypes(Test, 'a')![2], Object);
        });
    });

    describe('static method', function() {

        it('Should get `null` as return type if never decorated', function() {

            class Test {

                public static a(): string { return ''; }
            }

            $Assert.strictEqual($Reflect.getStaticMethodReturnType(Test, 'a'), null);
        });

        it('Should get `undefined` as return type for a void-type method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static a(): void { return; }
            }

            $Assert.strictEqual($Reflect.getStaticMethodReturnType(Test, 'a'), undefined);
        });

        it('Should get `String` as return type for a string-type method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static a(): string { return ''; }
            }

            $Assert.strictEqual($Reflect.getStaticMethodReturnType(Test, 'a'), String);
        });

        it('Should get `null` as parameter types if never decorated', function() {

            class Test {

                public static a(): string { return ''; }
            }

            $Assert.strictEqual($Reflect.getStaticMethodParameterTypes(Test, 'a'), null);
        });

        it('Should get empty list of parameter types for a non-parameter method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static a(): string { return ''; }
            }

            $Assert.strictEqual(Array.isArray($Reflect.getStaticMethodParameterTypes(Test, 'a')), true);
            $Assert.strictEqual($Reflect.getStaticMethodParameterTypes(Test, 'a')!.length, 0);
        });

        it('Should get the correct class of parameter types for a non-parameter method', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static a(a: string, b: number, c: Record<string, any>): string {

                    return `${c[a]}_${b}`;
                }
            }

            $Assert.strictEqual(Array.isArray($Reflect.getStaticMethodParameterTypes(Test, 'a')), true);
            $Assert.strictEqual($Reflect.getStaticMethodParameterTypes(Test, 'a')!.length, Test.a.length);
            $Assert.strictEqual($Reflect.getStaticMethodParameterTypes(Test, 'a')![0], String);
            $Assert.strictEqual($Reflect.getStaticMethodParameterTypes(Test, 'a')![1], Number);
            $Assert.strictEqual($Reflect.getStaticMethodParameterTypes(Test, 'a')![2], Object);
        });
    });

    describe('accessor', function() {

        it('Should get `null` as type if an accessor never decorated', function() {

            class Test {

                public get a(): string { return '123'; }
            }

            $Assert.strictEqual($Reflect.getAccessorType(Test, 'a'), null);
        });

        it('Should get `String` as type for a string-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public get a(): string { return '123'; }
            }

            $Assert.strictEqual($Reflect.getAccessorType(Test, 'a'), String);
        });

        it('Should get `Object` as type for a mix-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public get a(): string | number { return '123'; }
            }

            $Assert.strictEqual($Reflect.getAccessorType(Test, 'a'), Object);
        });

        it('Should get `Number` as parameter type for a number-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public set a(v: number) { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getAccessorParameterType(Test, 'a'), Number);
        });

        it('Should get `Object` as parameter type for a mixed-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public set a(v: number | string) { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getAccessorParameterType(Test, 'a'), Object);
        });
    });

    describe('static accessor', function() {

        it('Should get `null` as type if an accessor never decorated', function() {

            class Test {

                public static get a(): string { return '123'; }
            }

            $Assert.strictEqual($Reflect.getStaticAccessorType(Test, 'a'), null);
        });

        it('Should get `String` as type for a string-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static get a(): string { return '123'; }
            }

            $Assert.strictEqual($Reflect.getStaticAccessorType(Test, 'a'), String);
        });

        it('Should get `Object` as type for a mix-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static get a(): string | number { return '123'; }
            }

            $Assert.strictEqual($Reflect.getStaticAccessorType(Test, 'a'), Object);
        });

        it('Should get `Number` as parameter type for a number-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static set a(v: number) { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getStaticAccessorParameterType(Test, 'a'), Number);
        });

        it('Should get `Object` as parameter type for a mixed-type accessor', function() {

            class Test {

                @$Reflect.metadata('test', 123)
                public static set a(v: number | string) { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getStaticAccessorParameterType(Test, 'a'), Object);
        });
    });
});
