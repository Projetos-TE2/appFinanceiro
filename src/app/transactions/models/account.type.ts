export interface Account {
  id?: number;
  name: string;
  type?: string; // Corrente, Poupança, etc
  balance?: number;
  institution?: string;
  manufacture?: string; // compatibilidade com dados antigos
}
