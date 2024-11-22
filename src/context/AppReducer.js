export default (state, action) => {
    switch (action.type){
        case "ADD_MOVIE_TO_BOOKMARK":
            return {
                ...state,
                bookmark: [action.payload, ...state.bookmark]
            }
        case 'REMOVE_M0VIE_FROM_BOOKMARK':
            return{
                ...state,
                bookmark: state.bookmark.filter(
                    (bookmark) =>
                        bookmark.id !== action.payload.id
                )
            }
        case 'TOOGLE_THEME':
            return{
                ...state,
                darkTheme: !state.darkTheme
            }
        case 'SET_PAGE':
            return{
                ...state, page: action.payload
            };
        case "SET_GENRE":
            return{
                ...state, selectedGenre: action.payload
            }
        default:
            return state
    }
}