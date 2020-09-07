export interface IAtividadeModel {
    id_atividade?: number
    objetivo: string
    inicio_previsto?: string
    termino_previsto?: string
    target: boolean
    rotina: boolean
    fk_id_status: number
    responsaveis?: [{id_responsavel: number, responsavel: string}]
}