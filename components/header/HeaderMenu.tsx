import CartIcon from "../CartIcon";
import { ShoppingBasket, User } from "lucide-react";
import {
    ClerkLoaded,
    SignedIn,
    SignInButton,
    UserButton,
    useUser,
  } from "@clerk/nextjs";
import Link from "next/link";
const HeaderMenu = () => {
    const { user } = useUser();
  return (
    <div className="flex items-center space-x-3 md:space-x-4 sm:mt-0 flex-1 sm:flex-none ">
      <CartIcon />
      {/* User icons */}
      <ClerkLoaded>
        <SignedIn>
          <Link
            href={"/orders"}
            className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
          >
            <ShoppingBasket className="w-4 h-4 md:w-6 md:h-6 text-darkBlue" />
            <div className="flex flex-col">
              <p className="text-xs">
                <span className="font-semibold">
                  {/* {orders && orders?.length > 0 ? orders?.length : 0} */}
                </span>{" "}
                items
              </p>
              <p className="font-semibold">Orders</p>
            </div>
          </Link>
        </SignedIn>

        {user ? (
          <div className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect">
            <UserButton />
            <div className="hidden md:inline-flex flex-col text-xs">
              <p className="text-xs">Welcome back</p>
              <p className="font-bold">{user?.fullName}</p>
            </div>
          </div>
        ) : (
          <SignInButton mode="modal">
            <div className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md cursor-pointer hover:shadow-none hoverEffect">
              <User className="text-2xl text-darkBlue" />
              <div className="flex flex-col">
                <p className="text-xs">Account</p>
                <p className="font-semibold">Login</p>
              </div>
            </div>
          </SignInButton>
        )}
      </ClerkLoaded>
    </div>
  );
};

export default HeaderMenu;
