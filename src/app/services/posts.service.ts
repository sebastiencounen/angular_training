import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [
    new Post(
      'Post de test',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis recusandae libero saepe esse? Consectetur possimus saepe culpa ad! Dolorum, hic.'
    ),
  ];
  postsSubject = new Subject<Post[]>();

  constructor() {}

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  // Sauvegarde dans base de données firebase
  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  // Aller chercher les livres dans le base de données firebase
  // Le 'on' fait que chaque fois qu'une modification sera effectué sur la valeur ('value')
  // l'opération sera ré itérée --> maj en temps réel
  getPosts() {
    firebase
      .database()
      .ref('/books')
      .on('value', (data: firebase.database.DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      });
  }

  // Aller chercher un livre unique dans la base de données firebase
  // Retourne une promesse --> asynchrone
  getSinglePost(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/posts/' + id)
        .once('value')
        .then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  // Création nouveau post
  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  // Suppression d'un post
  removePost(post: Post) {
    // Aller chercher l'id du post à supprimer
    const idPostToRemove = this.posts.findIndex((postEl) => {
      if (postEl === post) {
        return true;
      }
    });

    // Suppression puis sauvegarde et émission
    this.posts.splice(idPostToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }
}
