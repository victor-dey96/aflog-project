import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [essayList, setEssayList] = useState([]);
  const [time, setTime] = useState({});

  const addData = () => {
    console.log(title);
    axios
      .post(
        "http://localhost:4000/Essays", //POST request endpoint
        { title: title, author: author, text: text } //data for POST request using state, inside object as key-value pairs
      )
      .then((response) => {
        setEssayList(response.data); //doing after get request
      });
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/Essays" //GET request endpoint
      )
      .then((response) => {
        setEssayList(response.data); //doing after get request
      });
  }, []);

  const deleteEntry = (id) => {
    //taking id as parameter
    console.log("deleted!");
    axios
      .delete(`http://localhost:4000/Essays/${id}`)
      .then((response) => {
        setEssayList(response.data); //doing after get request
      })
      .catch((err) => {
        // deleting by particular id
        alert("Something went wrong!");
      });
  };

  // const editEntry = (id, title, text, author) => {
  //   console.log(id, title, text, author);
  // };

  console.log(...essayList);

  return (
    <div className="App">
      <div className="data">
        <label>Title</label>
        <input
          className="input_title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label>Author</label>
        <input
          className="input_author"
          type="text"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          value={author}
        />
        <label>Text</label>
        <textarea
          className="input_text"
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <div className="buttons">
          <button onClick={addData}>Add</button>
        </div>
      </div>

      <div className="con_container">
        {/* container of containers */}
        {essayList.map((val, key) => {
          return (
            <div className="result_container">
              <div className="result_title">{val.title}</div>
              <div className="result_author"> By: {val.author} </div>
              <div className="result_text"> {val.text} </div>
              <div></div>
              <div>Created At: {val.updated_at}</div>
              <div className="small_buttons">
                <Button
                  color="primary"
                  onClick={() => deleteEntry(val.idessays)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
