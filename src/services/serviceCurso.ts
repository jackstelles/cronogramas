import { AppDataSource } from "../databases/connections/data-source"
import Curso from "../databases/models/curso"

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor

const cursor = AppDataSource.getRepository(Curso)

// 2) Recebe dados da Requisição HTTP lá do FRONTEND

type newCursoRequest = {
  descricao_curso: string
  carga_horaria_curso: number
  modalidade: string
  eixo: string
}

type findOneCursoRequest = {
  id_curso: string
}

// 3) Classes CRUD

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

export class ReadAllCursoService {
  async execute() {
    // Executa a consulta "SELECT * FROM curso" no BD
    // Armazena todos os registros do Result Set na variável "cursos"
    // Neste caso, esta variável é uma lista de cursos
    const cursos = await cursor.find()
    return cursos
  }
}

export class ReadOneCursoService {
  // Recebe o ID do curso como parâmetro da Requisição do usuário
  async execute({ id_curso }: findOneCursoRequest) {
    // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
    const curso = await cursor.findOne({ where: { id_curso } })
    // Se o curso não for encontrado no Result Set retorna um erro para o usuário
    if (!curso) {
      return new Error("Curso não encontrado!")
    }
    // Se o curso for encontrado retorna para o usuário o curso
    return curso
  }
}

export class UpdateCursoService {}

export class DeleteCursoService {
  // Recebe o ID do curso como parâmetro da Requisição do usuário
  async execute({ id_curso }: findOneCursoRequest) {
    // Vê se o curso existe na tabela no BD - SELECT * FROM curso WHERE id_curso = ??
    const curso = await cursor.findOne({ where: { id_curso } })
    // Se o curso não for encontrado no Result Set retorna um erro para o usuário
    if (!curso) {
      return new Error("Curso não encontrado!")
    }
    // Se o curso for encontrado, deleta do BD - DELETE FROM curso WHERE id_curso = ??
    await cursor.delete(curso)
    // Retorna para o usuário o curso que foi deletado
    return curso
  }
}
