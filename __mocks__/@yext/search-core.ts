export * from '@yext/search-core';

export function provideCore(): unknown {
  return {
    universalSearch: jest.fn(() => {
      return Promise.resolve({
        queryId: '123',
        verticalResults: []
      });
    }),
    verticalSearch: jest.fn(() => {
      return Promise.resolve({});
    }),
    universalAutocomplete: jest.fn(() => {
      return Promise.resolve({});
    }),
    verticalAutocomplete: jest.fn(() => {
      return Promise.resolve({});
    }),
    filterSearch: jest.fn(() => {
      return Promise.resolve({});
    }),
    submitQuestion: jest.fn(() => {
      return Promise.resolve({});
    }),
    generativeDirectAnswer: jest.fn(() => {
      return Promise.resolve({});
    })
  };
}
