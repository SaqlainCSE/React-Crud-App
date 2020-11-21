import React, { useState } from "react";
import PlayerDataService from "../services/PlayerService";

const AddPlayer = () => {
  const initialPlayerState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [player, setPlayer] = useState(initialPlayerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  const savePlayer = () => {
    var data = {
      title: player.title,
      description: player.description,
    };

    PlayerDataService.create(data)

      .then((response) => {
        setPlayer({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });

        setSubmitted(true);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newPlayer = () => {
    setPlayer(initialPlayerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Submit Successfully!</h4>
          <button className="btn btn-success" onClick={newPlayer}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={player.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={player.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button className="btn btn-success" onClick={savePlayer}>
            Submit
          </button>
        </div>
      )}

      {/* <div>
          <br/>
      <h1>{player.title}</h1>
      <p>{player.description}</p>
      </div> */}
    </div>
  );
};

export default AddPlayer;
