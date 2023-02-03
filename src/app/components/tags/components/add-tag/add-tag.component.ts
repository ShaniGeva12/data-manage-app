import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { TagsService } from '../../services/tags.service';
import { AddTagRequest, Tag } from '../../model/tag.model';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent {
  @Input() tag: Tag | undefined;

  tagForm!: FormGroup;

  subs: SubSink = new SubSink();

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  constructor(
    private tagsService: TagsService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.tagForm = this.fb.group({
      name: [ null,
        Validators.required
      ],
      color: [ null,
        Validators.required
      ],
      description: [ null,
        Validators.required
      ],
      createdBy:  [ null,
        Validators.required
      ],
      createDate:  [ null ],
      lastUpdate:  [ null ]
    });
  }

  onSubmit() {
    this.tagForm.controls['lastUpdate'].setValue(new Date());
    if(!this.tag) {
      this.tagForm.controls['createDate'].setValue(new Date());
    }
    //console.log(this.tagForm.value);
    this.tagsService.addTag(<AddTagRequest>this.tagForm.value);

    //TODO: loading and then closing the drawer if success, else show error msg
  }
}
