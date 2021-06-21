import $Reflect from '../lib';
import * as $Assert from 'assert';

describe('api:create***MetadataDecorator', function() {

    @$Reflect.createClassMetadataDecorator('id', 123)
    class Test {

    }

    new Test();

    $Assert.strictEqual($Reflect.getClassMetadata(Test, 'id'), 123);
});
