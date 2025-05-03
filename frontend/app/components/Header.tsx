// app/components/Header.tsx
"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    console.log("User is signed in:", user?.emailAddresses[0]?.emailAddress);
  }

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <div className="sign-in flex gap-4">
          <SignInButton />
        </div>
        <div className="sign-in flex gap-4">
          <SignUpButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
