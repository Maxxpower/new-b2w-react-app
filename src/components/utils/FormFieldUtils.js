import React from 'react';
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";

export const FormDropDown = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  options
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
                as="select"
              >
                {
                        options.map(
                            elem => {
                                return <option
                                            key={elem.value}
                                            value={elem.value}
                                        >
                                            {elem.name}
                                        </option>
                            }
                        )
                    }
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
    />
  );
};

FormDropDown.defaultProps = {
    type: "select",
    inputGroupPrepend: null
};
  