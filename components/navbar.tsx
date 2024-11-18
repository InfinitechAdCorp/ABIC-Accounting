import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="flex gap-3 bg-sky-600 p-5">
        <Link href="/">
          <h3 className="text-white font-semibold">Dashboard</h3>
        </Link>

        <Link href="/transactions">
          <h3 className="text-white font-semibold">Transaction Monitoring</h3>
        </Link>

        <Link href="/contracts">
          <h3 className="text-white font-semibold">Contract Monitoring</h3>
        </Link>

        {/* 
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="text-white font-semibold"
            >
              Transaction Monitoring
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2"
            >
              <li>
                <Link href="/transactions">
                  <h3 className="font-semibold">Transactions</h3>
                </Link>
              </li>
              <li>
                <Link href="/accounts">
                  <h3 className="font-semibold">Accounts</h3>
                </Link>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="text-white font-semibold"
            >
              Contract Monitoring
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2"
            >
              <li>
                <Link href="/contracts">
                  <h3 className="font-semibold">Contracts</h3>
                </Link>
              </li>
              <li>
                <Link href="/clients">
                  <h3 className="font-semibold">Clients</h3>
                </Link>
              </li>
            </ul>
          </div> */}
      </div>
    </>
  );
};

export default Navbar;
