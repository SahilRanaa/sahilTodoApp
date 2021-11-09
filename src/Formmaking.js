import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Input,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const Formmaking = () => {
  //todo: here we get the data the data from the local storage

  const getData = () => {
    let list = localStorage.getItem("lists");

    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  //   todo: here in the second state i've stored the data from the local storage so that it does not vanish when we refresh the page ;

  //todo: i've created two states bcoz one is for storing the data that is coming from the form and the other is to store muliple inputs as an array;

  const [text, setText] = useState("");
  const [data, setData] = useState(getData());

  //todo:submisiion of form and loading the data in to the state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      return alert("please fill the feild");
    } else {
      setData([...data, text]);
      setText("");
    }
  };

  ///Todo: for deleting the items

  const handleClick = (id) => {
    const updatedItem = data.filter((elem, idx) => {
      return idx !== id;
    });
    setData(updatedItem);
  };

  //todo:   add data to local storage and to show the data at the time when application loads to the screen

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <Input
              type="text"
              name="todo"
              id="text"
              placeholder="Your next Todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <InputGroupAddon addonType="prepend">
              <Button color="success">Add</Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
      <ListGroup className="mt-5 mb-2 items">
        {/* todo: here i've used map function to get the data where idx is the index number and i've exported it as id to the handle click function */}

        {data.map((elem, idx) => {
          return (
            <ListGroupItem key={idx}>
              {elem}
              <button
                className="float-end btn btn-danger"
                onClick={() => handleClick(idx)}
              >
                delete
              </button>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default Formmaking;
