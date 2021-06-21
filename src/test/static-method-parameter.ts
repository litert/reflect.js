import $Reflect from '../lib';
import * as $Assert from 'assert';

describe('static method parameter', function() {

    it('Should get the metadata value as set', function() {

        const key = Math.random().toString();

        const rVs = '1'.repeat(10).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public static sm1(
                @$Reflect.createStaticMethodParameterMetadataDecorator(key, rVs[0])
                a: number,
                @$Reflect.createStaticMethodParameterMetadataDecorator(key, rVs[1])
                b: number
            ): void { console.log(a + b); }
        }

        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 0, key), rVs[0]);
        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 1, key), rVs[1]);
    });

    it('Should overwrite the previous metadata by default', function() {

        const key = Math.random().toString();

        const rVs = '1'.repeat(10).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public static sm1(
                @$Reflect.createStaticMethodParameterMetadataDecorator(key, rVs[3])
                @$Reflect.createStaticMethodParameterMetadataDecorator(key, rVs[2])
                @$Reflect.createStaticMethodParameterMetadataDecorator(key, rVs[1])
                a: number,
                @$Reflect.createStaticMethodParameterMetadataDecorator(key, rVs[0])
                b: number
            ): void { console.log(a + b); }
        }

        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 0, key), rVs[3]);
        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 1, key), rVs[0]);
    });

    it('Should get array when the key is set to be `multiple` on duplicated', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        $Reflect.configureMetadata(k1, { onDuplicated: 'multiple' });

        class Test {

            public static sm1(
                @$Reflect.createStaticMethodParameterMetadataDecorator(k2, rVs[3])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[2])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[1])
                a: number,
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[0])
                b: number
            ): void { console.log(a + b); }
        }

        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 0, k1)[0], rVs[1]);
        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 0, k1)[1], rVs[2]);
        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 0, k2), rVs[3]);
        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 1, k1)[0], rVs[0]);
    });

    it('Should throw error when the key is set to be `reject` on duplicated', function() {

        const key = Math.random().toString();

        $Reflect.configureMetadata(key, { onDuplicated: 'reject' });

        $Assert.throws(function() {

            class Test {

                public static sm1(
                    @$Reflect.createStaticMethodParameterMetadataDecorator(key, 123)
                    @$Reflect.createStaticMethodParameterMetadataDecorator(key, 321)
                    a: number,
                    @$Reflect.createStaticMethodParameterMetadataDecorator(key, 233)
                    b: number
                ): void { console.log(a + b); }
            }
    
            new Test();
        });
    });

    it('Should get undefined when metadata deleted', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(4).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public static sm1(
                @$Reflect.createStaticMethodParameterMetadataDecorator(k2, rVs[3])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[2])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[1])
                a: number,
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[0])
                b: number
            ): void { console.log(a + b); }
        }

        $Reflect.deleteStaticMethodParameterMetadata(Test, 'sm1', 0, k1);

        $Assert.strictEqual($Reflect.getStaticMethodParameterMetadata(Test, 'sm1', 0, k1), undefined);
    });

    it('Should get all keys of metadata', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            public static sm1(

                @$Reflect.createStaticMethodParameterMetadataDecorator(k2, rVs[2])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[1])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[0])
                a: number,
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[0])
                b: number,
            ): void { console.log(a + b); }
        }

        const keys = $Reflect.getStaticMethodParameterMetadataKeys(Test, 'sm1', 0);

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

            public static sm1(

                @$Reflect.createStaticMethodParameterMetadataDecorator(k2, rVs[2])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[1])
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[0])
                a: number,
                @$Reflect.createStaticMethodParameterMetadataDecorator(k1, rVs[0])
                b: number,
            ): void { console.log(a + b); }
        }

        $Reflect.deleteStaticMethodParameterMetadata(Test, 'sm1', 0, k2);

        const keys = $Reflect.getStaticMethodParameterMetadataKeys(Test, 'sm1', 0);

        $Assert.strictEqual(keys.length, 1);

        $Assert.strictEqual(Array.from(new Set([
            ...keys,
            k1
        ])).length, 1);
    });
});
