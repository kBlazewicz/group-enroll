import Button from '@mui/material/Button';

export const SubmitStudentsFormButton = () => {
  const handleOnClick = () => {
    alert('Submit sent!');
  };
  return (
    <Button variant="contained" onClick={handleOnClick}>
      Submit
    </Button>
  );
};
