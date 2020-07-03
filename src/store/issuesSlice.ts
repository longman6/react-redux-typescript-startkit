import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'
import { Issue  } from 'interfaces/gitHubIssue';
import { getIsseus } from 'api/gitHubAPI';

import { ThunkAction } from 'redux-thunk';
import {  Action } from 'redux';

import { AppThunk, RootState } from 'store';

interface IssuesState {
  issuesByNumber : Record<number, Issue>
  currentPageIssues: number[]
  pageCount: number
  pageLinks: Links | null, 
  isLoading : boolean, 
  error: string | null, 
  issues : Issue[]
}
export interface IssuesResult {
  pageLinks: Links | null
  pageCount: number
  issues: Issue[]
}

const initialState:IssuesState = {
  issuesByNumber: {}, 
  currentPageIssues: [],
  pageCount : 0, 
  pageLinks : {}, 
  isLoading: false, 
  error: null, 
  issues: [] 
}

const issuesSlicer = createSlice({
  name: 'issues', 
  initialState, 
  reducers: {
    getIssueStart: ( state ) => {
      state.isLoading = true; 
    }, 
    getIssuesSuccess: ( state, action : PayloadAction<IssuesResult>) =>{
      const { pageCount, issues, pageLinks } = action.payload;
      state.pageCount = pageCount; 
      state.pageLinks = pageLinks;
      state.isLoading = false;
      state.error = null; 
      // console.log(issues);
      issues.forEach( issue => {
        state.issuesByNumber[issue.number] = issue; 
      });

      issues.forEach ( issue => {
        state.issues.push(issue)
      })
      state.currentPageIssues = issues.map( issue => issue.number )
    }, 
    getIssuesFailure : ( state, action : PayloadAction<string> ) => {
      state.isLoading = false; 
      state.error = action.payload; 
    }
  }
});

export const  { getIssueStart, 
  getIssuesSuccess, 
  getIssuesFailure 
} = issuesSlicer.actions;

export default issuesSlicer.reducer; 


export const fetchIssues  =(
  org: string, 
  repo: string, 
  page?: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try{
    dispatch(getIssueStart);
    const issues = await getIsseus(org, repo, page );
    dispatch(getIssuesSuccess(issues));
  } catch(error) {
    dispatch(getIssuesFailure(error.toString()))
  }
}

// export const fetchIssues  =(
//   org: string, 
//   repo: string, 
//   page?: number
// ): AppThunk => async dispatch => {
//   try{
//     dispatch(getIssueStart);
//     const issues = await getIsseus(org, repo, page );
//     dispatch(getIssuesSuccess(issues));
//   } catch(error) {
//     dispatch(getIssuesFailure(error.toString()))
//   }
// }