import React, { useState } from "react";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* <button onClick={() => setOpen(!open)}>👤</button> */}

      {open && (
        <div className="absolute right-0 mt-2 w-[150px] bg-white shadow-md rounded-md p-2">
          <p className="p-2 hover:bg-gray-100 cursor-pointer">Profile</p>
          <p className="p-2 hover:bg-gray-100 cursor-pointer">Orders</p>
          <p className="p-2 hover:bg-gray-100 cursor-pointer text-red-500">
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
