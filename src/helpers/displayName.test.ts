import { generateDisplayName } from './displayName';

const testCases = [
  {
    firstName: 'John',
    lastName: 'Doe', 
    email: 'john.doe@example.com',
    expected: 'John Doe'
  },
  {
    firstName: 'Jane',
    lastName: '',
    email: 'jane@example.com', 
    expected: 'Jane'
  },
  {
    firstName: '',
    lastName: 'Smith',
    email: 'smith@example.com',
    expected: 'Smith'
  },
  {
    firstName: '',
    lastName: '',
    email: 'short@test.com',
    expected: 'short@test.com'
  },
  {
    firstName: null,
    lastName: null,
    email: 'verylongemail@extremelylongdomainname.com',
    expected: 'verylongemai...'
  },
  {
    firstName: '',
    lastName: '',
    email: '',
    expected: 'Player'
  }
];

export const runDisplayNameTests = () => {
  testCases.forEach((testCase, index) => {
    const result = generateDisplayName(
      testCase.firstName || '', 
      testCase.lastName || '', 
      testCase.email || ''
    );
  });
};