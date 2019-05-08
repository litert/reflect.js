/**
 * Copyright 2019 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface IReflectManager {

    /**
     * Create a define-metadata decorator method.
     *
     * @param key   The key of metadata to be defined.
     * @param value The value of metadata to be defined.
     *
     * @returns An all-kinds compatitable decorator.
     */
    metadata(key: number | string | symbol, value: any): {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };

    /**
     * Get the names of methods that has metadata in a given class.
     *
     * @param target The given class.
     */
    getOwnMethodNames(target: Function | Object): Array<string | symbol>;

    /**
     * Get the names of properties that has metadata in a given class.
     *
     * @param target The given class.
     */
    getOwnPropertyNames(target: Function | Object): Array<string | symbol>;

    /**
     * Get the value of metadata of a given class, by key.
     *
     * @param target    The given class.
     * @param key       The key of metadata to be fetch.
     */
    getMetadata(
        target: Function | Object,
        key: string | symbol
    ): any;

    /**
     * Set the value of metadata of a given class, by key.
     *
     * @param target    The given class.
     * @param key       The key of metadata to be defined.
     * @param value     The value of metadata.
     */
    setMetadata(
        target: Function | Object,
        key: string | symbol,
        value: any
    ): void;

    /**
     * Get the keys of metadata of a given class.
     *
     * @param target    The given class.
     */
    getMetadataKeys(
        target: Function | Object
    ): Array<string | symbol>;

    /**
     * Get the value of metadata of specific property in a given class, by key.
     *
     * @param target    The given class.
     * @param name      The name of specific property.
     * @param key       The key of metadata to be fetch.
     */
    getMetadataOfProperty(
        target: Function | Object,
        name: string | symbol,
        key: string | symbol
    ): any;

    /**
     * Get the value of metadata of specific property in a given class, by key.
     *
     * @param target    The given class.
     * @param name      The name of specific property.
     * @param key       The key of metadata to be fetch.
     */
    getMetadataKeysOfProperty(
        target: Function | Object,
        name: string | symbol
    ): Array<string | symbol>;

    /**
     * Set the value of metadata of specific property in a given class, by key.
     *
     * @param target    The given class.
     * @param name      The name of specific property.
     * @param key       The key of metadata to be defined.
     * @param value     The value of metadata.
     */
    setMetadataOfProperty(
        target: Function | Object,
        name: string | symbol,
        key: string | symbol,
        value: any
    ): void;

    /**
     * Get the value of metadata of specific method in a given class, by key.
     *
     * @param target    The given class.
     * @param name      The name of specific method.
     * @param key       The key of metadata to be fetch.
     */
    getMetadataOfMethod(
        target: Function | Object,
        name: string | symbol,
        key: string | symbol
    ): any;

    /**
     * Set the value of metadata of specific method in a given class, by key.
     *
     * @param target    The given class.
     * @param name      The name of specific method.
     * @param key       The key of metadata to be defined.
     * @param value     The value of metadata.
     */
    setMetadataOfMethod(
        target: Function | Object,
        name: string | symbol,
        key: string | symbol,
        value: any
    ): any;

    /**
     * Get the keys of metadata of specific method in a given class.
     *
     * @param target    The given class.
     * @param name      The name of specific method.
     */
    getMetadataKeysOfMethod(
        target: Function | Object,
        name: string | symbol
    ): Array<string | symbol>;

    /**
     * Get the value of metadata of specific method parameter in a given class,
     * by key.
     *
     * @param target    The given class.
     * @param name      The name of specific method.
     * @param index     The index of parameter.
     * @param key       The key of metadata to be fetch.
     */
    getMetadataOfParameter(
        target: Function | Object,
        name: string | symbol,
        index: number,
        key: string | symbol
    ): any;

    /**
     * Set the value of metadata of specific method parameter in a given class,
     * by key.
     *
     * @param target    The given class.
     * @param name      The name of specific method.
     * @param index     The index of parameter.
     * @param key       The key of metadata to be defined.
     * @param value     The value of metadata.
     */
    setMetadataOfParameter(
        target: Function | Object,
        name: string,
        index: number,
        key: string,
        value: any
    ): void;

    /**
     * Get the keys of metadata of specific method parameter in a given class.
     *
     * @param target    The given class.
     * @param name      The name of specific method.
     * @param index     The index of parameter.
     */
    getMetadataKeysOfParameter(
        target: Function | Object,
        name: string | symbol,
        index: number
    ): Array<string | symbol>;

    /**
     * Get the parent class of a given class.
     * @param target    The given class.
     */
    getParent(target: Function): Function;
}

interface IClassItem {

    "metadata": Record<string, any>;

    "properties": Record<string, Record<string, any>>;

    "methods": Record<string, IMethodItem>;
}

interface IMethodItem {

    "metadata": Record<string, any>;

    "parameters": Record<string, Record<string, any>>;
}

class ReflectManager implements IReflectManager {

    private _classes: Map<any, IClassItem>;

    public constructor() {

        this._classes = new Map();
    }

    private _getClass(target: any): IClassItem {

        return this._classes.get(target) || this._classes.set(target, {

            "metadata": {},
            "properties": {},
            "methods": {}

        }).get(target) as IClassItem;
    }

    private _getProperty(target: IClassItem, name: string): Record<string, any> {

        return target.properties[name] || (target.properties[name] = {});
    }

    private _getMethod(target: IClassItem, name: string): IMethodItem {

        return target.methods[name] || (target.methods[name] = {
            metadata: {},
            parameters: {}
        });
    }

    private _getParameter(target: IClassItem, name: string, index: number): Record<string, any> {

        const m = this._getMethod(target, name);

        return m.parameters[index] || (m.parameters[index] = {});
    }

    public getOwnMethodNames(target: Function | Object): Array<string | symbol> {

        const cls = this._classes.get(target);

        return cls ? [
            ...Object.getOwnPropertyNames(cls.methods),
            ...Object.getOwnPropertySymbols(cls.methods)
        ] : [];
    }

    public getOwnPropertyNames(target: Function | Object): Array<string | symbol> {

        const cls = this._classes.get(target);

        return cls ? [
            ...Object.getOwnPropertyNames(cls.properties),
            ...Object.getOwnPropertySymbols(cls.properties)
        ] : [];
    }

    public getMetadata(
        target: Function | Object,
        key: string
    ): any {

        const cls = this._classes.get(target);

        if (!cls) {

            return undefined;
        }

        return cls.metadata[key];
    }

    public getMetadataKeys(
        target: Function | Object
    ): Array<string | symbol> {

        const cls = this._classes.get(target);

        if (!cls) {

            return [];
        }

        return [
            ...Object.getOwnPropertyNames(cls.metadata),
            ...Object.getOwnPropertySymbols(cls.metadata)
        ];
    }

    public getMetadataOfProperty(
        target: Function | Object,
        name: string,
        key: string
    ): any {

        const cls = this._classes.get(target);

        if (!cls) {

            return undefined;
        }

        const p = cls.properties[name];

        if (!p) {

            return undefined;
        }

        return p[key];
    }

    public getMetadataKeysOfProperty(
        target: Function | Object,
        name: string,
    ): Array<string | symbol> {

        const cls = this._classes.get(target);

        if (!cls) {

            return [];
        }

        const p = cls.properties[name];

        if (!p) {

            return [];
        }

        return [
            ...Object.getOwnPropertyNames(p),
            ...Object.getOwnPropertySymbols(p)
        ];
    }

    public getMetadataOfMethod(
        target: Function | Object,
        name: string,
        key: string
    ): any {

        const cls = this._classes.get(target);

        if (!cls) {

            return undefined;
        }

        const m = cls.methods[name];

        if (!m) {

            return undefined;
        }

        return m.metadata[key];
    }

    public getMetadataKeysOfMethod(
        target: Function | Object,
        name: string
    ): Array<string | symbol> {

        const cls = this._classes.get(target);

        if (!cls) {

            return [];
        }

        const m = cls.methods[name];

        if (!m) {

            return [];
        }

        return [
            ...Object.getOwnPropertyNames(m.metadata),
            ...Object.getOwnPropertySymbols(m.metadata)
        ];
    }

    public getMetadataOfParameter(
        target: Function | Object,
        name: string,
        index: number,
        key: string
    ): any {

        const cls = this._classes.get(target);

        if (!cls) {

            return undefined;
        }

        const m = cls.methods[name];

        if (!m) {

            return undefined;
        }

        const p = m.parameters[index];

        return p ? p[key] : undefined;
    }

    public getMetadataKeysOfParameter(
        target: Function | Object,
        name: string,
        index: number
    ): Array<string | symbol> {

        const cls = this._classes.get(target);

        if (!cls) {

            return [];
        }

        const m = cls.methods[name];

        if (!m) {

            return [];
        }

        const p = m.parameters[index];

        return p ? [
            ...Object.getOwnPropertyNames(p),
            ...Object.getOwnPropertySymbols(p)
        ] : [];
    }

    public setMetadata(
        target: Function | Object,
        key: string,
        value: any
    ): void {

        const cls = this._getClass(
            typeof target === "function" ? target : target.constructor
        );

        cls.metadata[key] = value;
    }

    public setMetadataOfMethod(
        target: Function | Object,
        name: string,
        key: string,
        value: any
    ): void {

        const cls = this._getClass(target);

        this._getMethod(cls, name).metadata[key] = value;
    }

    public setMetadataOfProperty(
        target: Function | Object,
        name: string,
        key: string,
        value: any
    ): void {

        const cls = this._getClass(target);

        this._getProperty(cls, name)[key] = value;
    }

    public setMetadataOfParameter(
        target: Function | Object,
        name: string,
        index: number,
        key: string,
        value: any
    ): void {

        const cls = this._getClass(target);

        this._getParameter(cls, name, index)[key] = value;
    }

    public metadata(key: string, value: any): any {

        return (target: any, propertyKey: any, descriptor?: any): any => {

            const cls = this._getClass(
                typeof target === "function" ? target : target.constructor
            );

            if (propertyKey !== undefined) {

                switch (typeof descriptor) {

                    case "number": {

                        // for parameter

                        this._getParameter(cls, propertyKey, descriptor)[key] = value;

                        break;
                    }

                    case "object": {

                        // for method

                        this._getMethod(cls, propertyKey).metadata[key] = value;

                        break;
                    }

                    case "undefined": {

                        // for property

                        this._getProperty(cls, propertyKey)[key] = value;

                        break;
                    }
                }

            }
            else {

                cls.metadata[key] = value;
            }
        };
    }

    public getParent(cls: any): any {

        if (typeof cls === "function" && cls.__proto__.prototype) {

            return cls.__proto__;
        }

        return undefined;
    }
}

const defaultManager: IReflectManager = new ReflectManager();

export default defaultManager;

export function createReflectManager() {

    return new ReflectManager();
}
