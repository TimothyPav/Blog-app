import React from 'react';
import { Link } from 'react-scroll';

export default function Navbar() {
    const content = <>
        <div className="">
            <ul>
                <Link to="Home">
                    <li>Home</li>
                </Link>
                <Link to="Profile">
                    <li>Profile</li>
                </Link>
                <Link to="SignIn">
                    <li>Sign In</li>
                </Link>
            </ul>
        </div>
    </>
    
    return (
        <>
            <nav>
                <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
                    <div className="flex items-center flex-1">
                        <span className="text-3xl font-bold">Logo</span>
                    </div>
                    <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal">
                        <div className="flex-10">
                        <ul className="flex gap-8 mr-16 text-[18px]">
                            <Link to="Home">
                                <li>Home</li>
                            </Link>
                            <Link to="Profile">
                                <li>Profile</li>
                            </Link>
                            <Link to="SignIn">
                                <li>Sign In</li>
                            </Link>
                        </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
  }