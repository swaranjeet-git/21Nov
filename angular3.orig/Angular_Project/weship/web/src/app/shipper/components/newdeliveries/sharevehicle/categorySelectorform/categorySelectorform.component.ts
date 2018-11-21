import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { Output,  EventEmitter } from '@angular/core';
import { HostConfig } from '../../../../../services/host-config';

@Component({
  selector: 'app-categorySelectorform',
  templateUrl: './categorySelectorform.component.html',
  styleUrls: ['./categorySelectorform.component.css']
})
export class CategorySelectorformComponent implements OnInit {

  @Output('select')
  catEvent = new EventEmitter();
  categories;
  parentId = 0;
  category: Category = new Category();
  clicked : [{ id: number, name: String }] =[ { id: 0, name: 'Home' }
  ];
  constructor(private _restService: RestService) { }

  ngOnInit() {
    if (this.parentId == 0) {
      this._restService.getRequest(`${HostConfig.hostUrl}/itemtype/parent/`).subscribe(res => {
        this.categories = res;
      })
    } else {
      this.loadChilds();
    }
  }

  showcategorynav(categoryclicked, index) {
    console.log(index);
    console.log(this.clicked.length);
    for (let i = this.clicked.length; i > index; i--) {
      this.clicked.pop();
    }
    this.showcategory(categoryclicked);
  }

  showcategory(categoryclicked) {
    this.parentId = categoryclicked.id;
    this.category.id = categoryclicked.id;
    this.category.name = categoryclicked.name;
    this.category.type = categoryclicked.type;
    this.clicked.push({ id: categoryclicked.id, name: categoryclicked.name });
    // let link = "<a rel='nofollow' routerLink='.'' (click)='showcategogy(category)'' >"+ categoryclicked.name+ "</a>"
    // this.clicked = link+`>`
    if (this.parentId == 0) {
      this._restService.getRequest(`${HostConfig.hostUrl}/itemtype/parent/`).subscribe(res => {
        this.categories = res;
      })
    } else {
      this.loadChilds();
    }
  }
  loadChilds() {
    this._restService.getRequest(`${HostConfig.hostUrl}/itemtype/parent/${this.parentId}`).subscribe(res => {
      this.categories = res;
      // console.log(res);
      
      // console.log(this.categories.length);
      if (this.categories.length == 0) {
        // console.log(this.parentId);
        this.catEvent.emit(this.category);
      }
    })
  }
}

export class Category {
  id : number;
  name : string;
  type : string
}