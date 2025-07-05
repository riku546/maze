import Confetti from 'react-confetti';

const ConfettiComponent = ({ isRun }: { isRun: boolean }) => {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      tweenDuration={2000}
      run={isRun}
      recycle={false}
    />
  );
};
export default ConfettiComponent;
