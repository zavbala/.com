import { Client, cacheExchange, fetchExchange, gql } from '@urql/core';

const STREAK = gql`
  mutation RegisterVisitStreak {
    visitStreakUpdate(input: {}) {
      clientMutationId
      node {
        id
        visitStreak {
          emoji
          duration
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const ProductHunt = new Client({
  url: 'https://www.producthunt.com/frontend/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        Host: 'www.producthunt.com',
        Referer: 'https://www.producthunt.com/',
        'x-requested-with': 'XMLHttpRequest',
        Cookie: import.meta.env.PH_COOKIE,
      },
    };
  },
});

export const get = async () => {
  const response = await ProductHunt.mutation(STREAK, {});

  return new Response(JSON.stringify(response.data), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
};
