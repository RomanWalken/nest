import { 
  registerDecorator, 
  ValidationOptions, 
  ValidatorConstraint, 
  ValidatorConstraintInterface 
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    if (!password) return false;
    
    // Минимум 8 символов
    if (password.length < 8) return false;
    
    // Содержит хотя бы одну заглавную букву
    if (!/[A-Z]/.test(password)) return false;
    
    // Содержит хотя бы одну строчную букву
    if (!/[a-z]/.test(password)) return false;
    
    // Содержит хотя бы одну цифру
    if (!/\d/.test(password)) return false;
    
    // Содержит хотя бы один специальный символ
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
    
    return true;
  }

  defaultMessage(): string {
    return 'Пароль должен содержать минимум 8 символов, включая заглавную букву, строчную букву, цифру и специальный символ';
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}
