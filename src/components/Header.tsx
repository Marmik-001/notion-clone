"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex flex-row justify-between items-center p-5 ">
      {user && (
        
          <h1>
             {user?.firstName}
            {`'s`} Space
          </h1>
        
      )}

      {/* breadercums */}
      <div>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
export default Header;
