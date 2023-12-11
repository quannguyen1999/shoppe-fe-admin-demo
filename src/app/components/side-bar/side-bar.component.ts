import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { listMenus } from '../../constants/menu-value-model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  
  listMenus: Array<Menu> = listMenus;

  @Input() currentTabMenu!: boolean;

  isHoverTabMenu!: boolean;

  onHoverMenuEnter(){
    this.isHoverTabMenu = true;
  }

  onHoverMenuLeave(){
    this.isHoverTabMenu = false;
  }

  onClickMenu(menuId: number){
    listMenus.forEach(value => value.isSelected = false)
    listMenus.find(t => t.id === menuId)!.isSelected = true;
  }
}
