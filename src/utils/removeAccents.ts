export function removeAccents(str: string): string {
  return str
    .normalize("NFD") // descompone letras acentuadas
    .replace(/[\u0300-\u036f]/g, "") // borra tildes
    .replace(/ü/g, "u"); // opcional: reemplazar diéresis
}
