export interface IAcaoModel {
    id_acao?: number
    tipo: string
    fk_id_atividade: number
    fk_id_prioridade: number
    fk_id_diretoria: number
}
