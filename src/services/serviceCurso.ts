import Curso from "../databases/models/curso"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Curso)

// Captura os dados vindos do frontend via requisição
type newCursoRequest = {
  descricao_curso: string
  carga_horaria_curso: number
  modalidade: string
  eixo: string
}

export class CreateCursoService {
  // passa os dados da requisição como parametro do método "execute()"
  async execute({
    descricao_curso,
    carga_horaria_curso,
    modalidade,
    eixo,
  }: newCursoRequest): Promise<Curso | Error> {
    // Se já existir um curso com a mesma descrição informada pelo usuário
    // o sistema retornará uma mensagem de erro
    if (await cursor.findOne({ where: { descricao_curso } })) {
      return new Error("Curso já cadastrado!")
    }

    // Cria um objeto (APP) para ser salvo como registro (BD)
    const curso = cursor.create({
      descricao_curso, // Programador de Sistemas
      carga_horaria_curso, // 200
      modalidade, // Aperfeiçoamento
      eixo, // Tecnologia da Informação
    })

    // Faz um INSERT lá na tabela "curso"
    // com os dados informados pelo usuário
    await cursor.save(curso)

    // Devolve pro frontend o objeto criado da classe "Curso"
    return curso
  }
}

export class ReadAllCursoService {}

export class ReadOneCursoService {}

export class UpdateCursoService {}

export class DeleteCursoService {}
