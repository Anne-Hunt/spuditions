import { AppState } from "../AppState.js"


class SearchService{
	clearSearch() {
		AppState.searchTerm = ''
        AppState.parks = []
        AppState.posts = []
        AppState.profiles = []
        AppState.threads = []
	}


}

export const searchService = new SearchService()