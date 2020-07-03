import React, {useEffect} from 'react';
import * as api from 'api/gitHubAPI'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchIssues } from 'store/issuesSlice'
import IssueList from 'components/issues/IssueList';
const GitHubPage = () => {
  const dispatch = useDispatch();
  const { isLoading, issues, currentPageIssues, issuesByNumber , pageCount} = useSelector( (state:RootState) => state.issues )
  console.log('pageCount: ', currentPageIssues);
  // const issues = currentPageIssues.map(
  
  //   issueNumber => issuesByNumber[issueNumber]
  // )

  useEffect(()=>{
    dispatch(fetchIssues('reactjs', 'reactjs.org', 1));
    console.log(' start visual studio code ')
    // api.getIsseus('rails', 'rails', 1);
  },[])
  const renderList = isLoading? (
    <h3>Loading...</h3>
  ) : (
    <div><IssueList issues={issues}/></div>
  )
  return (
    <div>
      <h1>Github Issues </h1>
      {
        renderList
      }
    </div>
  );
};

export default GitHubPage;
