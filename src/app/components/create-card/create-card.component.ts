import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/models/CreditCard';
import { CardService } from 'src/app/services/card.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-create-card',
	templateUrl: './create-card.component.html',
	styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
	form: FormGroup;
	loading = false;
	titulo = 'Add Card';
	id: string | undefined;

	constructor(
		private fb: FormBuilder,
		private _cardService: CardService,
		private toastr: ToastrService
	) {
		this.form = this.fb.group({
			owner: ['', Validators.required],
			cardNumber: [
				'',
				[
					Validators.required,
					Validators.minLength(16),
					Validators.maxLength(16),
				],
			],
			dateOfExpire: [
				'',
				[
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(5),
				],
			],
			cvv: [
				'',
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(3),
				],
			],
		});
	}

	ngOnInit() {
		this._cardService.getTarjetaEdit().subscribe((data) => {
			this.id = data.id;
			this.titulo = 'Edit Card';
			this.form.patchValue({
				owner: data.owner,
				cvv: data.cvv,
				cardNumber: data.cardNumber,
				dateOfExpire: data.dateOfExpire,
			});
		});
	}

	saveCard() {
		if (this.id === undefined) {
			this.createCard();
		} else {
			this.editCard(this.id);
		}
	}

	editCard(id: string) {
		const TARJETA: any = {
			owner: this.form.value.owner,
			cardNumber: this.form.value.cardNumber,
			dateOfExpire: this.form.value.dateOfExpire,
			cvv: this.form.value.cvv,
			dateUpdate: new Date(),
		};

		this.loading = true;
		this._cardService.updateCard(id, TARJETA).then(
			() => {
				this.loading = false;

				this.titulo = 'Add card';
				this.form.reset();
				this.id = undefined;
				this.toastr.info(
					'The card was updated succesfully',
					'Updated record'
				);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	createCard() {
		const TARJETA: CreditCard = {
			owner: this.form.value.owner,
			cardNumber: this.form.value.cardNumber,
			dateOfExpire: this.form.value.dateOfExpire,
			cvv: this.form.value.cvv,
			dateCreated: new Date(),
			dateUpdate: new Date(),
		};

		this.loading = true;
		this._cardService.saveCard(TARJETA).then(
			(data) => {
				this.loading = false;
				this.toastr.success(
					`The card from ${TARJETA.owner} was created successfully`,
					'Card created'
				);
				this.form.reset();
			},
			(error) => {
				this.loading = false;
				this.toastr.error('An unexpected error occurred', 'Error');
				console.log(error);
			}
		);
	}
}
