export interface IAcaoModel {
    id_acao?: number
    tipo: string
    prioridade: string
    fk_id_atividade: number
    fk_id_diretoria: number
}
