import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ContentState {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

const initialState: ContentState = {
  albumId: 1,
  id: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952"
}

export const getContentData = createSlice({
  name: 'content',
  initialState,
  reducers: {
    getContent: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return state
    }
  },
})

// Action creators are generated for each case reducer function
export const { getContent } = getContentData.actions

export default getContentData.reducer