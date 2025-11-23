/**
 * Validar si un texto no tiene emojis o caracteres pictográficos
 * @param text texto a validar
 * @returns verdadero o falso si el texto no tiene emojis
 */
export function isEmojiSafe(text: string): boolean {
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u;
  return emojiRegex.test(text);
}

/**
 * Validar si un texto no tiene caracteres raros
 * @param text texto a validar
 * @returns verdadero o falso si el texto no contiene caracteres raros
 */
export function isWeirdCharSafe(text: string): boolean {
  const basicSafeRegex =
    /^[\p{L}\p{N}\s.,!@#$%^&*()_+=\-\[\]{}\\|;:'"<>/¿?¡!`~]*$/u;
  return basicSafeRegex.test(text);
}

// ---- VALIDACION DE CORREO ELECTRONICO ----

/**
 * Validar formato de correo electronico
 * @param email correo electronico
 * @returns verdadero o falso si el email tiene formato correcto
 */
export function validateEmalFormat(email: string): boolean {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (!email || email.length == 0) return false;

  const trimedEmail = email.trim().toLowerCase();

  return emailRegex.test(trimedEmail);
}

// ---- VALIDACION DE CONTRASEÑA SEGURA ----

// Tipos de requerimientos para contraseña
export type PasswordRequirement =
  | "MIN_LENGTH"
  | "UPPERCASE"
  | "LOWERCASE"
  | "NUMBER"
  | "SPECIAL_CHAR";

// Tipos de niveles de seguridad
export type PasswordSecurityLevel =
  | "INSEGURA"
  | "SEGURIDAD_MEDIA"
  | "SEGURA"
  | "MUY_SEGURA";

export interface PasswordValidationResult {
  isValid: boolean;
  securityLevel: PasswordSecurityLevel;
  failedRequirements: PasswordRequirement[];
}

const MIN_LENGTH = 12;

export function validatePasswordSecurity(
  password: string
): PasswordValidationResult {
  const failedRequirements: PasswordRequirement[] = [];
  let score = 0;

  // --- 1. Test de Requisitos Mínimos ---

  // A. Longitud mínima
  if (password.length < MIN_LENGTH) {
    failedRequirements.push("MIN_LENGTH");
  } else {
    score += 1;
  }

  // B. Mayúsculas
  if (!/[A-Z]/.test(password)) {
    failedRequirements.push("UPPERCASE");
  } else {
    score += 1;
  }

  // C. Minúsculas
  if (!/[a-z]/.test(password)) {
    failedRequirements.push("LOWERCASE");
  } else {
    score += 1;
  }

  // D. Números
  if (!/[0-9]/.test(password)) {
    failedRequirements.push("NUMBER");
  } else {
    score += 1;
  }

  // E. Caracteres especiales
  // Define un set común de caracteres especiales
  const specialCharsRegex = /[!@#$%^&*()_+=\-[\]{}\\|;:'",.<>/?`~]/;
  if (!specialCharsRegex.test(password)) {
    failedRequirements.push("SPECIAL_CHAR");
  } else {
    score += 1;
  }

  // --- 2. Determinación del Nivel de Seguridad (Basado en la Puntuación) ---

  let securityLevel: PasswordSecurityLevel;

  // El sistema de puntuación es: 1 punto por cada requisito cumplido (Máx. 5)
  if (score < 3 || failedRequirements.includes("MIN_LENGTH")) {
    // Si falla la longitud o cumple menos de 3 requisitos, es INSEGURA.
    securityLevel = "INSEGURA";
  } else if (score === 3) {
    securityLevel = "SEGURIDAD_MEDIA";
  } else if (score === 4) {
    securityLevel = "SEGURA";
  } else {
    // score es 5
    // Cumple todos los requisitos
    securityLevel = "MUY_SEGURA";
  }

  // Si la contraseña cumple todos los requisitos, es válida (true).
  const isValid = failedRequirements.length === 0;

  return {
    isValid,
    securityLevel,
    failedRequirements,
  };
}
