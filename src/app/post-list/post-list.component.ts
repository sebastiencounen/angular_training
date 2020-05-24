import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => (this.posts = posts)
    );

    // this.postsService.getPosts();
    this.postsService.emitPosts();
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  getPostColor(id: number) {
    if (this.posts[id].loveIts > 0) {
      return 'green';
    } else if (this.posts[id].loveIts < 0) {
      return 'red';
    }
  }

  onLikePost(id: number) {
    this.posts[id].loveIts++;
  }

  onDislikePost(id: number) {
    this.posts[id].loveIts--;
  }

  onViewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }
}
