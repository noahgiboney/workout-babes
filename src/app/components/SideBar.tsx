"use client";
import React from "react";
import { Box, VStack, Button, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Box, VStack, Button, Image, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { getAvatarPathById } from "@/avatars/avatarsList";
import { User } from "@/user/user";

const SideBar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Perform logout operations here, such as clearing authentication tokens
    await fetch("/api/logout", {
      method: "POST",
    });

    if (typeof window !== "undefined") {
      localStorage.clear();
    }

    console.log("Logging out");
    // Redirect to the login page or home page
    window.location.href = "/login";
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };


  const [user, setUser] = useState<User | null>(null);
  const currentUser = useUser();

  console.log(currentUser);

  
  const [avatarId, setAvatarId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) return;
      try {
        const response = await fetch(`/api/user/${currentUser?.userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: User = await response.json();
        setUser(data);
        setAvatarId(data.avatarId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
      };

    fetchUserData();
  }, [currentUser]);

  return (
    <Box h="100vh" bg="#5A457F" w="300px" padding="20px" marginRight="20px">
      <VStack>
        <Box
          boxSize={130}
          borderRadius="full"
          overflow="hidden"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {avatarId !== undefined ? (
            <Image src={getAvatarPathById(avatarId)} boxSize={110} />
          ) : (
            <Avatar size="2xl" />
          )}
        </Box>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/homepage")}
        >
          Today&apos;s View
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/calendar")}
        >
          Calendar
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/progress")}
        >
          Track Progress
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={() => handleNavigation("/profile")}
        >
          My Profile
        </Button>
        <Button
          bg="#C7B3DC"
          color="black"
          padding={30}
          width="13rem"
          margin={1}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default SideBar;
