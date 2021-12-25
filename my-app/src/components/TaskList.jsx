import React, { useState } from "react";
import Card from "./Card.jsx";
import "./TaskList.css";
import { createCard, itemTypes } from "../helpers";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { v4 as uuid } from "uuid";
import { useDrop } from "react-dnd";
import { useStateValue } from "../hooks";

const TaskList = ({ title }) => {
  const [addingCard, setAddingCard] = useState(false);

  const [{ cards }, dispatch] = useStateValue();

  //For Drag and Drop:

  return (
    <div className="task_list">
      <h2 className="task_list_title">{title}</h2>
      {console.log(cards)}
      {cards
        .map((card, index) => {
          return (
            <Card
              title={card.title}
              description={card.description}
              color={card.color}
              date={card.date}
              id={card.id}
              category={card.category}
              index={index}
              tags={card.tags}
              key={uuid()}
            />
          );
        })
        .filter((card) => card.props.category === title)}
      {addingCard ? (
        <form
          className="add_card_form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: "ADD_CARD",
              payload: createCard(
                e.currentTarget[0].value,
                e.currentTarget[2].value,
                title
              ),
            });
            setAddingCard(false);
          }}
        >
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            multiline
            color="secondary"
          />
          <TextField
            id="filled-basic"
            label="Description"
            variant="filled"
            multiline
            minRows={2}
            color="secondary"
          />
          <div className="button_holder">
            <Button
              variant="contained"
              size="small"
              type="submit"
              className="form_add_card"
              color="secondary"
              style={{ margin: "10px 10px 0 0" }}
            >
              Add Card
            </Button>
            <Button
              variant="contained"
              size="small"
              className="discard_card"
              color="secondary"
              onClick={() => setAddingCard(false)}
              style={{ margin: "10px 10px 0 0" }}
            >
              discard
            </Button>
          </div>
        </form>
      ) : (
        <button
          className="add_card"
          onClick={() => {
            setAddingCard(true);
          }}
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default TaskList;
