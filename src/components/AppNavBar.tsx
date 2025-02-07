"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";

const AppNavBar = () => (
  <Navbar isBordered>
    <NavbarBrand>
      <p className="font-bold text-inherit">Stacks</p>
    </NavbarBrand>
    <NavbarContent justify="end">
      <NavbarItem>
        <ThemeSwitcher />
      </NavbarItem>
    </NavbarContent>
  </Navbar>
);

export default AppNavBar;
