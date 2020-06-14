export class Post {
  // photo: string;
  loveIts: number;
  created_at: string;

  constructor(public title: string, public content: string) {
    this.loveIts = 0;
    this.created_at = new Date().toDateString();
  }
}
