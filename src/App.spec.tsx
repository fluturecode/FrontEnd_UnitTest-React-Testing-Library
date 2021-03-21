import { cleanup, fireEvent, render } from "@testing-library/react"
import React from "react"
import App from "./App"
import { ApolloMockedProvider } from "./test-utils/providers"

afterEach(cleanup)

/* Other test examples: 'verify validation works', 'submit works' */

test("make sure I can submit a todo", async () => {
	const { getByPlaceholderText, getByTestId, getByText } = render(
		<ApolloMockedProvider
			customResolvers={{
				Mutation: () => ({
					addTodo: () => ({ id: 1, type: "go to the store" }),
				}),
			}}>
			<App />
		</ApolloMockedProvider>
	)

	const todoInput = getByPlaceholderText("todo...")
	const submitButton = getByTestId("submit-button")
	fireEvent.click(submitButton)

	await waitForDomChange()

	getByText("required")

	fireEvent.change(todoInput, { target: { value: "go to the store" } })

	fireEvent.click(submitButton)

	await waitForElement(() => getByText("go to the store"))
})
