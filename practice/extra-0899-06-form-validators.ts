/**
 * Form data validation and sanitization rules
 */

export const Validators = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  },

  isUzbekPhone: (phone: string): boolean => {
    // Format: +998901234567 or 998901234567
    const phoneRegex = /^(\+?998)?[0-9]{9}$/;
    const cleanPhone = phone.replace(/\s+/g, '');
    return phoneRegex.test(cleanPhone);
  },

  isStrongPassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Must be at least 8 characters long');
    if (!/[A-Z]/.test(password)) errors.push('Must contain at least 1 uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Must contain at least 1 lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('Must contain at least 1 digit');

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  sanitizeInput: (input: string): string => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};
