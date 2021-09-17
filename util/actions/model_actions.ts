/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import BaseWorld from "../../support/base_world";
import { Connection } from "typeorm";
import User from "../../models/user/user";

export async function deleteModel<T>(
    this: BaseWorld,
    key: string
): Promise<void> {
    const connection = this.getConnection();

    const model = this.getCustomProp<T | undefined>(key);

    if (model !== undefined) {
        await connection.manager.remove<T>(model);
        this.setCustomProp<undefined>(key, undefined);
    } else {
        throw new Error(`Model for ${key} not found in store`);
    }
}

export async function createModel<T, X>(
    this: BaseWorld,
    type: any,
    key: string
): Promise<T> {
    const connection = this.getConnection();
    const attributes = this.getCustomProp<X>(`${key}Attributes`);

    let model = connection.manager.create<T>(type, attributes);

    // handle automatic creation
    if (model instanceof User) {
        await model.hashPassword(model.password);
    }

    model = await connection.manager.save<T>(model);

    this.setCustomProp<T>(key, model);

    return model;
}

export async function updateModel<T, X>(
    this: BaseWorld,
    type: any,
    modelName: string,
    attributesToUpdate: Partial<X>
) {
    const connection = this.getConnection();
    let model = this.getCustomProp<T>(modelName);

    if (!model) {
        model = (await createModel.call(this, type, modelName)) as T;
    }

    const modelAttributesName = `${modelName}Attributes`;

    for (const [key, value] of Object.entries(
        attributesToUpdate as Partial<X>
    ) as [keyof X, any]) {
        this.setCustomProp<X>(modelAttributesName, {
            ...this.getCustomProp<X>(modelAttributesName),
            [key]: value,
        });

        model[key as keyof T] = value;
    }
    model = await connection.manager.save(model);
}

export const modelMatchesInterface = async <T, X extends T>(
    attr: T,
    model: X
): Promise<boolean> => {
    let matches = true;

    for (const key of Object.keys(attr)) {
        const modelVal = model[key as keyof X];
        const attrVal = attr[key as keyof T];

        if (key === "password" && model instanceof User) {
            if (await model.comparePassword(attrVal as any as string)) {
                continue;
            }
        }

        if (typeof modelVal !== "function") {
            // Loose equals
            if ((modelVal as any) !== (attrVal as any)) {
                // Handle Dates
                if (
                    Object.prototype.toString.call(modelVal) === "[object Date]"
                ) {
                    const d1 = new Date(modelVal as any);
                    const d2 = new Date(attrVal as any);

                    if (d1.getTime() === d2.getTime()) {
                        continue;
                    }
                }

                // Handle numbers
                if (
                    typeof modelVal === "number" ||
                    typeof attrVal === "number"
                ) {
                    if (Number(modelVal) === Number(attrVal)) {
                        continue;
                    }
                }

                // handle undefined and null
                if (!modelVal && !attrVal) {
                    continue;
                }

                matches = false;

                break;
            }
        }
    }

    return matches;
};
