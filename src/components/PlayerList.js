import React, {useEffect, useState} from 'react';
import PlayerDataService from "../services/PlayerService";
import { Link } from "react-router-dom";

const PlayerList = () => {

    const [searchTitle, setSearchTitle] = useState("");
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect( () => {
        
        retrievePlayers();
    },[]);

    const onChangeSearchTitle = (e) => {

        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    
    };

    const  retrievePlayers = () => {

        PlayerDataService.getAll()
            .then(response => {
                setPlayers(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const refreshList = () => {

        retrievePlayers();
        setCurrentPlayer(null);
        setCurrentIndex(-1);

    };

    const removeAllPlayers = () => {

        PlayerDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(err => {
                console.log(err);
            });

    }

    const setActivePlayer = (player, index) => {

      setCurrentPlayer(player);
      setCurrentIndex(index);

    };

    const findByTitle = () => {

        PlayerDataService.findByTitle()
            .then(response => {
                setPlayers(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });

    };


    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />

            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>          
            </div>
            
          </div>
        </div>

        <div className="col-md-6">
          <h4>Players List</h4>

          <ul className="list-group">

              {
                  players && 
                    players.map((player, index) => (

                      <li className={"list-group-item" + (index===currentIndex ? "active" : "" )} onClick={() => setActivePlayer(player, index)} key={index}>

                          {player.title}

                      </li>
                  ))
              }

          </ul>

          <button className="m-3 btn btn-sm btn-danger" onClick={removeAllPlayers}>
              Remove All
          </button>
        </div>

        <div className="col-md-6">
          {currentPlayer? (
          <div>
            <h4>Player</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPlayer.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPlayer.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPlayer.published ? "Published" : "Pending"}
            </div>

            <Link to={"/players/"} className="badge badge-warning">
              Edit
            </Link>
          </div>
        ) : (

          <div>
            <br />
            <p>Please click on a Player...</p>
          </div>
        )}
        </div>
      </div>
    );
}

export default PlayerList;
