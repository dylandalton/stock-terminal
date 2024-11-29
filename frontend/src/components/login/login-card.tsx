import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useDispatch } from 'react-redux';
import { setSelectedUser as setUser } from '../../state/slices/userSlice';
import { User } from "@/models/User"

export default function LoginCard({ users }: { users: User[] }) {
  console.log("Inside login card: ", users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  const handleLogin = (selectedUser: User) => {
    dispatch(setUser(selectedUser));
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Dashboard Login</CardTitle>
        <CardDescription>Just choose your account from the dropdown</CardDescription>
      </CardHeader>
      <CardContent>
        <Select 
          onValueChange={(id: string) => setSelectedUser(users.find((user) => user._id === id) ?? null)} 
          value={selectedUser?._id}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user?._id} value={user?._id}>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                  {user.avatarUrl ? (
                    <AvatarImage src={user?.avatarUrl} alt={user?.user} />
                  ) : (
                    <AvatarFallback>{user?.user[0].toUpperCase()}</AvatarFallback>
                  )}
                  </Avatar>
                  <span>{user?.user}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant="login"
          disabled={!selectedUser}
        >
          <Link to="/home" 
            className="text-white text-sm font-medium inline-block w-full h-full"
            onClick={() => handleLogin(users.find((user) => user._id === selectedUser?._id) ?? {} as User)}
            >
            Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

