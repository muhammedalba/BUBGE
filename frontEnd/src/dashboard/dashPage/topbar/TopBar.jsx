import { NavLink } from "react-router-dom";

import Cookies from "universal-cookie";
import logo from "../../../imges/logo.png";
import avatar from "../../../imges/avatar.jpeg";
// icons

import { IoMdHome } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { searchItem } from "../../../redux/features/Slice/SerchSlice";
import { Fade } from "react-awesome-reveal";

const TopBar = () => {
  const cookies = new Cookies();
  const imgeUrl = cookies.get("imageUrl");
  const image = cookies.get("image");
  const role = cookies.get("role") || "user";
  const dispatch = useDispatch();

  // Nav links
  const navLinks = [
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

  // navLink in map

  const nav_link_show = navLinks.map((link, index) => {
    return (
      <li
        key={index}
        className={
          role === "user" && link.path === "/dashboard"
            ? "d-none"
            : "nav-item d-flex align-items-center "
        }
      >
        <Fade delay={0} direction="down" triggerOnce={true} cascade>
          <NavLink
            to={link.path}
            className="nav-link p-2 d-flex  align-items-center "
          >
            <span className="px-1 d-none d-md-block ">{link.title}</span>
            {link.icon}
          </NavLink>
        </Fade>
      </li>
    );
  });
  return (
    <header dir="ltr" className="w-100 text-uppercase fw-semibold">
      <nav
        style={{
          boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px",
        }}
        className="nav "
      >
        <div className=" d-flex w-100 px-2 py-2  justify-content-between container-fluid">
          {/* logo start */}
          <Fade delay={0} direction="up" triggerOnce={true}>
            <div className="logo d-flex   align-items-center">
              <img
                className="logo  rounded-circle  me-2 d-sm-block  "
                src={logo}
                alt="logo"
              />
              <div
                style={{ color: "var(--text-color)", whiteSpace: "nowrap" }}
                className=" mb-0 d-none d-sm-block"
              >
                <Fade triggerOnce={true} cascade>
                  متجرك بين يديك
                </Fade>
              </div>
            </div>
          </Fade>
          {/* logo end */}
          <div className=" d-lg-block">
            <ul className="my-0 h-100 d-flex  align-items-center ">
              {nav_link_show}

              <img
                className="logo px-1 d-none d-sm-block rounded-circle dropdown-toggle border-1"
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

      <div
        dir="rtl"
        className="serch px-3 position-relative my-3 w-100 align-items-center"
      >
        <Fade delay={0} direction="down" triggerOnce={true} cascade>
          <div className="h-100 m-auto w-50 d-flex align-items-center">
            <label>
              <CiSearch />
            </label>
            <input
              type="search"
              className="h-100 px-2 w-100"
              placeholder="...بحث"
              onChange={(e) =>
                dispatch(searchItem(e.target.value.toLowerCase()))
              }
            />
          </div>
        </Fade>
      </div>
    </header>
  );
};

export default TopBar;
