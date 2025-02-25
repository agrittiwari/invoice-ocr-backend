import { gql } from "apollo-server";

export const typeDefs = gql`
  type Invoice {
    id: ID!
    imageUrl: String!
    extractedText: String!
    structuredData: String!
    createdAt: String!
  }

  type Query {
    getInvoices: [Invoice]
  }

  type Mutation {
    uploadInvoice(imageUrl: String!): Invoice
  }
`;
