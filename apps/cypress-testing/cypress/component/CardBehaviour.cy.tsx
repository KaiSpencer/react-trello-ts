import Board from "react-trello-ts";

describe("Testing card behaviour", () => {
	it("renders cards", () => {
		cy.fixture("data.json").then((data) => {
			cy.mount(<Board data={data} />);
			cy.get(".horizontal")
				.findAllByText("Planned Tasks")
				.should("exist")
				.should("have.length", 1);
			cy.findCardByTitleInLane("Buy milk", 0);
			cy.findCardByTitleInLane("Dispose Garbage", 0);
			cy.findCardByTitleInLane("Write Blog", 0);
			cy.findCardByTitleInLane("Pay Rent", 0);
			cy.findCardByTitleInLane("Clean House", 1);
			cy.findCardByTitleInLane("Practice Meditation", 3);
			cy.findCardByTitleInLane("Maintain Daily Journal", 3);
			cy.findCardByTitleInLane("Morning Jog", 4);
			cy.findCardByTitleInLane("Go Trekking", 5);
			cy.findCardByTitleInLane("Go Jogging", 6);
			cy.findCardByTitleInLane("Go Cycling", 7);
		});
	});

	it("Can drag a card in the same lane", () => {
		cy.fixture("data.json").then((data) => {
			cy.mount(<Board data={data} />);
			cy.findCardByTitleInLane("Buy milk", 0).assertCardIndexInLane(0);
			cy.findCardByTitleInLane("Buy milk", 0).move({
				deltaX: 0,
				deltaY: 100,
				force: true,
			});
			cy.findCardByTitleInLane("Buy milk", 0).assertCardIndexInLane(1);

			cy.findCardByTitleInLane("Buy milk", 0).move({
				deltaX: 0,
				deltaY: -100,
				force: true,
			});
			cy.findCardByTitleInLane("Buy milk", 0).assertCardIndexInLane(0);

			cy.findCardByTitleInLane("Buy milk", 0).move({
				deltaX: 0,
				deltaY: 150,
				force: true,
			});
			cy.findCardByTitleInLane("Buy milk", 0).assertCardIndexInLane(2);

			cy.findCardByTitleInLane("Buy milk", 0).move({
				deltaX: 0,
				deltaY: 100,
				force: true,
			});
			cy.findCardByTitleInLane("Buy milk", 0).assertCardIndexInLane(3);
		});
	});
});
