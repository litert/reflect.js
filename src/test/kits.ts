import $Reflect, * as $Reflects from '../lib';
import * as $Decorators from '@litert/decorator';
import * as $Assert from 'assert';

export function testClassDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`class: should throw error`, function() {

            $Assert.throws(function() {

                @decorator
                class Test {

                }
    
                new Test();
            });
        });
    }
    else {
        it(`class: should get ${expectedValue}`, function() {

            @decorator
            class Test {

            }

            $Assert.strictEqual($Reflect.getClassMetadata(Test, key), expectedValue);
        });
    }
}

export function testCtorParamDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`ctor-param: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    public v: number;

                    public constructor(@decorator v: number) { this.v = v; }
                }
    
                new Test(123);
            });
        });
    }
    else {
        it(`ctor-param: should get ${expectedValue}`, function() {

            class Test {

                public v: number;

                public constructor(@decorator v: number) { this.v = v; }
            }

            $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 0, key), expectedValue);
        });
    }
}

export function testMethodDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`method: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public m(): void {}
                }
    
                new Test();
            });
        });
    }
    else {
        it(`method: should get ${expectedValue}`, function() {

            class Test {

                @decorator
                public m(): void {}
            }

            $Assert.strictEqual($Reflect.getMethodMetadata(Test, 'm', key), expectedValue);
        });
    }
}

export function testMethodParameterDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`method-param: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    public m(@decorator v: number): void { console.log(v); }
                }
    
                new Test();
            });
        });
    }
    else {
        it(`method-param: should get ${expectedValue}`, function() {

            class Test {

                public m(@decorator v: number): void { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getMethodParameterMetadata(Test, 'm', 0, key), expectedValue);
        });
    }
}

export function testStaticMethodDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`static-method: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public static m(): void {}
                }
    
                new Test();
            });
        });
    }
    else {
        it(`static-method: should get ${expectedValue}`, function() {

            class Test {

                @decorator
                public static m(): void {}
            }

            $Assert.strictEqual($Reflect.getStaticMethodMetadata(Test, 'm', key), expectedValue);
        });
    }
}

export function testStaticMethodParameterDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`static-method-param: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    public static m(@decorator v: number): void { console.log(v); }
                }
    
                new Test();
            });
        });
    }
    else {
        it(`static-method-param: should get ${expectedValue}`, function() {

            class Test {

                public static m(@decorator v: number): void { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'm', 0, key), expectedValue);
        });
    }
}

export function testPropertyDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`property: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public m: string = '123';
                }
    
                new Test();
            });
        });
    }
    else {
        it(`property: should get ${expectedValue}`, function() {

            class Test {

                @decorator
                public m: string = '123';
            }

            $Assert.strictEqual($Reflect.getPropertyMetadata(Test, 'm', key), expectedValue);
        });
    }
}

export function testStaticPropertyDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`static-property: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public static m: string = '123';
                }
    
                new Test();
            });
        });
    }
    else {
        it(`static-property: should get ${expectedValue}`, function() {

            class Test {

                @decorator
                public static m: string = '123';
            }

            $Assert.strictEqual($Reflect.getStaticPropertyMetadata(Test, 'm', key), expectedValue);
        });
    }
}

export function testAccessorDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`accessor: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public get m(): string { return '123'; }
                }
    
                new Test();
            });

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public set m(v: string) { console.log(v); }
                }
    
                new Test();
            });
        });
    }
    else {
        it(`accessor: should get ${expectedValue}`, function() {

            class Test {

                @decorator
                public get m1(): string { return '123'; }

                @decorator
                public set m2(v: string) { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getAccessorMetadata(Test, 'm1', key), expectedValue);
            $Assert.strictEqual($Reflect.getAccessorMetadata(Test, 'm2', key), expectedValue);
        });
    }
}

export function testStaticAccessorDecorator(
    decorator: $Decorators.IGeneralDecorator,
    key: $Reflects.IMetadataKey,
    expectedValue: any
): void {

    if (expectedValue === Error) {

        it(`static-accessor: should throw error`, function() {

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public static get m(): string { return '123'; }
                }
    
                new Test();
            });

            $Assert.throws(function() {

                class Test {

                    @decorator
                    public static set m(v: string) { console.log(v); }
                }
    
                new Test();
            });
        });
    }
    else {
        it(`static-accessor: should get ${expectedValue}`, function() {

            class Test {

                @decorator
                public static get m1(): string { return '123'; }

                @decorator
                public static set m2(v: string) { console.log(v); }
            }

            $Assert.strictEqual($Reflect.getStaticAccessorMetadata(Test, 'm1', key), expectedValue);
            $Assert.strictEqual($Reflect.getStaticAccessorMetadata(Test, 'm2', key), expectedValue);
        });
    }
}

export function testSetOnClass(
    ctor: $Decorators.IClassCtor,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::class: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getClassMetadata(ctor, key), value);
    });
}

export function testSetOnCtorParam(
    ctor: $Decorators.IClassCtor,
    index: number,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::ctor-param[${index}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(ctor, index, key), value);
    });
}

export function testSetOnProperty(
    ctor: $Decorators.IClassCtor,
    name: string,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::property[${name}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getPropertyMetadata(ctor, name, key), value);
    });
}

export function testSetOnStaticProperty(
    ctor: $Decorators.IClassCtor,
    name: string,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::static-property[${name}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getStaticPropertyMetadata(ctor, name, key), value);
    });
}

export function testSetOnMethod(
    ctor: $Decorators.IClassCtor,
    name: string,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::method[${name}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getMethodMetadata(ctor, name, key), value);
    });
}

export function testSetOnMethodParam(
    ctor: $Decorators.IClassCtor,
    name: string,
    index: number,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::method[${name}].param[${index}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getMethodParameterMetadata(ctor, name, index, key), value);
    });
}

export function testSetOnStaticMethod(
    ctor: $Decorators.IClassCtor,
    name: string,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::static-method[${name}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getStaticMethodMetadata(ctor, name, key), value);
    });
}

export function testSetOnStaticMethodParam(
    ctor: $Decorators.IClassCtor,
    name: string,
    index: number,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::static-method[${name}].param[${index}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(ctor, name, index, key), value);
    });
}

export function testSetOnAccessor(
    ctor: $Decorators.IClassCtor,
    name: string,
    key: $Reflects.IMetadataKey,
    value: any
): void {

    it(`${ctor.name}::accessor[${name}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getAccessorMetadata(ctor, name, key), value);
    });
}

export function testSetOnStaticAccessor(
    ctor: $Decorators.IClassCtor,
    name: string,
    key: $Reflects.IMetadataKey,
    value: any
): void {
    it(`${ctor.name}::static-accessor[${name}]: for key "${key as string}" should get ${value}`, function() {

        $Assert.strictEqual($Reflect.getStaticAccessorMetadata(ctor, name, key), value);
    });
}
