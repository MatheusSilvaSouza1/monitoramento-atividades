
export interface IResponsavelModel {
    id_responsavel?: number
    nome: string
    login: string
    senha: string
    desativado: boolean
    fk_id_coordenadoria: number
}
