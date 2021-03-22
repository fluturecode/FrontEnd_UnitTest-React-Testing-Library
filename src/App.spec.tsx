import { cleanup, render } from "@testing-library/react"
import React from "react"
import App from "./App"
import { ApolloMockedProvider } from "./test-utils/providers"

afterEach(cleanup)

/* Other test examples: 'verify validation works', 'submit works' */

test("make sure I can submit a todo", async () => {
	const { debug } = render(
		<ApolloMockedProvider
			customResolvers={{
				Mutation: () => ({
					addTodo: () => ({ id: 1, type: "go to the store" }),
				}),
			}}>
			<App />
		</ApolloMockedProvider>
	)
	debug()
})
