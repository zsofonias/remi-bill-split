import { Friend } from '../interfaces/friend.interface';
import Button from './Button';

interface FriendLIstItemProps {
  friend: Friend;
  selectedFriend: Friend | null;
  onFriendSelect: (friend: Friend) => void;
}

function FriendLIstItem({
  friend,
  selectedFriend,
  onFriendSelect,
}: FriendLIstItemProps) {
  const avatarUrl =
    friend.avatar ??
    `https://avatar.iran.liara.run/username?username=${friend.name}`;

  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={avatarUrl} alt="avatar" />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you ${friend.balance}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

      <Button onClick={() => onFriendSelect(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

export default FriendLIstItem;
