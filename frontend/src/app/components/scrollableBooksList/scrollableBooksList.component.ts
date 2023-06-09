import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Book} from "../../models/Book";

@Component({
  selector: 'app-scrollableBooksList',
  templateUrl: './scrollableBooksList.component.html',
  styleUrls: ['./scrollableBooksList.component.css']
})
export class ScrollableBooksListComponent implements OnInit {
  @Input() books!: Book[];
  @ViewChild('list') list!: ElementRef;
  itemWidth: number = 150; // Largeur d'un élément de la liste
  visibleItems: number = 4; // Nombre d'éléments visibles à la fois dans la liste

  constructor() { }

  updateVisibleItems() {
    // Mettre à jour le nombre d'éléments visibles dans la liste en fonction de la largeur de la fenêtre
    const width = this.list.nativeElement.offsetWidth;
    this.visibleItems = Math.floor(width / this.itemWidth);
  }

  scrollLeft() {
    // Fait défiler la liste vers la gauche d'un certain nombre d'éléments
    this.list.nativeElement.scrollBy({
      left: -this.itemWidth * this.visibleItems,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.list.nativeElement.scrollBy({
      left: this.itemWidth * this.visibleItems,
      behavior: 'smooth'
    });
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.updateVisibleItems();
    });
    this.updateVisibleItems();
  }
}
