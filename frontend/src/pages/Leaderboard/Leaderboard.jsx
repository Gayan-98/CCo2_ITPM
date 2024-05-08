import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Leaderboard.scss"

function Leaderboard() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:8083/status');
                setPlayers(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        fetchLeaderboard();

        // Set interval to fetch leaderboard every 5 seconds
        const interval = setInterval(fetchLeaderboard, 5000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="container">
            <h1 id="title">Leaderboard</h1>
            <div id="leaderboard">
                
                {players
                    .sort((a, b) => b.marks - a.marks) // Sort players based on marks
                    .map((player, index) => (
                        <div className="player" key={index}>
                            <div className="num">{index + 1}</div>
                            <div className="name">{player.userid}</div>
                            <div className="marks">{player.marks} %</div>
                        </div>
                    ))}
                    
            </div>
        </div>
    );
}

export default Leaderboard;
