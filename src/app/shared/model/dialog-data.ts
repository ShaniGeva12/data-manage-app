import { TemplateRef } from "@angular/core";

export interface DialogData {
  title: string,
  content?: TemplateRef<any>,
  contentMsg: string,
}
