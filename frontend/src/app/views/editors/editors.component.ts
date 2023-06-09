import {Component, Input, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {Editor} from "../../models/Editor";
import {EditorsService} from "../../services/EditorsService";

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css', "../../../styles.css"],
  animations: [
    trigger('editorsAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({opacity: 0}),
          stagger(220, [animate('1s', style({opacity: 1}))])
        ], {optional: true})
      ])
    ])
  ]
})
export class EditorsComponent implements OnInit {
  @Input() editors: Editor[] = [];
  loading: boolean = true;

  constructor(private editorService: EditorsService) { }

  async submit(term: any) {
    this.loading = true;
    await this.editorService.findByName(term).subscribe(editors => {
      this.editors = editors;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.editorService.findAll().subscribe(editors => {
      this.editors = editors;
      this.loading = false;
    });
  }
}
