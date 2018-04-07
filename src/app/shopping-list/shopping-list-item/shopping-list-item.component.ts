import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from '../../shopping-list.service';
import { log } from 'util';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css']
})
export class ShoppingListItemComponent implements OnInit {

  @Input("shoppingItem") private listItem: any;
  private deleted: boolean = false;

  constructor(
    private myShoppingListService: ShoppingListService
  ) { }

  ngOnInit() {
    console.log(this.listItem);

  }

  public removeItem() {
    this.myShoppingListService.remove(this.listItem);
  }

  public editItem() {
    let itemEdited = {
      key: this.listItem.key,
      name: this.listItem.name,
      disabled: true
    };

    this.myShoppingListService.edit(itemEdited);
  }

}
