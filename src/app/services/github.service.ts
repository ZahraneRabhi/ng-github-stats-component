import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch user data from GitHub API
   * @param username - GitHub username
   * @returns Observable containing user data
   * @see https://docs.github.com/en/rest/users/users#get-a-user
   */
  getUserData(username: string): Observable<any> {
    return this.http.get<any>(`https://api.github.com/users/${username}`).pipe(
      tap(response => {
        console.log("Userdata retrieval Response: ", response);
      })
    );
  }

  /**
   * Fetch user repositories from GitHub API
   * @param username - GitHub username
   * @returns Observable containing list of repositories
   * @see https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
   */
  getUserRepos(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}/repos`).pipe(
      tap(response => {
        console.log("Repositories retrieval Response: ", response)
      })
    );
  }  

  /**
   * Fetch commits for a specific repository from GitHub API
   * @param reponame - Repository name
   * @param username - GitHub username
   * @returns Observable containing list of commits
   * @see https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28
   */
  getRepoCommits(reponame: string, username: string): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${username}/${reponame}/commits`).pipe(
      tap(response => {
        console.log("Commits Data Retrieval Response: ", response);
      })
    );
  }
  
  /**
   * Fetch stargazers for a specific repository from GitHub API
   * @param repoName - Repository name
   * @param username - GitHub username
   * @returns Observable containing list of stargazers
   * @see https://docs.github.com/en/rest/activity/starring?apiVersion=2022-11-28
   */
  getRepoStars(repoName: string, username: string): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${username}/${repoName}/stargazers`).pipe(
      tap(response => {
        console.log("Stars Data Retrieval Response: ", response);
      })
    );
  }

  /**
   * Fetch pull requests for a specific repository from GitHub API
   * @param repoName - Repository name
   * @param username - GitHub username
   * @returns Observable containing list of pull requests
   * @see https://docs.github.com/en/rest/pulls/pulls#list-pull-requests
   */
  getRepoPulls(repoName: string, username: string): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${username}/${repoName}/pulls`).pipe(
      tap(response => {
        console.log("Pull Requests Retrieval Response", response);
      })
    );
  }
}
