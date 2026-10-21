/** Fields actually used from the public GitHub repository search response. */
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface RepositorySearchResults {
  items: Repository[];
  totalCount: number;
}
