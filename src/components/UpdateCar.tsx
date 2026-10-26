import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { CarData } from '../types';
import CarForm from './CarForm';

type UpdateCarProps = {
  fetchCars: () => void;
  carData: CarData;
}

export default function UpdateCar(props: UpdateCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<CarData>({} as CarData);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.carData);
    setCar({
      brand: props.carData.brand,
      model: props.carData.model,
      color: props.carData.color,
      fuel: props.carData.fuel,
      price: props.carData.price,
      modelYear: props.carData.price
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch(props.carData._links?.self.href || "", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error when adding a new car");

      return response.json();
    })
    .then(() => props.fetchCars())
    .catch(err => console.error(err))
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Car</DialogTitle>
        <CarForm car={car} setCar={setCar} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
