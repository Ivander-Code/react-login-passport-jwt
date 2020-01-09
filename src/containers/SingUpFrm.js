import React, {useState} from 'react';
import useForm from '../actions/SingUpFrm.actions';

export default function SingUpFrm(props){
    const [userName, setUserName] = useState(''),
          [password, setPassword] = useState('');
    let {handleSubmit, handleChange, message} = useForm(setUserName, setPassword);

    if(props.location.state !== undefined){
        message = props.location.state.message
    }
    return(
        <>
            <div className='col-md-4 offset-md-4'>
                <form onSubmit={handleSubmit}>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='text-center'>SING-UP</div>
                        </div>
                        <div className='card-body'>
                            <div className='form-group'>
                                <label className='col-form-label'>Email:</label>
                                <input className='form-control' type='text' name='username'
                                       placeholder='ej. test@gmail.com' value={userName}
                                       onChange={handleChange} required/>
                            </div>
                            <div className='form-group'>
                                <label className='col-form-label'>Password:</label>
                                <input className='form-control' type='password' name='password' placeholder='password'
                                       onChange={handleChange} value={password} required/>
                            </div>
                            <div className='form-group'>
                                <input className='btn btn-secondary btn-block' type='submit' value='Register'/>
                            </div>
                        </div>
                        {(message)?(
                            <div className='card-footer'>
                                {message}
                            </div>) :(
                            <div></div>
                        )
                        }
                    </div>
                </form>
            </div>
        </>
    );
}