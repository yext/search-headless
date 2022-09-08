import { createMockedHeadless } from '../mocks/createMockedHeadless';

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
    const answers = createMockedHeadless({
      verticalSearch: mockSearchWithQueryRules
    }, initialState);
    answers.setVertical('123');
    await answers.executeVerticalQuery();
    const expectedState = {
      queryRules: {
        actions: actions
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });

  it('executeUniversalQuery properly updates queryRules state', async () => {
    const answers = createMockedHeadless({
      universalSearch: mockSearchWithQueryRules
    }, initialState);
    answers.setUniversal();
    await answers.executeUniversalQuery();
    const expectedState = {
      queryRules: {
        actions: actions,
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });
});