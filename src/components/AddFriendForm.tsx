import { FormEvent, useState } from 'react';
import { Friend } from '../interfaces/friend.interface';
import Button from './Button';

interface AddFriendFormProps {
  onAddFriend: (friend: Friend) => void;
}

function AddFriendForm({ onAddFriend }: AddFriendFormProps) {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  function resetForm() {
    setUsername('');
    setAvatar('');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!username) return;

    const friend: Friend = {
      name: username,
      avatar:
        avatar || `https://avatar.iran.liara.run/username?username=${username}`,
      balance: 0,
      id: Date.now(),
    };

    onAddFriend(friend);

    resetForm();
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Image Url</label>
      <input
        type="text"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />

      <Button type="submit">Add</Button>
    </form>
  );
}

export default AddFriendForm;
