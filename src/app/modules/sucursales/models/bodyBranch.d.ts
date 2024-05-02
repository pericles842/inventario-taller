import { typeBranch } from "./Sucursal.Model"

//body branch para la api
export type BodyBranch = {
    id_branch: number
    type_branch: typeBranch['typeBranch']
    ids_users: number[]
    ids_users_delete: number[]
}