import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPokemon, updatePokemon } from "../redux/pokemonService";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./pokemon.css";

const AddPokemon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); 

  const isEdit = Boolean(state);

  const initialValues = {
    name: state?.name || "",
    breed: state?.breed || "",
    type: state?.type || "",
    description: state?.description || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    breed: Yup.string().required("Breed is required"),
    type: Yup.string().required("Type is required"),
    description: Yup.string().min(5, "Min 5 characters").required("Required"),
  });

  const handleSubmit = (values) => {
    if (isEdit) {
      dispatch(updatePokemon({ id: state._id, pokemonData: values }));
    } else {
      dispatch(addPokemon(values));
    }
    navigate("/");
  };

  return (
    <div className="form-container">
      <button onClick={() => navigate("/")} className="back-btn">
        Back
      </button>

      <h2>{isEdit ? "Edit Pokémon" : "Add Pokémon"}</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>Name</label>
          <Field type="text" name="name" placeholder="Pokemon Name" />
          <ErrorMessage name="name" component="p" className="error-msg" />

          <label>Breed</label>
          <Field type="text" name="breed" placeholder="Breed" />
          <ErrorMessage name="breed" component="p" className="error-msg" />

          <label>Type</label>
          <Field type="text" name="type" placeholder="Fire, Water, Electric..." />
          <ErrorMessage name="type" component="p" className="error-msg" />

          <label>Description</label>
          <Field
            as="textarea"
            name="description"
            placeholder="Description"
          />
          <ErrorMessage name="description" component="p" className="error-msg" />

          <button type="submit" className="submit-btn">
            {isEdit ? "Update Pokemon" : "Add Pokemon"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddPokemon;
