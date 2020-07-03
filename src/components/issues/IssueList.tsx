import React from 'react';
import { Issue } from 'interfaces/gitHubIssue';

interface Props {
  issues: Issue[]
}
const IssueList = ({issues} :Props) => {
  return (
    <ul>
      Issue List 
      {
        issues.map( item => {
          return <li>{item.title}</li>
        })
      }
    </ul>
  );
};

export default IssueList;