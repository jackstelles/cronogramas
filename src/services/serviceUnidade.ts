import Unidade from "../databases/models/unidade"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Unidade)

type newUnidadeRequest = {
    fk_curso: string
    descricao_unidade: string
    carga_horaria_unidade: number
    ordem: number
  }

  type findOneUnidadeRequest = {
    id_unidade: string
  }
export class CreateUnidadeService {
    async execute({
        fk_curso,
        descricao_unidade,
        carga_horaria_unidade,
        ordem,
      }: newUnidadeRequest): Promise<Unidade | Error> {
        // Se já existir um curso com a mesma descrição informada pelo usuário
        // o sistema retornará uma mensagem de erro
        if (await cursor.findOne({ where: { fk_curso } })) {
          return new Error("Curso já cadastrado!")
        }
    
        // Cria um objeto (APP) para ser salvo como registro (BD)
        const unidade = cursor.create({
            fk_curso,
            descricao_unidade,
            carga_horaria_unidade,
            ordem,
        })
    
        // Faz um INSERT lá na tabela "curso"
        // com os dados informados pelo usuário
        await cursor.save(unidade)
    
        // Devolve pro frontend o objeto criado da classe "Curso"
        return unidade
      }
}

export class ReadAllUnidadeService {
    async execute() {
        const unidades = await cursor.find()
        return unidades
      }
}

export class ReadOneUnidadeService {
    
  async execute({ id_unidade }: findOneUnidadeRequest) {
    
    const unidade = await cursor.findOne({ where: { id_unidade } })
    
    if (!unidade) {
      return new Error("Unidade não encontrado!")
    }
    
    return unidade
  }
}

export class UpdateUnidadeService {}

export class DeleteUnidadeService {
    // Recebe o ID do curso como parâmetro da Requisição do usuário
  async execute({ id_unidade }: findOneUnidadeRequest) {
    // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
    const unidade = await cursor.findOne({ where: { id_unidade } })
    // Se o curso não for encontrado no Result Set retorna um erro para o usuário
    if (!unidade) {
      return new Error("Unidade não encontrado!")
    }
    // Se o curso for encontrado, deleta do BD - DELETE FROM curso WHERE id_curso = ??
    await cursor.delete(unidade.id_unidade)
    // Retorna para o usuário o curso que foi deletado
    return unidade
  }
}
