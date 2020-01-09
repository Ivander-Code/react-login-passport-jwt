import {useState} from 'react';
import history from '../helpers/history';
import {singin} from '../services/authentication.service';
import {validForm} from '../helpers/validForm';

export default function SingInAction(setUserName, setPassword){
    const [fields, setFields] = useState({});
    const [message, setMessage] = useState('');

    function handleChange(event){
        event.persist();
        setFields((fields)=>{
            if(event.target.name == 'username'){
                setUserName(event.target.value);
            }else{
                setPassword(event.target.value);
            }
            return {...fields,[event.target.name]:event.target.value}
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        event.persist();
        let response ={};
        let validResult = validForm(fields);

        if(validResult.isValidForm){
            response = await singin(fields);
            setFields({});
            setMessage(response.data.message);
            history.push(response.data.redirect);
        }else{
            setFields({});
            setMessage(validResult.message);
            history.push('/singin');
        }
        event.target.reset();
    }
    return{handleChange, handleSubmit, message, fields};
}