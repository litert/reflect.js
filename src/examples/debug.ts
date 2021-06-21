import $Decorators, { IClassCtor } from '@litert/decorator';

class B {}

@$Decorators.createClassDecorator(() => { return; })
export class A {

    @$Decorators.createPropertyDecorator(() => null)
    public readonly valueX: null = null;

    public constructor(
        public readonly value: number
    ) {}

    @$Decorators.createMethodDecorator(() => { return; })
    public add(a: number, b: number): number {

        return a + b;
    }

    @$Decorators.createStaticMethodDecorator(() => { return; })
    public static multiple(a: number, b: number, c?: string | number): number {

        return a * b;
    }

    @$Decorators.createStaticMethodDecorator(() => { return; })
    public static multipleX(a: number, b: number): B {

        console.log(a * b);

        return new B();
    }

    @$Decorators.createStaticPropertyDecorator(() => { return; })
    public static sValue: number = 233;

    @$Decorators.createStaticAccessorDecorator(() => { return; })
    public static set sSetter(v: number) { return; }
}

function t<T extends IClassCtor>(x: T): void {}

t(Object);
t(Number);
t(String);
t(Boolean);
