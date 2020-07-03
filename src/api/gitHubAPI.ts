import { Issue } from 'interfaces/gitHubIssue';
import axios from 'axios';
import parseLink, { Links } from 'parse-link-header'

export interface IssuesResult {
  pageLinks: Links | null
  pageCount: number
  issues: Issue[]
}

export async function getIsseus(
  org: string, 
  repo: string, 
  page = 1
) : Promise<IssuesResult> {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;
  try {
    const response = await axios.get<Issue[]>(url);
    let pageCount = 0;
    const pageLinks = parseLink(response.headers.link);

    if ( pageLinks !==null) {
      pageCount = getPageCount(pageLinks);
    }
    return {
      pageLinks, 
      pageCount, 
      issues: response.data
    }
  } catch(error) {
    console.error(error);
    throw error;
  }
}

const isLastPage = (pageLinks: Links) => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  )
}
const getPageCount = (pageLinks : Links) => {
  if(!pageLinks)
    return 0;
  if(isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10)
  } else {
    return 0
  }
}