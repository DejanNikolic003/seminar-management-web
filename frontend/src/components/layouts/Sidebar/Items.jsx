import { NavLink } from "react-router-dom";
import Item from "./Item";
import { Home } from "lucide-react";

const Items = ({ isOpen }) => {
    return (
        <nav>
          <NavLink to="/">
            {({ isActive }) => (
              <Item 
                icon={<Home />}
                label="Početna"
                isOpen={isOpen}
                active={isActive}
              />
            )}
          </NavLink>
        </nav>
    )
};

export default Items;