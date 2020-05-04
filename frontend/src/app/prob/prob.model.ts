// data structure model using when passing data between components.

export interface Prob {
  _id: string;
  title: string;
  desc: string;
  starter: string;
  tester: string;
  submit: string;
  tags: string[];
  likes: number;
  hates: number;
}
