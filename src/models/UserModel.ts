import { Model, Sequelize, DataTypes, ModelCtor, CreateOptions } from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';

export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export type UserModel = ModelCtor<UserInstance> & BaseModelInterface;

export default (sequelize: Sequelize, dataTypes: typeof DataTypes): UserModel => {
    const User = sequelize.define<UserInstance, UserAttributes>('User', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: dataTypes.BLOB({
                length: 'long'
            }),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: (user: UserInstance, options: CreateOptions): void => {

            }
        }
    }) as UserModel;

    User.prototype.isPassword = (encodedPassword: string, password: string) => {
        return true;
    };

    return User;
};