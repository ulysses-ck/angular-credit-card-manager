import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/CreditCard';
import { CardService } from 'src/app/services/card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-list-card',
	templateUrl: './list-card.component.html',
	styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent implements OnInit {
	listCards: CreditCard[] = [];

	constructor(
		private _cardService: CardService,
		private _toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.getCards();
	}

	getCards() {
		this._cardService.getCards().subscribe((doc) => {
			this.listCards = [];
			doc.forEach((el: any) => {
				this.listCards.push(el);
			});
		});
	}

	deleteCard(card: CreditCard) {
		return this._cardService.deleteCard(card).then(
			(data) => {
				this._toastrService.error(
					`The card from ${card.owner} was deleted succesfully`,
					'Card deleted'
				);
			},
			(error) => {
				this._toastrService.error(
					'An unexpected error occurred',
					'Error'
				);

				console.log(error);
			}
		);
	}

	editCard(card: CreditCard) {
		this._cardService.addCardEdit(card);
	}
}
