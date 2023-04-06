interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}
export interface IRecording {
  id: number;
  date: string;
  time: string;
}

export interface ISimpleVideo {
  id: number;
  title: string;
  url: string;
}

export interface IChannel {
  id: number;
  name: string;
  handle: string;
}

export interface IVideo extends ISimpleVideo {
  channel: IChannel;
}

export interface ITrending {
  rank: number;
  video: ISimpleVideo;
  views: number;
  record: IRecording;
}

export interface IPrevAndNextRecording extends IRecording {
  prev_record: IRecording | null;
  next_record: IRecording | null;
}

export interface IChannelWithLatestVideo extends IChannel {
  latest_video: ISimpleVideo;
}

export interface IPrevTrending {
  views: number;
  rank: number;
}
export interface ITrendingWithPrev extends ITrending {
  video: IVideo;
  prev_trend: IPrevTrending | null;
}
export interface ITrendingWithPagination extends Pagination {
  results: ITrendingWithPrev[];
}

export interface IVideoWithRecords {
  channel: IChannel;
  records: string[];
  title: string;
  url: string;
}

export interface IVideoWithRecordAt extends ISimpleVideo {
  record_at: string;
}

export interface IChannelVideoWithPagination extends Pagination {
  results: IVideoWithRecordAt[];
}
