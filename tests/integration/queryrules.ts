import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';

const initialState = {
  queryRules: {
    actions: [
      {
        key: 'oldInfo',
        data: {
          someData: 'blah'
        }
      }
    ]
  }
};

const actions = [
  {
    key: 'trackingInfo',
    data: {
      apiUrl: 'www.example.com'
    }
  }
];

function mockSearchWithQueryRules() {
  return Promise.resolve({
    queryRulesActionsData: actions
  });
}

describe('SearchHeadless queryRules interactions properly update state', () => {
  it('executeVerticalQuery properly updates queryRules state', async () => {
    const search = createMockedSearchHeadless({
      verticalSearch: mockSearchWithQueryRules
    }, initialState);
    search.setVertical('123');
    await search.executeVerticalQuery();
    const expectedState = {
      queryRules: {
        actions: actions
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });

  it('executeUniversalQuery properly updates queryRules state', async () => {
    const search = createMockedSearchHeadless({
      universalSearch: mockSearchWithQueryRules
    }, initialState);
    search.setUniversal();
    await search.executeUniversalQuery();
    const expectedState = {
      queryRules: {
        actions: actions,
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });
});