export interface articles {
  title: string;
  description: string | null;
  source: string;
  image: string | null;
  url: string | null;
}

export interface NewsResponse {
  category: string;
  articles: articles[];
}