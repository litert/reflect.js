import $Reflect from '../lib';
import * as $Assert from 'assert';

describe('constructor parameter', function() {

    it('Should get the metadata value as set', function() {

        const key = Math.random().toString();

        const rVs = '1'.repeat(10).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public constructor(
                @$Reflect.createConstructorParameterMetadataDecorator(key, rVs[0])
                a: number,
                @$Reflect.createConstructorParameterMetadataDecorator(key, rVs[1])
                b: number
            ) { console.log(a + b); }
        }

        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 0, key), rVs[0]);
        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 1, key), rVs[1]);
    });

    it('Should overwrite the previous metadata by default', function() {

        const key = Math.random().toString();

        const rVs = '1'.repeat(10).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public constructor(
                @$Reflect.createConstructorParameterMetadataDecorator(key, rVs[3])
                @$Reflect.createConstructorParameterMetadataDecorator(key, rVs[2])
                @$Reflect.createConstructorParameterMetadataDecorator(key, rVs[1])
                a: number,
                @$Reflect.createConstructorParameterMetadataDecorator(key, rVs[0])
                b: number
            ) { console.log(a + b); }
        }

        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 0, key), rVs[3]);
        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 1, key), rVs[0]);
    });

    it('Should get array when the key is set to be `multiple` on duplicated', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        $Reflect.configureMetadata(k1, { onDuplicated: 'multiple' });

        class Test {

            public constructor(
                @$Reflect.createConstructorParameterMetadataDecorator(k2, rVs[3])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[2])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[1])
                a: number,
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[0])
                b: number
            ) { console.log(a + b); }
        }

        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 0, k1)[0], rVs[1]);
        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 0, k1)[1], rVs[2]);
        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 0, k2), rVs[3]);
        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 1, k1)[0], rVs[0]);
    });

    it('Should throw error when the key is set to be `reject` on duplicated', function() {

        const key = Math.random().toString();

        $Reflect.configureMetadata(key, { onDuplicated: 'reject' });

        $Assert.throws(function() {

            class Test {

                public constructor(
                    @$Reflect.createConstructorParameterMetadataDecorator(key, 123)
                    @$Reflect.createConstructorParameterMetadataDecorator(key, 321)
                    public a: number,
                    @$Reflect.createConstructorParameterMetadataDecorator(key, 233)
                    public b: number
                ) { }
            }
    
            new Test(1, 2);
        });
    });

    it('Should get undefined when metadata deleted', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(4).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public constructor(
                @$Reflect.createConstructorParameterMetadataDecorator(k2, rVs[3])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[2])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[1])
                a: number,
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[0])
                b: number
            ) { console.log(a + b); }
        }

        $Reflect.deleteConstructorParameterMetadata(Test, 0, k1);

        $Assert.strictEqual($Reflect.getConstructorParameterMetadata(Test, 0, k1), undefined);
    });

    it('Should get all keys of metadata', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public constructor(

                @$Reflect.createConstructorParameterMetadataDecorator(k2, rVs[2])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[1])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[0])
                a: number,
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[0])
                b: number,
            ) { console.log(a + b); }
        }

        const keys = $Reflect.getConstructorParameterMetadataKeys(Test, 0);

        $Assert.strictEqual(keys.length, 2);

        $Assert.strictEqual(Array.from(new Set([
            ...keys,
            k1,
            k2
        ])).length, 2);
    });

    it('Should not get deleted keys', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public constructor(

                @$Reflect.createConstructorParameterMetadataDecorator(k2, rVs[2])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[1])
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[0])
                a: number,
                @$Reflect.createConstructorParameterMetadataDecorator(k1, rVs[0])
                b: number,
            ) { console.log(a + b); }
        }

        $Reflect.deleteConstructorParameterMetadata(Test, 0, k2);

        const keys = $Reflect.getConstructorParameterMetadataKeys(Test, 0);

        $Assert.strictEqual(keys.length, 1);

        $Assert.strictEqual(Array.from(new Set([
            ...keys,
            k1
        ])).length, 1);
    });
});
