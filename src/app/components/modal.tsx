import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Hourglass } from 'react-loader-spinner';
import type { Maze } from '../../Maze/type';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  height: 200,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  maze,
  startSearchRoute,
  disabled,
}: {
  maze: Maze;
  disabled: boolean;
  startSearchRoute: (maze: Maze) => void;
}) {
  const [open, setOpen] = useState(false);

  const mazeCopy = structuredClone(maze);

  const handleOpen = async () => {
    const isSearchingRoute = maze[0][0] === 'route';
    if (isSearchingRoute) return;

    setOpen(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    handleClose();

    startSearchRoute(mazeCopy);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} disabled={disabled}>
        探索する
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Hourglass
            visible={true}
            height="110"
            width="100"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </Box>
      </Modal>
    </div>
  );
}
