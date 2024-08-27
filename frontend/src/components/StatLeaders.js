import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
  Snackbar,
  Alert,
  Modal,
  Box,
} from '@mui/material';
import ComparePlayerDialog from './ComparePlayerDialog';
import { styled } from '@mui/system';


const StyledContainer = styled(Container)({
  maxWidth: '900px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  textAlign: 'center',
  position: 'relative', 
});

const StyledPaper = styled(Paper)({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '32px',
});

const StyledTableHeader = styled(TableCell)({
  backgroundColor: '#8b5e3c',
  color: '#ffffff',
  padding: '15px',
  fontWeight: 'bold',
  textAlign: 'left',
});

const StyledTableCell = styled(TableCell)({
  padding: '12px',
  borderBottom: '1px solid #d3b9a2',
  color: '#5a4a3b',
  textAlign: 'left',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(even)': {
    backgroundColor: '#f1e4d6',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: '#ffffff',
  },
  '&:hover': {
    backgroundColor: '#f4a368',
    color: '#ffffff',
    cursor: 'pointer',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#d97e3b',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '4px',
  fontSize: '14px',
  margin: '10px auto',
  display: 'block',
  '&:hover': {
    backgroundColor: '#b9632f',
  },
});

const InstructionsButton = styled(Button)({
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: '#d97e3b',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#b9632f',
  },
});

const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#f7e8dc',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '400px',
  textAlign: 'center',
});

const StatLeaders = () => {
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [searchPlayer, setSearchPlayer] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(true);  

  useEffect(() => {
    const fetchStatLeaders = async () => {
      try {
        const response = await axios.get('/api/stat-leaders/');
        const statLeaders = response.data;

        setData(statLeaders);

        const uniqueTeams = [...new Set(statLeaders.map((item) => item.team))];
        const uniqueCategories = [...new Set(statLeaders.map((item) => item.stat_category))];
        const uniqueSeasons = [...new Set(statLeaders.map((item) => item.season))];

        setTeams(uniqueTeams);
        setCategories(uniqueCategories);
        setSeasons(uniqueSeasons);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch stat leaders. Please try again.');
        setLoading(false);
      }
    };

    fetchStatLeaders();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchPlayer, teamFilter, categoryFilter, seasonFilter]);

  const handleSearchChange = (event) => {
    setSearchPlayer(event.target.value);
  };

  const handleTeamFilterChange = (event) => {
    setTeamFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSeasonFilterChange = (event) => {
    setSeasonFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const clearFilters = () => {
    setSearchPlayer('');
    setTeamFilter('');
    setCategoryFilter('');
    setSeasonFilter('');
  };

  const openCompareDialog = (player) => {
    setSelectedPlayer(player);
    setCompareDialogOpen(true);
  };

  const closeCompareDialog = () => {
    setCompareDialogOpen(false);
    setSelectedPlayer(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const filteredData = data.filter((row) => {
    return (
      row.player_name.toLowerCase().includes(searchPlayer.toLowerCase()) &&
      (teamFilter === '' || row.team === teamFilter) &&
      (categoryFilter === '' || row.stat_category === categoryFilter) &&
      (seasonFilter === '' || row.season === parseInt(seasonFilter, 10))
    );
  });

  return (
    <StyledContainer>
      {/* Instructions Button */}
      <InstructionsButton onClick={handleOpenModal}>
        Instructions
      </InstructionsButton>

      {/* Introductory Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="intro-modal-title"
        aria-describedby="intro-modal-description"
      >
        <ModalBox>
          <Typography id="intro-modal-title" variant="h6" component="h2">
            Welcome to MLB Stat Leaders
          </Typography>
          <Typography id="intro-modal-description" sx={{ mt: 2 }}>
            Scroll and filter through this database to rediscover league leaders from your childhood as well as find new old-timers you have never heard of! Each player on this list led the league in a specific stat for a season. For each player, you can generate player comparison graphs to see how their league-leading stats stack up to the talent today!
          </Typography>
          <StyledButton onClick={handleCloseModal}>
            Close
          </StyledButton>
        </ModalBox>
      </Modal>

      <Typography variant="h4" gutterBottom>
        MLB Stat Leaders
      </Typography>

      <StyledPaper>
        <TextField
          label="Search Player Name"
          value={searchPlayer}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Team</InputLabel>
          <Select value={teamFilter} onChange={handleTeamFilterChange} label="Team">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {teams.map((team, index) => (
              <MenuItem key={index} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Stat Category</InputLabel>
          <Select value={categoryFilter} onChange={handleCategoryFilterChange} label="Stat Category">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Season</InputLabel>
          <Select value={seasonFilter} onChange={handleSeasonFilterChange} label="Season">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {seasons.map((season, index) => (
              <MenuItem key={index} value={season}>
                {season}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <StyledButton onClick={clearFilters}>Clear Filters</StyledButton>
      </StyledPaper>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={StyledPaper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeader>Player Name</StyledTableHeader>
                <StyledTableHeader>Team</StyledTableHeader>
                <StyledTableHeader>Stat Category</StyledTableHeader>
                <StyledTableHeader>Stat Value</StyledTableHeader>
                <StyledTableHeader>Season</StyledTableHeader>
                <StyledTableHeader>Compare</StyledTableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.player_name}</StyledTableCell>
                    <StyledTableCell>{row.team}</StyledTableCell>
                    <StyledTableCell>{row.stat_category}</StyledTableCell>
                    <StyledTableCell>{row.stat_value}</StyledTableCell>
                    <StyledTableCell>{row.season}</StyledTableCell>
                    <StyledTableCell>
                      <StyledButton onClick={() => openCompareDialog(row)}>Compare</StyledButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {selectedPlayer && (
        <ComparePlayerDialog
          open={compareDialogOpen}
          onClose={closeCompareDialog}
          selectedPlayer={selectedPlayer}
          statLeaders={data}
        />
      )}

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </StyledContainer>
  );
};

export default StatLeaders;
