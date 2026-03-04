/**
 * Validates a Brazilian CPF number.
 * Returns true if valid, false otherwise.
 */
export function validateCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;

  // Reject known invalid sequences
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // First check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9))) return false;

  // Second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(10))) return false;

  return true;
}

/**
 * Formats a CPF string as 000.000.000-00
 */
export function maskCPF(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 11);
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
}

/**
 * Formats a CEP string as 00000-000
 */
export function maskCEP(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 8);
  if (cleaned.length <= 5) return cleaned;
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
}

/**
 * Formats a phone string as (00) 00000-0000
 */
export function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 11);
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
}

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

/**
 * Fetches address data from ViaCEP API.
 * Returns null if CEP not found or invalid.
 */
export async function fetchAddressByCEP(cep: string): Promise<ViaCEPResponse | null> {
  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
    if (!response.ok) return null;
    const data: ViaCEPResponse = await response.json();
    if (data.erro) return null;
    return data;
  } catch {
    return null;
  }
}
