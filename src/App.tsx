import { useState } from 'react';
import FriendList from './components/FriendList';
import { Friend } from './interfaces/friend.interface';
import AddFriendForm from './components/AddFriendForm';
import Button from './components/Button';
import BillSplitForm from './components/BillSplitForm';

const initialFriends: Friend[] = [
  {
    id: 118836,
    name: 'Clark',
    avatar: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    avatar: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    avatar: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  function toggleShowAddFriendForm() {
    setShowAddFriendForm((currentStatus) => !currentStatus);
  }

  function handleSelectBillFriend(friend: Friend) {
    // if (selectedFriend?.id === friend.id) return setSelectedFriend(null);
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriendForm(false);
  }

  function handleAddFriend(friend: Friend) {
    setFriends((currentFriends) => [...currentFriends, friend]);
    setShowAddFriendForm(false);
  }

  function handleBillSplit(oweAmount: number) {
    if (!selectedFriend) return;
    setFriends((currentFriends) =>
      currentFriends.map((cf) =>
        cf.id === selectedFriend.id
          ? {
              ...selectedFriend,
              balance: oweAmount + selectedFriend.balance,
            }
          : cf
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onFriendSelect={handleSelectBillFriend}
        />
        {showAddFriendForm && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={toggleShowAddFriendForm}>
          {showAddFriendForm ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectedFriend && (
        <BillSplitForm
          onBillSplit={handleBillSplit}
          key={selectedFriend.avatar}
          friend={selectedFriend}
        />
      )}
    </div>
  );
}

export default App;
