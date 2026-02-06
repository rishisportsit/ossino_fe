export const generateDisplayName = (firstName: string, lastName: string, email: string): string => {
  if (firstName && lastName && firstName.trim() !== '' && lastName.trim() !== '') {
    return `${firstName.trim()} ${lastName.trim()}`;
  }
  
  if (firstName && firstName.trim() !== '') {
    return firstName.trim();
  }
  
  if (lastName && lastName.trim() !== '') {
    return lastName.trim();
  }
  
  if (email && email.trim() !== '') {
    const trimmedEmail = email.trim();
    // Mask the first 3 letters with ***
    if (trimmedEmail.length <= 3) {
      return '***';
    }
    return `***${trimmedEmail.substring(3)}`;
  }
  
  return 'Player';
};