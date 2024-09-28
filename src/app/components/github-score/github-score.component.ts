import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { GithubService } from './../../services/github.service';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-github-score',
  templateUrl: './github-score.component.html',
  styleUrls: ['./github-score.component.css']
})
export class GithubScoreComponent implements OnInit {
  username: string = '';
  nameInput: string = '';

  user: User = { name: '', location: '', avatar: '', accountUrl: '' };
  repositories: Repository[] = [];
  commits: any = [];
  totalStars: number = 0;  
  totalPullRequests = 0;  

  constructor(private githubService: GithubService) {}
  
  readUsername() {
    this.username = this.nameInput; 
    if (this.username) {
      this.initializeUserData();
    }
  }

  redirectToProfile(githubProfileUrl: string) {
    window.location.href = githubProfileUrl;
  }
  
  getUserData(username: string) {
    const storedUser = localStorage.getItem('user-data');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.githubService.getUserData(username).subscribe({
        next: (data) => { 
          this.user.name = data.login;
          this.user.avatar = data.avatar_url;
          this.user.location = data.location;
          localStorage.setItem('user-data', JSON.stringify(this.user));
        }
      });
    }
  }

  getUserRepos(username: string) {
    const storedRepos = localStorage.getItem('repositories');
    if (storedRepos) {
      this.repositories = JSON.parse(storedRepos);
      this.getTotalCommits(this.username);
      this.getTotalStars(); 
    } else {
      this.githubService.getUserRepos(username).subscribe({
        next: (data) => {
          this.repositories = data;
          localStorage.setItem('repositories', JSON.stringify(this.repositories));
          this.getTotalCommits(this.username);
          this.getTotalStars(); 
        }
      });
    }
  }

  getTotalCommits(username: string) {
    this.commits = []; 
    if (this.repositories) {
      this.repositories.forEach((repo: any) => {
        this.githubService.getRepoCommits(repo.name, username).subscribe((data: any) => {
          this.commits = [...this.commits, ...data];
        });
      });
    }
  }

  getTotalStars() {
    this.totalStars = 0;  
    if (this.repositories) {
      this.repositories.forEach((repo: any) => {
        this.totalStars += repo.stargazers_count || 0;
      });
    }
  }

  getTotalPullRequests(username: string) {
    this.totalPullRequests = 0;
    if (this.repositories) {
      this.repositories.forEach((repo: any) => {
        this.githubService.getRepoPulls(repo.name, username).subscribe((data: any) => {
          this.totalPullRequests += data.length; 
        });
      });
    }
  }

  initializeUserData() {
    this.getUserData(this.username);
    this.getUserRepos(this.username);
  }
  *
/**
  * attributes kept incrementing on each initialisation such as the commits number.
  * The solution is to use ngOnInit that resets all component attribute on initialisation.
*/
  ngOnInit() {
    this.user = { name: '', location: '', avatar: '', accountUrl: '' };
    this.repositories = [];
    this.commits = [];
    this.totalStars = 0;
    this.totalPullRequests = 0;

    // localStorage.clear();
    const data = localStorage.getItem('user-data');
    if (data != null) {
      console.log(JSON.parse(data));
    }
  }
}
