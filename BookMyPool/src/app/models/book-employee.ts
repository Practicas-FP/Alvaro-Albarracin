import { BookData } from "./book";
import { EmployeeData } from "./employee";

export interface BookEmployeeData {
  employee: EmployeeData,
  book: BookData
}
