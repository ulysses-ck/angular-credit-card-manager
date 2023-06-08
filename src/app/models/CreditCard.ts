export class CreditCard {
	id?: string;
	owner: string;
	cardNumber: string;
	dateOfExpire: string;
	cvv: number;
	dateCreated: Date;
	dateUpdate: Date;

	constructor(
		owner: string,
		cardNumber: string,
		dateOfExpire: string,
		cvv: number
	) {
		this.owner = owner;
		this.cardNumber = cardNumber;
		this.dateOfExpire = dateOfExpire;
		this.cvv = cvv;
		this.dateCreated = new Date();
		this.dateUpdate = new Date();
	}
}
