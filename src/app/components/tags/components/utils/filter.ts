import { Tag } from "../../model/tag.model";

export class Filter {
  lastFilter = '';
  length = 0;

  public getTags(value: string, tagsOriginList: Tag[]): Tag[] {
    const filterValue = value.toLowerCase();
    this.lastFilter = filterValue;
    this.length = tagsOriginList.length;
    if (filterValue) {
      const filtered = tagsOriginList.filter((tag: Tag) => {
        return (tag.name.toLowerCase().indexOf(filterValue) >= 0 || tag.description.toLowerCase().indexOf(filterValue) >= 0);
      });
      if (!filtered || filtered.length == 0) {
        this.lastFilter = '';
      }
      this.length = filtered.length;
      return filtered;
    }
    return tagsOriginList;
  }
}
