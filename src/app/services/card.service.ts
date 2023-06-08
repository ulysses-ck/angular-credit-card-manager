import { Injectable } from '@angular/core';
import {
	Firestore,
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	updateDoc,
	doc,
} from '@angular/fire/firestore';
import { CreditCard } from '../models/CreditCard';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CardService {
	private card$ = new Subject<any>();

	constructor(private firestore: Firestore) {}

	saveCard(card: CreditCard) {
		const cardRef = collection(this.firestore, 'cards');

		return addDoc(cardRef, card);
	}

	getCards(): Observable<CreditCard[]> {
		const cardRef = collection(this.firestore, 'cards');
		return collectionData(cardRef, { idField: 'id' }) as Observable<
			CreditCard[]
		>;
	}

	deleteCard(card: CreditCard) {
		const cardRefDoc = doc(this.firestore, `cards/${card.id}`);
		return deleteDoc(cardRefDoc);
	}

	updateCard(
		id: string,
		{ cardNumber, cvv, dateOfExpire, dateUpdate, owner }: CreditCard
	) {
		const cardRef = doc(this.firestore, `cards/${id}`);
		return updateDoc(cardRef, {
			cardNumber,
			cvv,
			dateOfExpire,
			dateUpdate,
			owner,
		});
	}

	addCardEdit(card: CreditCard) {
		this.card$.next(card);
	}

	getTarjetaEdit(): Observable<CreditCard> {
		return this.card$.asObservable();
	}
}
