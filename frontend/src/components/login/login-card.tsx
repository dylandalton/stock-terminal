import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Mock user data
const users = [
  { id: "1", username: "johndoe", avatarUrl: "https://github.com/shadcn.png" },
  { id: "2", username: "janedoe", avatarUrl: "https://github.com/shadcn.png" },
  { id: "3", username: "bobsmith", avatarUrl: "https://github.com/shadcn.png" },
]

export default function LoginCard() {
  const [selectedUser, setSelectedUser] = useState("")

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Dashboard Login</CardTitle>
        <CardDescription>Just choose your account from the dropdown</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedUser} value={selectedUser}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user?.id} value={user?.id}>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                    <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{user?.username}</span>
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
            className="text-white text-sm font-medium inline-block w-full h-full">
            Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

