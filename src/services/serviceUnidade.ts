import Curso from "../databases/models/curso"
import { AppDataSource } from "../databases/connections/data-source"

const cursor = AppDataSource.getRepository(Curso)

export class CreateCursoService {}

export class ReadAllCursoService {}

export class ReadOneCursoService {}

export class UpdateCursoService {}

export class DeleteCursoService {}
