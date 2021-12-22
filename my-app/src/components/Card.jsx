import React, { useReducer, useState } from "react";
import { reducer } from "../hooks/reducer.js";
import { v4 as uuid } from "uuid";
import "./Card.css";
import CardMenu from "./CardMenu.jsx";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import { itemTypes } from "../helpers";
import { useDrag } from "react-dnd";

const Card = ({ title, description, color, date, id, category, props }) => {
  const [state, dispatch] = useReducer(reducer, {
    cardTitle: title,
    cardDescription: description,
    cardColor: color,
    cardTags: [],
    cardDate: date,
    cardId: id,
    cardCategory: category,
  });

  const { cards, setCards } = props;

  const [addingTag, setAddingTag] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);

  const { cardTitle, cardColor, cardDescription, cardTags } = state;

  //For Drag and Drop

  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="card"
      ref={drag}
      style={{ backgroundColor: cardColor, opacity: isDragging ? 0.5 : 1 }}
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
              });
            }}
          >
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
              color="secondary"
              defaultValue={cardTitle}
            />
          </form>
        ) : (
          <h3 className="card_title">{cardTitle}</h3>
        )}
        <CardMenu
          props={{
            setAddingTag,
            setEditingTitle,
            setEditingDescription,
            dispatch,
            cards,
            setCards,
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
            });
          }}
        >
          <TextField
            id="filled-basic"
            label="Description"
            variant="filled"
            color="secondary"
            defaultValue={cardDescription}
          />
        </form>
      ) : (
        <p className="card_description">{cardDescription}</p>
      )}
      {cardTags.map((tag) => {
        return (
          <span className="card_tags" key={uuid()}>
            {tag}
            <IconButton
              onClick={(event) =>
                dispatch({ type: "CLEAR_TAG", payload: event.currentTarget.id })
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
  );
};

export default Card;
