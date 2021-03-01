export interface CapFeed {
  rss: CapFeedRss;
}

export interface CapFeedRss {
  channel: CapFeedRssChannel;
}

export interface CapFeedRssChannel {
  title: string;
  link: string;
  description: string;
  lastBuildDate: Date;
  item: CapFeedRssChannelItem | CapFeedRssChannelItem[];
}

export interface CapFeedRssChannelItem {
  guid: string;
  link: string;
  author: string;
  category: string | string[];
  title: string;
  description: string;
  pubDate: Date;
}
