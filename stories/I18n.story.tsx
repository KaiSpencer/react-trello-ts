import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { I18nextProvider, useTranslation } from "react-i18next";

import Board from "../src";
import createTranslate from "../src/helpers/createTranslate";

import smallData from "./data/data-sort.json";
import i18n from "./helpers/i18n";
Board.displayName = "Board";

const I18nBoard = () => {
	const { t } = useTranslation();
	return (
		<div>
			<div>
				<button onClick={() => i18n.changeLanguage("en")}>English</button>
				<button onClick={() => i18n.changeLanguage("ru")}>Русский</button>
			</div>
			<Board
				data={smallData}
				t={t}
				editable={true}
				canAddLanes={true}
				draggable={true}
			/>
		</div>
	);
};

export default ({
	title: "I18n",
	component: Board,
} satisfies Meta<typeof Board>);
type Story = StoryObj<typeof Board>;
export const CustomTexts: Story = {
	name: "Custom texts",
	render: (args) => {
		const TEXTS = {
			"Add another lane": "NEW LANE",
			"Click to add card": "Click to add card",
			"Delete lane": "Delete lane",
			"Lane actions": "Lane actions",
			button: {
				"Add lane": "Add lane",
				"Add card": "Add card",
				Cancel: "Cancel",
			},
			placeholder: {
				title: "title",
				description: "description",
				label: "label",
			},
		};

		const customTranslation = createTranslate(TEXTS);
		return (
			<Board
				data={smallData}
				t={customTranslation}
				editable={true}
				canAddLanes={true}
				draggable={true}
			/>
		);
	},
};

export const FlatTranslationTable: Story = {
	name: "Flat translation table",
	render: (args) => {
		const FLAT_TRANSLATION_TABLE = {
			"Add another lane": "+ Weitere Liste erstellen",
			"Click to add card": "Klicken zum Erstellen einer Karte",
			"Delete lane": "Liste löschen",
			"Lane actions": "Listenaktionen",
			"button.Add lane": "Liste hinzufügen",
			"button.Add card": "Karte hinzufügen",
			"button.Cancel": "Abbrechen",
			"placeholder.title": "Titel",
			"placeholder.description": "Beschreibung",
			"placeholder.label": "Label",
		};

		return (
			<Board
				data={smallData}
				t={(key) => FLAT_TRANSLATION_TABLE[key]}
				editable={true}
				canAddLanes={true}
				draggable={true}
			/>
		);
	},
};

export const UsingI18next: Story = {
	name: "Using i18next",
	render: (args) => {
		return (
			<I18nextProvider i18n={i18n}>
				<I18nBoard />
			</I18nextProvider>
		);
	},
};
