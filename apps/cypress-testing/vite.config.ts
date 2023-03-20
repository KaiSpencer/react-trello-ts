import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	resolve:{
		alias: {
			"@": "../../node_modules/react-trello-ts/src"
		}
	}
});
