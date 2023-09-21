import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface CommentAttributes {
    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CommentInstance extends Model<CommentAttributes>, CommentAttributes {}

export type CommentModel = ModelStatic<CommentInstance> & BaseModelInterface

export default (sequelize: Sequelize, dataTypes: typeof DataTypes): CommentModel => {
    const Comment = sequelize.define<CommentInstance, CommentAttributes>('Comment', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: dataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'comments'
    }) as CommentModel

    Comment.associate = (models: ModelsInterface): void => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                field: "post",
                name: "post"
            }
        })

        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: "user",
                name: "user"
            }
        })
    }

    return Comment
}