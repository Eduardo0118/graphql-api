import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface PostAttributes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostInstance extends Model<PostAttributes>, PostAttributes { }

export type PostModel = ModelStatic<PostInstance> & BaseModelInterface;

export default (sequelize: Sequelize, dataTypes: typeof DataTypes): PostModel => {
    const Post = sequelize.define<PostInstance, PostAttributes>('Post', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        content: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: dataTypes.BLOB({
                length: "long"
            }),
            allowNull: false
        }
    }, {
        tableName: 'posts'
    }) as PostModel

    Post.associate = (models: ModelsInterface): void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: "author",
                name: "author"
            }
        })
    }

    return Post
}