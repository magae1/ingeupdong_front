export interface ICalendar {
  day: string;
  value: number;
}
interface IPagination {
  count: number;
  next: string | null;
  previous: string | null;
}
export interface IRecording {
  id: number;
  record_at: string;
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
  created_at: string;
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
export interface ITrendingWithPagination extends IPagination {
  results: ITrendingWithPrev[];
}

export interface IVideoWithRecords {
  channel: IChannel;
  records: string[];
  title: string;
  url: string;
}

export interface IVideoWithRecordAt extends ISimpleVideo {
  initial_record: string;
}

export interface IChannelVideoWithPagination extends IPagination {
  results: IVideoWithRecordAt[];
}

export interface TrendForGraph {
  day: string;
  rank: number;
  views: number;
}

export interface ITotalCountWithCalendars {
  total_count: number;
  recent_records: ICalendar[];
  start_date: string;
  end_date: string;
}

export interface IScoreWithChannel {
  score: number;
  channel: IChannel;
}
