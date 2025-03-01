import { motion } from 'motion/react';
import { useState } from 'react';

type RoundToggleProps = {
  enabled?: boolean;
  size?: number;
}

export const RoundToggle = ({ enabled = true, size = 20 }: RoundToggleProps) => {
  const [isOn, setIsOn] = useState(enabled);
  const togglePadding = size / 5;
  const toggleWidth = size * 2.5;
  const toggleHeight = size + togglePadding * 2;
  const toggleShadow = isOn ? `inset 0 0 ${size / 6}px rgba(0, 0, 0, 0.4)` : `inset 0 0 ${size}px rgba(0, 0, 0, 0.4)`;

  const handlePosition = isOn ? toggleWidth - size - togglePadding * 2 - 0.5 : 0.5;

  const onColor = '#feba09';
  const offColor = '#cccccc';
  const onBackground = 'oklch(58% 0.12 144.92)';
  const offBackground = 'oklch(75% 0 250)';

  const rotations = 4;
  const speed = 0.6;
  const handleRotation = isOn ? 60 * rotations : 0;
  const transition = {
    duration: speed,
    type: "tween",
    ease: "anticipate"
  };

  return (
    <motion.div
      onClick={() => setIsOn(!isOn)}
      style={{
        border: "none",
        position: "relative",
        borderRadius: "9999px",
        width: toggleWidth,
        height: toggleHeight,
        cursor: "pointer",
        backgroundColor: offBackground
      }}
      animate={{
        backgroundColor: isOn ? onBackground : offBackground,
        boxShadow: toggleShadow,
        transition
      }}
      initial={false}
    >
      <motion.svg
        style={{
          position: "absolute",
          width: size,
          height: size,
          left: togglePadding,
          top: togglePadding,
          filter: `drop-shadow(0 0 ${size / 10}px rgba(0, 0, 0, 0.3))`
        }}
        animate={{
          x: handlePosition,
          rotate: handleRotation,
          color: isOn ? onColor : offColor,
          transition
        }}
        initial={false}
        width={size}
        height={size}
        viewBox="0 0 12 12"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM6.75 9V6.433L8.97307 5.14952C9.15243 5.04596 9.21388 4.81662 9.11033 4.63725L8.73533 3.98773C8.63178 3.80838 8.40243 3.74692 8.22307 3.85048L5.99999 5.13397L3.77692 3.85048C3.59756 3.74693 3.36821 3.80838 3.26466 3.98775L2.88966 4.63727C2.7861 4.81662 2.84756 5.04597 3.02692 5.14952L5.25 6.43302V9C5.25 9.20711 5.41789 9.375 5.625 9.375H6.375C6.58211 9.375 6.75 9.20711 6.75 9Z" fill="currentColor" />
      </motion.svg>
    </motion.div>
  )
}
