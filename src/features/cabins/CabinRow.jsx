import React, { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabinHook";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
`;

const Img = styled.img`
  display: block;
  width: 4.4rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono";
`;
const Price = styled.div`
  font-weight: 600;
  font-family: "Sono";
`;
const Discount = styled.div`
  color: var(--color-green-700);
  font-weight: 600;
  font-family: "Sono";
`;
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  return (
    <>
      <TableRow>
        <Img src={image} alt={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : "-"}
        <div>
          <Button
            variation="secondary "
            onClick={() => setShowForm((prevStatus) => !prevStatus)}
          >
            Edit
          </Button>
          <Button
            variation="secondary"
            disabled={isDeleting}
            onClick={() => deleteCabin(cabinId)}
          >
            Delete
          </Button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
