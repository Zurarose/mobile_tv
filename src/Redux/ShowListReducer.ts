const initialState = {
    list: []
}

type IInitialState = typeof initialState

const ShowListReducer = (state = initialState, action: any): IInitialState  => {

  return state
}

export default ShowListReducer;