import { useEffect, useState } from 'react';
import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import './progress-bar.css';

let lastValue = 0;

const ProgressBar = () => {
  const [localProgress, setLocalProgress] = useState<number>(lastValue);
  const {
    state: { loading },
  } = useCharacterContext();

  const handleProgress = () => {
    const minValue = Math.min(5, 100 - localProgress);
    const maxValue = Math.min(10, 100 - localProgress);

    const random = Math.floor(
      Math.random() * (maxValue - minValue + 1) + minValue
    );

    if (localProgress > 90 && !loading) {
      setLocalProgress(0);
      lastValue = 0;
    }

    if (
      localProgress + random < 100 &&
      localProgress + random > localProgress
    ) {
      lastValue = localProgress + random;
      setLocalProgress(lastValue);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (loading) {
        handleProgress();
      }

      if (!loading && lastValue > 0 && localProgress < 90) {
        handleProgress();
      }
    }, 150);

    if (localProgress > 90 && !loading && lastValue > 0) {
      setLocalProgress(0);
      lastValue = 0;
    }

    return () => clearInterval(interval);
  }, [loading, localProgress]);

  return (
    <progress
      id="loading"
      value={localProgress}
      max="100"
      aria-label="Content loading…"
      className={`progress ${!localProgress ? 'progress-zero' : 'progress-value'}`}
    />
  );
};

export default ProgressBar;
