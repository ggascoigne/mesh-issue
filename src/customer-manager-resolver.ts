import debugModule from 'debug'

const debug = debugModule('gql:resolver')

export const resolvers = {
  Customer: {
    users: {
      selectionSet: `{ url }`,
      resolve: async (root, args, context, info) => {
        debug({ root, args, cmQuery: context.customerManager.Query, info })
        const data = await context.customerManager.Query.listUsers({
          root,
          args: { customer: root.id },
          context,
          info,
        })
        debug('data', data)
        return data?.results
      },
    },
  },
}
