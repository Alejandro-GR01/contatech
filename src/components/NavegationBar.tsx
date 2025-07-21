import { NavLink } from "react-router"
import { navMenu } from "../data/db"


const NavegationBar = () => {
  return (
     <nav className=" p-1 bg-blue-600 text-white">
      <ul className=" max-w-6xl mx-auto flex flex-col md:flex-row gap-2 justify-evenly items-center py-1 text-base md:text-lg  font-semibold ">
      {navMenu.map(item=> (
        <NavLink to={item.link} key={item.id} className={({isActive})=> isActive ? 'text-blue-200 hover:cursor-default': 'hover-scale-105'} >

        <li  >
          {item.name}
        </li>
        </NavLink>
      ))}
     
      </ul>
    </nav>
  )
}

export default NavegationBar