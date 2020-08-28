export interface IAtividadeModel {
    id_atividade?: number
    objetivo: string
    inicio_previsto: Date
    termino_previsto: Date
    target: boolean
    rotina: boolean
    fk_id_status: number
}