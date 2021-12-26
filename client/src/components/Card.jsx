import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./Card.css";
import CardMenu from "./CardMenu.jsx";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import { itemTypes } from "../helpers";
import { useDrag, useDrop } from "react-dnd";
import { useStateValue } from "../hooks";

const Card = ({ title, description, color, id, tags, category, index }) => {
  const [addingTag, setAddingTag] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);

  const [, dispatch] = useStateValue();
  //For Drag and Drop

  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.CARD,
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: itemTypes.CARD,
    drop: (item) => {
      dispatch({ type: "CHANGE_CATEGORY", id: item.id, category: category });
      dispatch({ type: "SET_NEW_POSITION", index: index, id: item.id });
      dispatch({ type: "DELETE_CARD", id: item.id });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="card_holder">
      <div
        className="dropable_div"
        ref={drop}
        style={
          isOver
            ? {
                border: "1px solid gray",
                height: "120px",
                margin: "3px 0",
                borderRadius: "8px",
              }
            : null
        }
      ></div>
      <div
        className="card"
        ref={drag}
        style={{ backgroundColor: color, opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="card_header">
          {editingTitle ? (
            <form
              className="edit_title_form"
              onSubmit={(event) => {
                event.preventDefault();
                setEditingTitle(false);
                dispatch({
                  type: "EDIT_TITLE",
                  payload: event.currentTarget[0].value,
                  id: id,
                });
              }}
            >
              <TextField
                id="filled-basic"
                label="Title"
                variant="filled"
                color="secondary"
                defaultValue={title}
              />
            </form>
          ) : (
            <h3 className="card_title">{title}</h3>
          )}
          <CardMenu
            props={{
              setAddingTag,
              setEditingTitle,
              setEditingDescription,
              id,
            }}
          />
        </div>

        {editingDescription ? (
          <form
            className="edit_description_form"
            onSubmit={(event) => {
              event.preventDefault();
              setEditingDescription(false);
              dispatch({
                type: "EDIT_DESCRIPTION",
                payload: event.currentTarget[0].value,
                id: id,
              });
            }}
          >
            <TextField
              id="filled-basic"
              label="Description"
              variant="filled"
              color="secondary"
              defaultValue={description}
            />
          </form>
        ) : (
          <p className="card_description">{description}</p>
        )}
        {tags.map((tag) => {
          return (
            <span className="card_tags" key={uuid()}>
              {tag}
              <IconButton
                onClick={(event) =>
                  dispatch({
                    type: "CLEAR_TAG",
                    payload: event.currentTarget.id,
                    id: id,
                  })
                }
                className="card_edit"
                size="small"
                id={tag}
              >
                <ClearIcon style={{ color: "rgba(255,255,255,0.75)" }} />
              </IconButton>
            </span>
          );
        })}
        {addingTag ? (
          <span className="tag_input">
            <form
              className="new_tag_form"
              onSubmit={(event) => {
                event.preventDefault();
                setAddingTag(false);
                dispatch({
                  type: "ADD_TAG",
                  payload: event.currentTarget[0].value,
                  id: id,
                });
              }}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="secondary"
              />
            </form>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
