/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("findCardByTitle", (title: string) => {
	return cy.get(".horizontal").findByText(title).should("exist");
});

Cypress.Commands.add(
	"findCardByTitleInLane",
	(title: string, laneIdx: number) => {
		return cy
			.get(`.horizontal > :nth-child(${laneIdx + 1})`)
			.findByText(title)
			.should("exist");
	},
);

Cypress.Commands.add(
	"assertCardIndexInLane",
	{ prevSubject: "element" },
	(subject, idx: number) => {
		cy.wrap(
			subject.parents(".horizontal").children()[0].children[1].children[0]
				.children[idx],
		)
			.findByText(subject.text())
			.should("exist");
	},
);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
	namespace Cypress {
		interface Chainable {
			// login(email: string, password: string): Chainable<void>
			// drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
			findCardByTitle(title: string): Chainable<JQuery<HTMLElement>>;
			findCardByTitleInLane(
				title: string,
				laneIdx: number,
			): Chainable<JQuery<HTMLElement>>;
			assertCardIndexInLane(idx: number): Chainable<JQuery<HTMLElement>>;
		}
	}
}
import "@testing-library/cypress/add-commands";
import "@4tw/cypress-drag-drop";
