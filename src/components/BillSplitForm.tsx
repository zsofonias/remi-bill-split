import { ChangeEvent, FormEvent, useState } from 'react';
import { Friend } from '../interfaces/friend.interface';
import Button from './Button';

interface BillSplitFormProps {
  friend: Friend;
  onBillSplit: (oweAmount: number) => void;
}

function BillSplitForm({ friend, onBillSplit }: BillSplitFormProps) {
  const [billAmount, setBillAmount] = useState<number>(0);

  const [disableUserShareAmountInput, setDisableUserShareAmountInput] =
    useState(true);
  const [userShareAmount, setUserAmountShare] = useState<number | string>('');

  const [payingParty, setPayingParty] = useState<'user' | 'friend'>('user');

  const friendShareAmount = billAmount - Number(userShareAmount);

  function resetForm() {
    setBillAmount(0);
    setDisableUserShareAmountInput(true);
    setUserAmountShare('');
  }

  function handleBillAmountInput(e: ChangeEvent<HTMLInputElement>) {
    const amount = Number(e.target.value);
    if (amount <= 0) return;
    setBillAmount(amount);
    setDisableUserShareAmountInput(false);
  }

  function handleUserShareInput(e: ChangeEvent<HTMLInputElement>) {
    const amount = Number(e.target.value);
    if (amount > billAmount) {
      setUserAmountShare(billAmount);
    } else {
      setUserAmountShare(amount);
    }
  }

  function handlePayingPartyChange(e: ChangeEvent<HTMLSelectElement>) {
    setPayingParty(e.target.value as 'user' | 'friend');
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    if (!billAmount || !userShareAmount) return;

    const oweAmount =
      payingParty === 'user' ? friendShareAmount : -Number(userShareAmount);

    onBillSplit(oweAmount);

    resetForm();
  }

  return (
    <form className="form-split-bill" onSubmit={handleFormSubmit}>
      <h2>Split a bill with {friend.name}</h2>

      <label>Bill Amount</label>
      <input
        type="number"
        value={billAmount}
        onChange={handleBillAmountInput}
      />

      <label>Your Share</label>
      <input
        type="number"
        disabled={disableUserShareAmountInput}
        value={userShareAmount}
        onChange={handleUserShareInput}
      />

      <label>{friend.name}'s Share</label>
      <input disabled type="number" value={friendShareAmount} />

      <label> Who is paying the bill</label>
      <select value={payingParty} onChange={handlePayingPartyChange}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button type="submit">Split Bill</Button>
    </form>
  );
}

export default BillSplitForm;
