export interface ICoodenadoriaModel {
    id_coordenadoria?: number
    nome: string
    sigla: string
    desativado: boolean
    fk_id_diretoria: number
}
