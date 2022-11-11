export type BlinkNode = {
  id: number;
  name: string;
  address: string;
  symbol: string;
  image_url?: string;
};

export type BlinkLinks = {
  source: number;
  target: number;
}

export type Blink = {
  nodes: BlinkNode[];
  links: BlinkLinks[];
};
