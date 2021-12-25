import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./CardMenu.css";
import { colors } from "../helpers";
import { useStateValue } from "../hooks";

const CardMenu = ({ props }) => {
  const [{ cards }, dispatch] = useStateValue();
  const { setAddingTag, setEditingTitle, setEditingDescription, id } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [colorsAnchorEl, setColorsAnchorEl] = useState(null);
  const [colorsIsOpen, setColorsIsOpen] = useState(false);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleCloseColorMenu = () => {
    setColorsAnchorEl(null);
    setColorsIsOpen(false);
  };

  const handleClickEditTitle = () => {
    handleCloseMenu();
    setEditingTitle(true);
    setEditingDescription(false);
    setAddingTag(false);
  };

  const handleClickEditDescription = () => {
    handleCloseMenu();
    setEditingDescription(true);
    setEditingTitle(false);
    setAddingTag(false);
  };

  const handleClickEditColor = (event) => {
    setEditingTitle(false);
    setEditingDescription(false);
    setAddingTag(false);
    setColorsAnchorEl(event.currentTarget);
    setColorsIsOpen(true);
  };

  const handleClickAddTags = () => {
    handleCloseMenu();
    setAddingTag(true);
    setEditingTitle(false);
    setEditingDescription(false);
  };

  const handleClickDelete = () => {
    handleCloseMenu();
    dispatch({ type: "DELETE_CARD", id: id });
  };

  return (
    <div className="menu_holder">
      <IconButton
        id="menu-button"
        aria-controls="menu"
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClickMenu}
        className="card_edit"
        size="small"
        style={{
          color: "rgba(255,255,255,0.5)",
          position: "relative",
          bottom: "15px",
          left: "10px",
          width: "0.5em",
          height: "0.5em",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleClickEditTitle}>Edit title</MenuItem>
        <MenuItem onClick={handleClickEditDescription}>
          Edit description
        </MenuItem>
        <MenuItem
          onClick={handleClickEditColor}
          aria-controls="color-menu"
          aria-haspopup="true"
          aria-expanded={colorsIsOpen ? "true" : undefined}
        >
          Edit color
        </MenuItem>
        <MenuItem onClick={handleClickAddTags}>Add a tag</MenuItem>
        <MenuItem onClick={handleClickDelete}>Delete</MenuItem>
      </Menu>
      <Menu
        id="color-menu"
        open={colorsIsOpen}
        anchorEl={colorsAnchorEl}
        onClose={handleCloseColorMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseColorMenu();
            dispatch({ type: "EDIT_COLOR", payload: colors[0], id: id });
          }}
        >
          <div
            style={{
              width: "70px",
              backgroundColor: colors[0],
              height: "13px",
              borderRadius: "10px",
            }}
          ></div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseColorMenu();
            dispatch({ type: "EDIT_COLOR", payload: colors[1], id: id });
          }}
        >
          <div
            style={{
              width: "70px",
              backgroundColor: colors[1],
              height: "13px",
              borderRadius: "10px",
            }}
          ></div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseColorMenu();
            dispatch({ type: "EDIT_COLOR", payload: colors[2], id: id });
          }}
        >
          <div
            style={{
              width: "70px",
              backgroundColor: colors[2],
              height: "13px",
              borderRadius: "10px",
            }}
          ></div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseColorMenu();
            dispatch({ type: "EDIT_COLOR", payload: colors[3], id: id });
          }}
        >
          <div
            style={{
              width: "70px",
              backgroundColor: colors[3],
              height: "13px",
              borderRadius: "10px",
            }}
          ></div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseColorMenu();
            dispatch({ type: "EDIT_COLOR", payload: colors[4], id: id });
          }}
        >
          <div
            style={{
              width: "70px",
              backgroundColor: colors[4],
              height: "13px",
              borderRadius: "10px",
            }}
          ></div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CardMenu;
