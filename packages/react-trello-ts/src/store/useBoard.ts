import { useContext } from "react";
import { useStore } from "zustand";
import { BoardContext } from "../controllers/Board";

export const useBoard = () => {
	const store = useContext(BoardContext);
	return useStore(store);
};
