import React from "react";

import * as DefaultComponents from "./components";
import {
	BoardContainer,
	BoardContainerProps,
} from "./controllers/BoardContainer";
import { Lane } from "./controllers/Lane";
import Container from "./dnd/Container";
import { Draggable } from "./dnd/Draggable";
import deprecationWarnings from "./helpers/deprecationWarnings";
import locales from "./locales";

export * from "./widgets";

import { Board } from "./controllers/Board";
import createTranslate from "./helpers/createTranslate";

export { Draggable, Container, BoardContainer, Lane, createTranslate, locales };

export { DefaultComponents as components };

const DEFAULT_LANG = "en";

export default ({
	components,
	lang = DEFAULT_LANG,
	...otherProps
}: BoardContainerProps & {
	lang?: keyof typeof locales;
}) => {
	deprecationWarnings(otherProps);

	const translate = createTranslate(locales[lang || "en"].translation);
	return (
		<Board
			t={translate}
			components={{ ...DefaultComponents, ...components }}
			{...otherProps}
		/>
	);
};
