// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Cookies from "universal-cookie";
import logo from "../../imges/logo.png";
import avatar from "../../imges/avatar.jpeg";
// icons
import { CiSearch } from "react-icons/ci";
import { IoChevronUpOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import "./header.css";
import { useDispatch } from "react-redux";
import { searchItem } from "../../redux/features/Slice/SerchSlice";

const Header = () => {
  const cookies = new Cookies();
  const imgeUrl = cookies.get("imageUrl");
  const image = cookies.get("image");
  const role = cookies.get("role") || "user";
  const [scroll, setscroll] = useState(false);
  const dispatch = useDispatch();
  const [trans, settrans] = useState(false);


  window.onscroll = () => {
    if (window.scrollY > 60 && window.scrollY < 301) {
      settrans(true);
    } else if (window.scrollY > 130) {
      settrans(false);
      setscroll(true);
    } else {
      setscroll(false);
      settrans(false);
    }
  };

  const Scrolto = () => {
    window.scrollTo(0, 0);
  };

  // handel serche
  const handelserche = (e) => {
    // console.log(e.target.value);
    dispatch(searchItem(e.target.value));


  };
  
  // handel user profile

  // handel Logout
  const Logout = () => {
    console.log("logout");
    const cookies = new Cookies();
    cookies.remove();
    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("firstname");
    cookies.remove("image");
    cookies.remove("imageUrl");
    window.location.pathname = "/";
  };

  // Auth links
  const AuthLinks = [
    {
      title: "انشاء حساب",
      path: "/signup",
      icon: <FaRegUser fontSize={"1.6rem"} color="var(--text-color)" />,
    },
    {
      title: "تسجيل دخول",
      path: "/login",
      icon: <CiLogin fontSize={"1.7rem"} color="var(--text-color)" />,
    },
    {
      title: "تسجيل خروج",
      path: "/",
      icon: <CiLogin fontSize={"1.7rem"} color="var(--text-color)" />,
    },
  ];
  const AuthLinksShow = AuthLinks.map((link, index) => {
    return (
      <li key={index}>
        <Link
          to={`${link.path}`}
          className="dropdown-item d-flex align-items-center gap-2"
          onClick={link.path === "/" && Logout}
        >
          {link.icon}
          {link.title}
        </Link>
      </li>
    );
  });

  // Nav links
  const nav_Links = [
    {
      title: "المفضلة",
      path: "/WishList",
      icon: <CiHeart fontSize={"1.7rem"} color="var(--text-color)" />,
    },
    {
      title: "سلة مشترياتي",
      path: "/contactus",
      icon: <BsCart2 fontSize={"1.7rem"} color="var( --text-color)" />,
    },
    {
      title: "صفحة الرئيسيه",
      path: "/",
      icon: <IoMdHome fontSize={"1.7rem"} color="var( --text-color)" />,
    },
    {
      title: "لوحه التحكم",
      path: "/dashboard",
      icon: (
        <AiOutlineDashboard fontSize={"1.7rem"} color="var( --text-color)" />
      ),
    },
  ];

  // get property
  // const bgColor = document.styleSheets[0].cssRules[0].style.getPropertyValue("--bg-color");

  // navLink in map

  const nav_link_show = nav_Links.map((link, index) => {
    return (
      <li
        key={index}
        className={
          role === "user" && link.path === "/dashboard"
            ? "d-none"
            : "nav-item d-flex align-items-center "
        }
      >
        <NavLink
          to={link.path}
          className="nav-link p-2 d-flex  align-items-center "
        >
          <span className="px-1 d-none d-md-block ">{link.title}</span>
          {link.icon}
        </NavLink>
      </li>
    );
  });

  //

  return (
    <>
      <header
        dir="ltr"
        style={{
          transform: trans ? "translateY(-150%)" : "translateY(0)",
        }}
        className="w-100 text-uppercase fw-semibold"
      >
        <nav
          style={{
            boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px",
          }}
          className="nav "
        >
          <div className=" d-flex w-100 px-2 py-2  justify-content-between container-fluid">
            {/* logo start */}
            <div className="logo  d-flex   align-items-center">
              <img className="logo    d-sm-block  " src={logo} alt="logo" />
              <p
                style={{ color: "var(--text-color)"   , whiteSpace: 'nowrap' }}
                className=" mb-0 d-none d-sm-block"
              >
                   مجرة السماء للتجارة
              </p>
            </div>
            {/* logo end */}
            <div className=" d-lg-block">
              <ul className="my-0 h-100 d-flex  align-items-center ">
                {nav_link_show}

                <img
                  className="logo d-none d-sm-block rounded-circle dropdown-toggle border-1"
                  src={
                    !image || image === "undefined"
                      ? avatar
                      : `${imgeUrl}/${image}`
                  }
                  alt="avatar"
                />
              </ul>
            </div>
          </div>
        </nav>

        {/* seareh input start */}
        <div className="serch px-3 justify-content-between  position-relative my-3 w-100 d-flex gap-2 align-items-center">
          <span className="d-none d-sm-block">+905346833726</span>
          <div className="h-100  d-flex align-items-center ">
            <input
              // style={{ backgroundColor:"transparent" }}
              // style={{ backgroundColor: scroll ? "#171d22" : "transparent" }}
              type="search"
              className="h-100 px-2 w-100 text-end"
              placeholder="...بحث"
              onChange={handelserche}
            />
            <label>
              <CiSearch />
            </label>
          </div>

          {/* {error && <p className="position-absolute w-100"> not fonde </p>} */}

          {/* dropdown */}
          <span
            className=" d-none d-sm-block dropdown-toggle "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            تسجيل دخول \انشاء حساب
          </span>
          <FaUser
            className="d-block d-sm-none dropdown-toggle "
            data-bs-toggle="dropdown"
            aria-expanded="false"
            color="var(--spanColo)"
            fontSize={"1.5rem"}
          />
          <ul
            style={{ background: "var(--bgColor)" }}
            className="dropdown-menu dropdown-menu"
          >
            {AuthLinksShow}
          </ul>
        </div>
        {/* seareh input end */}
      </header>

      {/* go to top start */}
      <span
        className=""
        style={{
          transform: scroll ? "translateY(0)" : "translateY(-1500px)",
        }}
        onClick={Scrolto}
        id="span"
      >
        <IoChevronUpOutline />
        <IoChevronUpOutline />
      </span>
      {/* go to top end */}
    </>
  );
};

export default Header;
