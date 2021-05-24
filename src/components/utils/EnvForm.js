import React from 'react';
import {Field,Form,Formik} from 'formik';
import {Button} from 'react-bootstrap'
import {FormDropDown} from './FormFieldUtils';



const EnvForm = ({submitFunction,catalogs}) =>{

    const choosenEnv = catalogs[0].name;
    const initialValues = {choosenEnv}

    return (
        <Formik initialValues={initialValues} onSubmit={submitFunction}>
            {({isSubmitting ,errors,touched})=> (
                <Form>
                    <div className="px-2 py-2">
                        <FormDropDown label="Environment" name="choosenEnv" options={catalogs}/>
                    </div>
                    <div className="px-2 py-2">
                        <Button type="submit" variant="primary">Go!</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );

}

export default EnvForm;