export type BlinkNode = {
  id: number;
  name: string;
  address: string;
  symbol: string;
  meta: BlinkMeta;
  image_url?: string | null;
  links?: BlinkLinks[];
  main?: boolean;
};

export type BlinkLinks = {
  source: number;
  target: number;
};

export type Blink = {
  nodes: BlinkNode[];
  links: BlinkLinks[];
};

export type BlinkMeta = {
  discord_url?: string;
  opensea_url?: string;
  twitter_url?: string;
  external_url?: string;
  etherscan_url?: string;
};
