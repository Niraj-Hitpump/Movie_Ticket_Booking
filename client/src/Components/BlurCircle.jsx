const BlurCircle = ({ top = "auto", right = "auto", left = "auto", bottom = "auto" }) => {
  return (
    <div
      className='absolute -z-10 rounded-full bg-red-500/30 blur-3xl'
      style={{
        top: top,
        right: right,
        left: left,
        bottom: bottom,
        width: '15rem',
        height: '15rem',
        aspectRatio: '1 / 1',
      }}
    />
  );
};

export default BlurCircle