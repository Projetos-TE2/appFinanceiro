export type Account = {
  id: string;
  name: string;
  type?: string; // Corrente, Poupança, etc
  balance?: number;
  institution?: string;
  manufacture?: string; // compatibilidade com dados antigos
}
