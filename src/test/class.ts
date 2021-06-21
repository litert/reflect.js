import $Reflect from '../lib';
import * as $Assert from 'assert';

describe('class', function() {

    it('Should get the metadata value as set', function() {

        const key = Math.random().toString();

        const rV = Math.floor(Math.random() * 0xFFFFFFFF);

        @$Reflect.createClassMetadataDecorator(key, rV)
        class Test { }

        $Assert.strictEqual($Reflect.getClassMetadata(Test, key), rV);
    });

    it('Should overwrite the previous metadata by default', function() {

        const key = Math.random().toString();

        const rV1 = Math.floor(Math.random() * 0xFFFFFFFF);

        const rV2 = Math.floor(Math.random() * 0xFFFFFFFF);

        @$Reflect.createClassMetadataDecorator(key, rV2)
        @$Reflect.createClassMetadataDecorator(key, rV1)
        class Test { }

        $Assert.strictEqual($Reflect.getClassMetadata(Test, key), rV2);
    });

    it('Should get array when the key is set to be `multiple` on duplicated', function() {

        const key = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        $Reflect.configureMetadata(key, { onDuplicated: 'multiple' });

        @$Reflect.createClassMetadataDecorator('value', rVs[2])
        @$Reflect.createClassMetadataDecorator(key, rVs[1])
        @$Reflect.createClassMetadataDecorator(key, rVs[0])
        class Test { }

        $Assert.strictEqual(
            $Reflect.getClassMetadata(Test, key).reduce((p: number, q: number) => p + q, 0) + $Reflect.getClassMetadata(Test, 'value'),
            rVs[2] + rVs[0] + rVs[1]
        );
    });

    it('Should throw error when the key is set to be `reject` on duplicated', function() {

        const key = Math.random().toString();

        $Reflect.configureMetadata(key, { onDuplicated: 'reject' });

        $Assert.throws(function() {

            @$Reflect.createClassMetadataDecorator(key, 123)
            @$Reflect.createClassMetadataDecorator(key, 321)
            class Test { }

            new Test();
        });
    });

    it('Should get undefined when metadata deleted', function() {

        const key = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        @$Reflect.createClassMetadataDecorator('value', rVs[2])
        @$Reflect.createClassMetadataDecorator(key, rVs[1])
        @$Reflect.createClassMetadataDecorator(key, rVs[0])
        class Test { }

        $Reflect.deleteClassMetadata(Test, key);

        $Assert.strictEqual($Reflect.getClassMetadata(Test, key), undefined);
    });

    it('Should get all keys of metadata', function() {

        const k1 = Math.random().toString();
        const k2 = Math.random().toString();

        const rVs = '1'.repeat(3).split('').map((v) => Math.floor(Math.random() * 0xFFFFFFFF));

        @$Reflect.createClassMetadataDecorator(k2, rVs[2])
        @$Reflect.createClassMetadataDecorator(k1, rVs[1])
        @$Reflect.createClassMetadataDecorator(k1, rVs[0])
        class Test { }

        const keys = $Reflect.getClassMetadataKeys(Test);

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

        @$Reflect.createClassMetadataDecorator(k2, rVs[2])
        @$Reflect.createClassMetadataDecorator(k1, rVs[1])
        @$Reflect.createClassMetadataDecorator(k1, rVs[0])
        class Test { }

        $Reflect.deleteClassMetadata(Test, k2);

        const keys = $Reflect.getClassMetadataKeys(Test);

        $Assert.strictEqual(keys.length, 1);

        $Assert.strictEqual(Array.from(new Set([
            ...keys,
            k1
        ])).length, 1);
    });
});
