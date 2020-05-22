import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blog-final';

  constructor() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: 'AIzaSyAcQAXLxvon04wdUnCNQHkjkQGEnXFpRJk',
      authDomain: 'blog-92d59.firebaseapp.com',
      databaseURL: 'https://blog-92d59.firebaseio.com',
      projectId: 'blog-92d59',
      storageBucket: 'blog-92d59.appspot.com',
      messagingSenderId: '886846304683',
      appId: '1:886846304683:web:344f4832e0a014d148a2ee',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
