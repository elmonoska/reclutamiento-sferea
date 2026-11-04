import { AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User.model";

@Table({
    tableName: 'tokens',
    underscored: true
})
export default class Token extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    declare id_token: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare id_user: number

    @Column({
        type: DataType.INTEGER
    })
    declare token: number

    @Column({
        type: DataType.DATE
    })
    declare expired_at: Date

    @BelongsTo(() => User)
    declare user: User;
}
