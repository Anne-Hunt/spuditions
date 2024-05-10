import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"


class SearchService{
	searchTerms(searchQuery) {
		AppState.searchTerm = searchQuery
        logger.log(AppState.searchTerm)
	}

	clearSearch() {
		AppState.searchTerm = ''
        AppState.parks = []
        AppState.posts = []
        AppState.profiles = []
        AppState.threads = []
	}


}

export const searchService = new SearchService()