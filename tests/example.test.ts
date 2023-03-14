import { gql } from "apollo-server-express";
import { sendTestRequest } from "./testUtils";
import { expect, test, it, beforeEach, beforeAll, afterAll } from "vitest";

it("Example", async () => {
  const response = await sendTestRequest(gql`
    query {
      __typename
    }
  `);

  expect(response).toEqual({
    data: {
      __typename: "Query",
    },
  });
});
