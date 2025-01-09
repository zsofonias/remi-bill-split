import { Friend } from '../interfaces/friend.interface';
import FriendLIstItem from './FriendLIstItem';

interface FriendListProps {
  friends: Friend[];
  selectedFriend: Friend | null;
  onFriendSelect: (friend: Friend) => void;
}

function FriendList({
  friends,
  selectedFriend,
  onFriendSelect,
}: FriendListProps) {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendLIstItem
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onFriendSelect={onFriendSelect}
        />
      ))}
    </ul>
  );
}

export default FriendList;
