import { Entity, PrimaryColumn, Column } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("curso")
export default class curso {
    @PrimaryColumn()
    id_curso: string

    @Column({nullable: true})
    descricao_curso: string

    @Column({nullable: true})
    carga_horaria_curso: number

    @Column({nullable: true})
    modalidade: string

    @Column({nullable: true})
    eixo: string

    constructor () {
        this.id_curso = uuid()
    }
}