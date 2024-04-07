import React, { useState } from 'react';
//import { Link } from 'react-scroll';
import {FaTimes} from 'react-icons/fa'
import {CiMenuFries} from 'react-icons/ci'
import { Link } from 'react-router-dom';

const logoIMG = "https://static.vecteezy.com/system/resources/previews/019/152/540/original/leaf-graphic-clipart-design-free-png.png"

export default function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }

    const content = <>
        <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
            <ul className="text-center text-xl p-20">
                <Link spy={true} smooth={true} to="">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Home</li>
                </Link>
                <Link spy={true} smooth={true} to="Profile">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Profile</li>
                </Link>
                <Link spy={true} smooth={true} to="SignIn">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Sign In</li>
                </Link>
                <Link spy={true} smooth={true} to="/posts/new">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Create Post</li>
                </Link>
            </ul>
        </div>
    </>

    return (
        <>
            <nav>
                <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
                    <div className="flex items-center flex-1">
                    <img src={logoIMG} alt="Logo" className="h-8 cursor-pointer" />
                    </div>
                    <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
                        <div className="flex-10">
                        <ul className="flex gap-8 mr-16 text-[18px]">
                            <Link spy={true} smooth={true} to="">
                                <li className="hover:text-green-400 transition border-b-2 border-slate-900 hover:border-green-400 cursor-pointer" >Home</li>
                            </Link>
                            <Link spy={true} smooth={true} to="Profile">
                                <li className="hover:text-green-400 transition border-b-2 border-slate-900 hover:border-green-400 cursor-pointer" >Profile</li>
                            </Link>
                            <Link spy={true} smooth={true} to="SignIn">
                                <li className="hover:text-green-400 transition border-b-2 border-slate-900 hover:border-green-400 cursor-pointer" >Sign In</li>
                            </Link>
                            <Link spy={true} smooth={true} to="/posts/new">
                                <li className="hover:text-green-400 transition border-b-2 border-slate-900 hover:border-green-400 cursor-pointer" >Create Post</li>
                            </Link>
                        </ul>
                        </div>
                    </div>
                    <div>
                        {click && content}
                    </div>

                    <button className="block sm:hidden transition" onClick={handleClick}>
                        {click ? <FaTimes/> : <CiMenuFries/>}
                    </button>
                </div>
                
            </nav>
        </>
    );
  }