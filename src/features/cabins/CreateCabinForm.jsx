import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabinHook";
import { useEditCabin } from "./useEditCabinHook";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        { onSuccess: (data) => reset() }
      );
    else
      createCabin({ ...data, image: image }, { onSuccess: (data) => reset() });
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Maximum capactiy" error={errors?.maxCapacity?.message}>
        <input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <input
          type="text"
          id="description"
          defaultValue={""}
          {...register("description", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow label="Image">
        <FileInput
          accept="image/*"
          disabled={isWorking}
          id="image"
          {...register("image", {
            required: isEditSession ? false : "This field is required!",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateCabinForm;
