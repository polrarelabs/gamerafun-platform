import { TabItem } from "@components/shared/Tab";

export interface BlogProps {
  content: string;
}

export interface NavBlogProps {
  data: TabItem[];
  handleClick: (id: string) => void;
}
