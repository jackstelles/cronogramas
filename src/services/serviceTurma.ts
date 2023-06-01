import Turma from "../databases/models/turma"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Turma)

export class CreateCursoService {}

export class ReadAllCursoService {}

export class ReadOneCursoService {}

export class UpdateCursoService {}

export class DeleteCursoService {}
