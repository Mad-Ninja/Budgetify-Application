import { Pipe, PipeTransform } from '@angular/core';
import { ITransaction } from '../models/transactions';
@Pipe({
  name: 'searchTransaction',
})
export class SearchTransactionPipe implements PipeTransform {
  transform(array: ITransaction[], search: string = ''): ITransaction[] {
    if (!search.trim()) {
      return array;
    }
    return array.filter((transaction) => {
      return (
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category[0].toLowerCase().includes(search.toLowerCase()) ||
        transaction.type.toLowerCase().includes(search.toLowerCase()) ||
        transaction.payee.toLowerCase().includes(search.toLowerCase()) ||
        transaction.amount.toString().toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
