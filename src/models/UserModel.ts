import { Model, Sequelize, DataTypes, CreateOptions, ModelStatic } from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export type UserModel = ModelStatic<UserInstance> & BaseModelInterface;

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
                const salt = genSaltSync();
                user.password = hashSync(user.password, salt)
            }
        }
    }) as UserModel;

    User.prototype.isPassword = (encodedPassword: string, password: string) => {
        return compareSync(password, encodedPassword)
    };

    return User;
};