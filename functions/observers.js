import { BehaviorSubject, Subject } from "rxjs";

const AccountTradeModalObserver = new BehaviorSubject({
  isOpen: false,
  selectedToken: undefined,
});

const AccountDepositModalObserver = new BehaviorSubject({
  isOpen: false,
  selectedToken: undefined,
});

const AccountWithdrawModalObserver = new BehaviorSubject({
  isOpen: false,
  selectedToken: undefined,
});

const RecentTransactionsModalObserver = new Subject({
  isOpen: false,
});

const ChangeAccountTradeModalState = (newData) =>
  AccountTradeModalObserver.next(newData);

const ChangeAccountDepositModalState = (newData) =>
  AccountDepositModalObserver.next(newData);

const ChangeAccountWithdrawModalState = (newData) => {
  AccountWithdrawModalObserver.next(newData);
};

const ChangeTransactionsModalState = (newData) =>
  RecentTransactionsModalObserver.next(newData);

export {
  AccountTradeModalObserver,
  RecentTransactionsModalObserver,
  AccountDepositModalObserver,
  AccountWithdrawModalObserver,
  ChangeAccountTradeModalState,
  ChangeTransactionsModalState,
  ChangeAccountDepositModalState,
  ChangeAccountWithdrawModalState,
};
