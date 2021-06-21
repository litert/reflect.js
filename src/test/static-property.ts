import $Reflect from '../lib';
import * as $Assert from 'assert';

describe('static property', function() {

    it('Should get the metadata value as set', function() {

        const key = Math.random().toString();

        const rV = Math.floor(Math.random() * 0xFFFFFFFF);

        class Test {

            @$Reflect.createStaticPropertyMetadataDecorator(key, rV)
            public static sp1: number = 123;
        }

        $Assert.strictEqual($Reflect.getStaticPropertyMetadata(Test, 'sp1', key), rV);
    });

    it('Should overwrite the previous metadata by default', function() {

        const key = Math.random().toString();

        const rV1 = Math.floor(Math.random() * 0xFFFFFFFF);

        const rV2 = Math.floor(Math.random() * 0xFFFFFFFF);

        class Test {

            @$Reflect.createStaticPropertyMetadataDecorator(key, rV2)
            @$Reflect.createStaticPropertyMetadataDecorator(key, rV1)
            public static sp1: number = 123;
        }

        $Assert.strictEqual($Reflect.getStaticPropertyMetadata(Test, 'sp1', key), rV2);
    });

    it('Should get array when the key is set to be `multiple` on duplicated', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        $Reflect.configureMetadata(k1, { onDuplicated: 'multiple' });

        class Test {

            @$Reflect.createStaticPropertyMetadataDecorator(k2, rVs[2])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[1])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[0])
            public static sp1: number = 123;
        }

        $Assert.strictEqual(
            $Reflect.getStaticPropertyMetadata(Test, 'sp1', k1).reduce((p: number, q: number) => p + q, 0) + $Reflect.getStaticPropertyMetadata(Test, 'sp1', k2),
            rVs[2] + rVs[0] + rVs[1]
        );
    });

    it('Should throw error when the key is set to be `reject` on duplicated', function() {

        const key = Math.random().toString();

        $Reflect.configureMetadata(key, { onDuplicated: 'reject' });

        $Assert.throws(function() {

            class Test {

                @$Reflect.createStaticPropertyMetadataDecorator(key, 123)
                @$Reflect.createStaticPropertyMetadataDecorator(key, 321)
                public static sp1: number = 123;
            }

            new Test();
        });
    });

    it('Should get undefined when metadata deleted', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            @$Reflect.createStaticPropertyMetadataDecorator(k2, rVs[2])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[1])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[0])
            public static sp1: number = 123;
        }

        $Reflect.deleteStaticPropertyMetadata(Test, 'sp1', k1);

        $Assert.strictEqual($Reflect.getStaticPropertyMetadata(Test, 'sp1', k1), undefined);
    });

    it('Should get all keys of metadata', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            @$Reflect.createStaticPropertyMetadataDecorator(k2, rVs[2])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[1])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[0])
            public static sp1: number = 123;
        }

        const keys = $Reflect.getStaticPropertyMetadataKeys(Test, 'sp1');

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

            @$Reflect.createStaticPropertyMetadataDecorator(k2, rVs[2])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[1])
            @$Reflect.createStaticPropertyMetadataDecorator(k1, rVs[0])
            public static sp1: number = 123;
        }

        $Reflect.deleteStaticPropertyMetadata(Test, 'sp1', k2);

        const keys = $Reflect.getStaticPropertyMetadataKeys(Test, 'sp1');

        $Assert.strictEqual(keys.length, 1);

        $Assert.strictEqual(Array.from(new Set([
            ...keys,
            k1
        ])).length, 1);
    });
});
