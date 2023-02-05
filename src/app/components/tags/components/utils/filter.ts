import { Tag } from "../../model/tag.model";

export class Filter {
  lastFilter = '';

  public getTags(value: string, tagsOriginList: Tag[]): Tag[] {
    const filterValue = value.toLowerCase();
    this.lastFilter = filterValue;
    if (filterValue) {
      const filtered = tagsOriginList.filter((tag: Tag) => {
        return (tag.name.toLowerCase().indexOf(filterValue) >= 0 || tag.description.toLowerCase().indexOf(filterValue) >= 0);
      });
      if (!filtered || filtered.length == 0) {
        this.lastFilter = '';
      }
      return filtered;
    }
    return tagsOriginList;
  }
}
