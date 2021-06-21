import $Reflect from '../lib';
import * as $Assert from 'assert';

describe('method', function() {

    it('Should get the metadata value as set', function() {

        const key = Math.random().toString();

        const rV = Math.floor(Math.random() * 0xFFFFFFFF);

        class Test {

            @$Reflect.createMethodMetadataDecorator(key, rV)
            public m1(): void {}
        }

        $Assert.strictEqual($Reflect.getMethodMetadata(Test, 'm1', key), rV);
    });

    it('Should overwrite the previous metadata by default', function() {

        const key = Math.random().toString();

        const rV1 = Math.floor(Math.random() * 0xFFFFFFFF);

        const rV2 = Math.floor(Math.random() * 0xFFFFFFFF);

        class Test {

            @$Reflect.createMethodMetadataDecorator(key, rV2)
            @$Reflect.createMethodMetadataDecorator(key, rV1)
            public m1(): void {}
        }

        $Assert.strictEqual($Reflect.getMethodMetadata(Test, 'm1', key), rV2);
    });

    it('Should get array when the key is set to be `multiple` on duplicated', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        $Reflect.configureMetadata(k1, { onDuplicated: 'multiple' });

        class Test {

            @$Reflect.createMethodMetadataDecorator(k2, rVs[2])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[1])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[0])
            public m1(): void {}
        }

        $Assert.strictEqual(
            $Reflect.getMethodMetadata(Test, 'm1', k1).reduce((p: number, q: number) => p + q, 0) + $Reflect.getMethodMetadata(Test, 'm1', k2),
            rVs[2] + rVs[0] + rVs[1]
        );
    });

    it('Should throw error when the key is set to be `reject` on duplicated', function() {

        const key = Math.random().toString();

        $Reflect.configureMetadata(key, { onDuplicated: 'reject' });

        $Assert.throws(function() {

            class Test {

                @$Reflect.createMethodMetadataDecorator(key, 123)
                @$Reflect.createMethodMetadataDecorator(key, 321)
                public m1(): void {}
            }

            new Test();
        });
    });

    it('Should get undefined when metadata deleted', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            @$Reflect.createMethodMetadataDecorator(k2, rVs[2])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[1])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[0])
            public m1(): void {}
        }

        $Reflect.deleteMethodMetadata(Test, 'm1', k1);

        $Assert.strictEqual($Reflect.getMethodMetadata(Test, 'm1', k1), undefined);
    });

    it('Should get all keys of metadata', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        class Test {

            @$Reflect.createMethodMetadataDecorator(k2, rVs[2])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[1])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[0])
            public m1(): void {}
        }

        const keys = $Reflect.getMethodMetadataKeys(Test, 'm1');

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

            @$Reflect.createMethodMetadataDecorator(k2, rVs[2])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[1])
            @$Reflect.createMethodMetadataDecorator(k1, rVs[0])
            public m1(): void {}
        }

        $Reflect.deleteMethodMetadata(Test, 'm1', k2);

        const keys = $Reflect.getMethodMetadataKeys(Test, 'm1');

        $Assert.strictEqual(keys.length, 1);

        $Assert.strictEqual(Array.from(new Set([
            ...keys,
            k1
        ])).length, 1);
    });
});
