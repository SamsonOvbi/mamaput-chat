
interface Review {
  username: string;
  comment: string;
  rating: number;
  upVotes: number;
  downVotes: number;
}

export interface BlogData {
  title: string;
  description: string;
  content: string;
  category: string;
  image: any;
  // user: string; // Assuming user is the ObjectId in string format
  status: 'draft' | 'published';
  visibility: 'public' | 'private';
  // createdAt: Date;
  // updatedAt: Date;
  numReviews: number;
  // reviews: Review[];
  numViews: number;
}
