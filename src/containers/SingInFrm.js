import React from 'react';
import useForm from '../actions/SingInFrm.actions';

export default function SingInFrm(){
    let {fields, handleSubmit,handleChange,message} = useForm();

    return(
        <>
            <div className='col-md-4 offset-md-4'>
                <form onSubmit={handleSubmit}>
                    <div className='card'>
                        <div className='card-header text-center'>
                            SING-IN
                        </div>
                        <div className='card-body'>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input type='text' className='form-control' name='username' placeholder='ej. test@gmail.com'
                                       onChange={handleChange} value={fields.username} required/>
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input type='password' className='form-control' name='password' placeholder='password'
                                       onChange={handleChange} value={fields.password} required/>
                            </div>
                            <div className='form-group'>
                                <input type='submit' className='btn btn-secondary btn-block' value='LogIn'/>
                            </div>
                        </div>
                        {(message)?(
                            <div className='card-footer'>
                                {message}
                            </div>
                        ):(
                            <div></div>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}