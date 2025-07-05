import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { mazeSizeOptions, type MazeSizeType } from '../../Maze/type';

export default function MazeSizeSelect({
  mazeType,
  regenerateMaze,
  disabled,
  setMazeType,
}: {
  mazeType: MazeSizeType;
  regenerateMaze: (mazeType: MazeSizeType) => void;
  disabled: boolean;
  setMazeType: (mazeType: MazeSizeType) => void;
}) {
  const [typeState, setTypeState] = useState(mazeType);

  const handleChange = (e: SelectChangeEvent<MazeSizeType>) => {
    setTypeState(e.target.value);

    setMazeType(e.target.value);
    regenerateMaze(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">size</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={typeState}
        label="size"
        onChange={handleChange}
        disabled={disabled}
      >
        {Object.entries(mazeSizeOptions).map(([key, size]) => (
          <MenuItem key={key} value={key}>
            {key} {size} x {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
