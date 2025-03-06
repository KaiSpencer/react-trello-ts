import create from "zustand";
import { BoardData, Card, Lane } from "../types/Board";

export interface State {
	data: BoardData;
	initializeLanes: (lanes: BoardData["lanes"]) => void;
	refreshBoard: (lanes?: Lane[]) => void;
	addCard: (card: Card, laneId: string, index?: number) => void;
	removeCard: (laneId: string, cardId: string) => void;
	moveCard: (
		fromLaneId: string,
		toLaneId: string,
		cardId: string,
		index: number,
	) => void;
	updateCards: (laneId: string, cards: Card[]) => void;
	updateCard: (laneId: string, card: Card) => void;
	updateLanes: (lanes: Lane[]) => void;
	updateLane: (lane: Partial<Lane>) => void;
	paginateLane: (laneId: string, newCards: Card[], nextPage: number) => void;
	moveLane: (fromIndex: number, toIndex: number) => void;
	removeLane: (laneId: string) => void;
	addLane: (lane: Lane) => void;
}
export const store = create<State>()((set) => {
	// Helper function to find a lane by ID and throw if not found
	const findLaneIndex = (state: State, laneId: string, errorMessage = "Lane not found") => {
		const laneIndex = state.data.lanes.findIndex((l) => l.id === laneId);
		if (laneIndex === -1) {
			throw new Error(errorMessage);
		}
		return laneIndex;
	};

	// Helper function to update a single lane
	const updateLaneById = (state: State, laneId: string, updates: Partial<Lane>) => {
		const laneIndex = findLaneIndex(state, laneId);
		const updatedLanes = [...state.data.lanes];
		updatedLanes[laneIndex] = { ...updatedLanes[laneIndex], ...updates };
		
		return { data: { ...state.data, lanes: updatedLanes } };
	};

	return {
		data: { lanes: [] },
		initializeLanes: (lanes: Lane[]) =>
			set((state) => ({
				data: {
					...state.data,
					lanes: lanes.map((lane) => ({
						...lane,
						currentPage: 1,
						cards: lane.cards?.map((c) => ({ ...c, laneId: lane.id })),
					})),
				},
			})),
		refreshBoard: (lanes = []) => set(() => ({ data: { lanes } })),
		addCard: (card, laneId, index) =>
			set((state) => {
				const laneIndex = findLaneIndex(state, laneId);
				const lane = state.data.lanes[laneIndex];
				
				let updatedCards;
				if (index === undefined) {
					updatedCards = [...lane.cards, card];
				} else {
					updatedCards = [...lane.cards];
					updatedCards[index] = card;
				}
				
				return updateLaneById(state, laneId, { cards: updatedCards });
			}),
		removeCard: (laneId, cardId) =>
			set((state) => {
				const laneIndex = findLaneIndex(state, laneId);
				const lane = state.data.lanes[laneIndex];
				const updatedCards = lane.cards.filter((c) => c.id !== cardId);
				
				return updateLaneById(state, laneId, { cards: updatedCards });
			}),
		moveCard: (fromLaneId, toLaneId, cardId, index) =>
			set((state) => {
				const fromLaneIndex = state.data.lanes.findIndex((l) => l.id === fromLaneId);
				if (fromLaneIndex === -1) {
					throw new Error("fromLane not found");
				}
				
				const toLaneIndex = state.data.lanes.findIndex((l) => l.id === toLaneId);
				if (toLaneIndex === -1) {
					throw new Error("toLane not found");
				}
				
				const fromLane = state.data.lanes[fromLaneIndex];
				const toLane = state.data.lanes[toLaneIndex];
				
				const cardIndex = fromLane.cards.findIndex((c) => c.id === cardId);
				if (cardIndex === -1) {
					return state;
				}
				
				const card = fromLane.cards[cardIndex];
				const newCard = { ...card, laneId: toLaneId };
				
				const updatedFromCards = fromLane.cards.filter((_, i) => i !== cardIndex);
				
				let updatedToCards;
				if (index !== undefined) {
					updatedToCards = [...toLane.cards];
					updatedToCards.splice(index, 0, newCard);
				} else {
					updatedToCards = [...toLane.cards, newCard];
				}
				
				const updatedLanes = [...state.data.lanes];
				updatedLanes[fromLaneIndex] = { ...fromLane, cards: updatedFromCards };
				updatedLanes[toLaneIndex] = { ...toLane, cards: updatedToCards };
				
				return { data: { ...state.data, lanes: updatedLanes } };
			}),
		updateCards: (laneId, cards) =>
			set((state) => updateLaneById(state, laneId, { cards })),
		updateCard: (laneId, card) =>
			set((state) => {
				const laneIndex = findLaneIndex(state, laneId);
				const lane = state.data.lanes[laneIndex];
				const cardIndex = lane.cards.findIndex((c) => c.id === card.id);
				
				if (cardIndex === -1) {
					return state;
				}
				
				const updatedCards = [...lane.cards];
				updatedCards[cardIndex] = card;
				
				return updateLaneById(state, laneId, { cards: updatedCards });
			}),
		updateLanes: (lanes) =>
			set((state) => ({
				data: { ...state.data, lanes },
			})),
		updateLane: (lane) =>
			set((state) => {
				if (!lane.id) return state;
				
				const laneIndex = state.data.lanes.findIndex((l) => l.id === lane.id);
				if (laneIndex === -1) {
					return state;
				}
				
				return updateLaneById(state, lane.id, lane);
			}),
		paginateLane: (laneId, newCards, nextPage) =>
			set((state) => {
				const updatedLanes = state.data.lanes.map((l) =>
					l.id === laneId
						? { ...l, cards: [...l.cards, ...newCards], currentPage: nextPage }
						: l
				);
				
				return { data: { ...state.data, lanes: updatedLanes } };
			}),
		moveLane: (fromIndex, toIndex) =>
			set((state) => {
				const updatedLanes = [...state.data.lanes];
				const [lane] = updatedLanes.splice(fromIndex, 1);
				updatedLanes.splice(toIndex, 0, lane);
				
				return { data: { ...state.data, lanes: updatedLanes } };
			}),
		removeLane: (laneId) =>
			set((state) => {
				const updatedLanes = state.data.lanes.filter((l) => l.id !== laneId);
				return { data: { ...state.data, lanes: updatedLanes } };
			}),
		addLane: (lane) =>
			set((state) => ({
				data: { ...state.data, lanes: [...state.data.lanes, lane] },
			})),
	};
});
