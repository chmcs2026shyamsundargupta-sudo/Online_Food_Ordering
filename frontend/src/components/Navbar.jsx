import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-primary shadow-md">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold text-secondary tracking-wide font-mono">
            ORDER MANAGEMENT
          </h1>

          <Link
            to="/create-order"
            className="flex items-center gap-2 bg-secondary text-primary font-semibold px-5 py-2 rounded-full hover:bg-secondary-focus transition"
          >
            <PlusIcon className="size-5" />
            <span>New Order</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;