import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { TagsService } from '../../services/tags.service';
import { AddTagRequest, Tag } from '../../model/tag.model';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTagComponent {
  @Input() tag: Tag | undefined;
  @Output() submitSuccess = new EventEmitter<boolean>();

  tagForm!: FormGroup;

  subs: SubSink = new SubSink();

  constructor(
    private tagsService: TagsService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.setForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

    this.checkTagToEdit();
  }

  checkTagToEdit() : void {
    if(this.tag) {
      this.tagForm.controls['name'].setValue(this.tag.name);
      this.tagForm.controls['color'].setValue(this.tag.color);
      this.tagForm.controls['description'].setValue(this.tag.description);
      this.tagForm.controls['createdBy'].setValue(this.tag.createdBy);
      this.tagForm.controls['createdBy'].disable();
      this.tagForm.controls['createDate'].setValue(this.tag.createDate);
      this.tagForm.controls['lastUpdate'].setValue(this.tag.lastUpdate);
    } else {
      this.tagForm.controls['createdBy'].enable();
      this.tagForm.reset();
    }
  }

  onSubmit() {
    this.tagForm.controls['lastUpdate'].setValue(new Date());

    if(!this.tag) {
      this.tagForm.controls['createDate'].setValue(new Date());
      this.subs.sink = this.tagsService.addTag(<AddTagRequest>this.tagForm.value).subscribe({
        next: () => { this.submitSuccess.emit(true) },
      });
    } else {
      let newTag : Tag = {...this.tag, ...this.tagForm.value}
      this.subs.sink = this.tagsService.updateTag(newTag).subscribe({
        next: () => { this.submitSuccess.emit(true) },
      });
    }
  }
}
