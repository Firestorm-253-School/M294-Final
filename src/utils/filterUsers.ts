interface User {
  profileId: number;
  displayName: string;
  email: string;
  isOwn?: boolean;
  isFriend?: boolean;
  requestOutgoing?: boolean;
}

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  return users.filter((user) =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );
};