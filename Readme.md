#graphql-mesh & openapi issue?

I need to extract keys (that I don't have control over) from urls, because of this I have to use js resolvers rather than defining them in the `.meshrc.yaml` file.

The docs suggest that this resolver from the `.meshrc.yaml`:

```yaml
additionalResolvers:
   - targetTypeName: Customer
     targetFieldName: users
     requiredSelectionSet: |
      {
        url
      }
     sourceName: customerManager
     sourceTypeName: Query
     sourceFieldName: listUsers
     result: results
     sourceArgs:
       customer: "39"
```

Should be identical to:

```js
export const resolvers = {
  Customer: {
    users: {
      selectionSet: `{ url }`,
      resolve: async (root, args, context, info) => {
        const data = await context.customerManager.Query.listUsers({
          root,
          args: { customer: "39" },
          context,
          info,
          selectionSet: `{ url }`,
        })
        return data?.results
      },
    },
  },
}

```

However, the second never makes any api call when it calls `context.customerManager.Query.listUsers`, instead it just returns null.

To test this:

* `yarn` - install dependencies
* `yarn start` - start the json-server and grapqhl-mesh dev
* point a graphiql browser at http://localhost:4000

I've been using these two queries:

```graphql
query getCustomerAndUsers {
  listCustomers(id: "39") {
    results {
      name
      id
      users {
        email
      }
    }
  }
}

query getCustomerUsers {
  listUsers(customer: "39") {
    results {
      email
    }
  }
}
```

Both queries should return the same user list.

