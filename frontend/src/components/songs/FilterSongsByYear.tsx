import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
    Button,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Song } from "../../models/Song";
import { BACKEND_API_URL } from "../../constants";
import {Link} from "react-router-dom";

export const FilterSongsByYear = () => {
    const[loading, setLoading] = useState(true);
    const[songs, setSongs] = useState([]);
    const [year, setYear] = useState("");

    const fetchSongs = async () => {
        setLoading(true);
        let url = `${BACKEND_API_URL}/songs/filter-by-year/${year}/`;
        const response = await fetch(url);
        const { count, next, previous, results } = await response.json();
        setSongs(results);
        setLoading(false);
      };

      useEffect(() => {
        fetchSongs();
      }, []);

    return (
    <Container>
        <h1 style={{marginTop:"65px"}}>All Songs Filtered</h1>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <TextField
          label="Year of Release"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          InputProps={{ style: { color: "whitesmoke" } }}
          InputLabelProps={{style: {color: 'whitesmoke'}}}
          style={{ marginRight: "16px", color:'whitesmoke' }}
        />
        <Button variant="contained" style={{color:"whitesmoke"}} onClick={() => fetchSongs()}>
          Filter
        </Button>
      </div>
        {loading && <CircularProgress />}
        {!loading && songs.length == 0 && <div>No songs found</div>}
        {!loading && songs.length > 0 && (
          <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Song name</TableCell>
								<TableCell align="right">Composer</TableCell>
								<TableCell align="right">Genre</TableCell>
								<TableCell align="right">Year of release</TableCell>
								<TableCell align="center">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {songs.map((song:Song, index) => (
                            <TableRow key={song.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/songs/${song.id}/details`} title="View song details">
											{song.song_name}
										</Link>
									</TableCell>
									<TableCell align="right">{song.composer}</TableCell>
									<TableCell align="right">{song.genre}</TableCell>
									<TableCell align="right">{song.year_of_release}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
          </>
        )
        }
    </Container>

    );
};
